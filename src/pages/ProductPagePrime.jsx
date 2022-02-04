import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";

// --------------------------------------------------------------------------------------------------------

const ProductPagePrime = () => {

  //const [dataIn, setDataIn] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [importedData, setImportedData] = useState([]);
  const [selectedImportedData, setSelectedImportedData] = useState([]);
  const [importedCols, setImportedCols] = useState([
    { field: "", header: "Lista de productos" },
  ]);

  const dt = useRef(null);
  const toast = useRef(null);

  const cols = [
    { field: "id", header: "Code" },
    { field: "cant", header: "Cantidad" },
    { field: "nombreProducto", header: "Articulo" },
    { field: "nitProveedor", header: "Nit Proveedor" },
    { field: "precioCompra", header: "Precio/Compra" },
    { field: "ivaCompra", header: "IVA"},
    { field: "precioVenta", header: "Precio/Venta"},
    { field: "sede", header: "Sede"},
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));


  // ------------------------- Metodo POST para guardar productos ------------------------------------

        let baseUrl = "http://localhost:9000/apiTienda/product/";

  /*             
          //axios.post(baseUrl + "addProduct", _importedData)
          //.then((response) => {
          //setProducts(products.concat(response.data));
          
          // Creamos la petición post
          const agregarProducto = () => {

            console.log("entré al metodo")
            console.log(importedData);
            importedData.map(async(prod)=> {
            await axios.post(baseUrl + "addProduct", prod).then((response) => {
              setProducts(products.concat(response.data));
              console.log(products);
            });
            
          })
          allGet();
          };

    */


  // ------------------------- Metodo leer desde la base de datos -------------------------------------

  

  const allGet = async () => {
    await axios.get(baseUrl + "listProduct").then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    allGet();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const importCSV = (e) => {
    const file = e.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const data = csv.split("\n");

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, "").split(",");
      data.shift();

      let _importedCols = cols.map((col) => ({
        field: col,
        header: toCapitalize(col.replace(/['"]+/g, "")),
      }));
      let _importedData = data.map((d) => {
        d = d.split(",");
        return cols.reduce((obj, c, i) => {
          obj[c] = d[i].replace(/['"]+/g, "");
          return obj;
        }, {});
      });

      setImportedCols(_importedCols);
      setImportedData(_importedData);

    };

    reader.readAsText(file, "UTF-8");
  };

  const importExcel = (e) => {
    const file = e.files[0];

    import("xlsx").then((xlsx) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = xlsx.read(e.target.result, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
       

        // Prepare DataTable
        const cols = data[0];
        data.shift();

        let _importedCols = cols.map((col) => ({
          field: col,
          header: toCapitalize(col),
        }));
        let _importedData = data.map((d) => {
          return cols.reduce((obj, c, i) => {
            obj[c] = d[i];
            return obj;

          }, {});
        });

        
        _importedData.map(async(prod) => {
          await axios.post(baseUrl + "addProduct", prod).then((response) => {
            setProducts(products.concat(response.data));
          });
          
        })
        allGet(); 
        
        
        setImportedCols(_importedCols);
        setImportedData(_importedData);
        // setDataIn(_importedData);
        // agregarProducto();
          
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, products);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  };

  const toCapitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const clear = () => {
    setImportedData([]);
    setSelectedImportedData([]);
    setImportedCols([{ field: "", header: "Lista de productos" }]);
  };

  const onImportSelectionChange = (e) => {
    setSelectedImportedData(e.value);
    const detail = e.value.map((d) => Object.values(d)[0]).join(", ");
    toast.current.show({
      severity: "info",
      summary: "Data Selected",
      detail,
      life: 3000,
    });
  };

  const onSelectionChange = (e) => {
    setSelectedProducts(e.value);
  };

  const header = (
    <div className="p-d-flex p-ai-center export-buttons">
      <Button
        type="button"
        icon="pi pi-file"
        label="Exportar CSV"
        onClick={() => exportCSV(false)}
        className="p-mr-2 mx-2"
        data-pr-tooltip="CSV"
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        label="Exportar Excel"
        onClick={exportExcel}
        className="p-button-success p-mr-2 mx-2"
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        label="Exportar PDF"
        onClick={exportPdf}
        className="p-button-danger p-mr-2 mx-2"
        data-pr-tooltip="PDF"
      />

    </div>
  );

  // --------------------------------------------------------------------------------------------------------

  return (
    <div className="container mt-3">
      <h1 style={{color: ""}}>Importar Productos 
      <i className="pi pi-paperclip mx-3" style={{'fontSize': '1em'}}></i>
      </h1>
      
      <br/>
      <div className="card container">
      <br/>
        <h5>Lista de productos a importar</h5>

        <Toast ref={toast} />

        <div className="p-d-flex p-ai-center p-py-2" >
          <FileUpload
            style={{float: "left"}}
            chooseOptions={{ label: "CSV", icon: "pi pi-file" }}
            mode="basic"
            name="demo[]"
            auto
            url="https://primefaces.org/primereact/showcase/upload.php"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="p-mr-2 pl-2 pr-1"
            onUpload={importExcel}
          />
          <FileUpload
            style={{float: "left" }}
            chooseOptions={{
              label: "Excel",
              icon: "pi pi-file-excel",
              className: "p-button-success",
            }}
            disabled
            mode="basic"
            name="demo[]"
            auto
            url="https://primefaces.org/primereact/showcase/upload.php"
            accept=".csv"
            className="p-mr-2 px-2"
            onUpload={importCSV}
          />
          <Button
            type="button"
            label="Clear"
            icon="pi pi-times"
            onClick={clear}
            className="p-button-info p-mr-2 px-2"
          />
          
        </div>
        <br/>

        <DataTable
          value={importedData}
          emptyMessage="Sin datos"
          paginator
          rows={10}
          alwaysShowPaginator={false}
          responsiveLayout="scroll"
          selectionMode="multiple"
          selection={selectedImportedData}
          onSelectionChange={onImportSelectionChange}
        >
          {importedCols.map((col, index) => (
            <Column key={index} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </div>
      <br/>
      <div className="card container">
        <br/>
        <h5>Lista de productos a exportar</h5>

        <Tooltip target=".export-buttons>button" position="bottom" />

        <DataTable
          ref={dt}
          value={products}
          header={header}
          dataKey="id"
          responsiveLayout="scroll"
          selectionMode="multiple"
          selection={selectedProducts}
          onSelectionChange={onSelectionChange}
        >
          {cols.map((col, index) => (
            <Column key={index} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default ProductPagePrime;
