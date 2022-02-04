import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";


const ProductPage = () => {
  const inicial = [
    {
      id: "",
      nombreProducto: "",
      nitProveedor: "",
      precioCompra: "",
      ivaCompra: "",
      precioVenta: "",
      sede: "",
    },
  ];

  // ------------------------------------- Estapa 0 - useState --------------------------------------------

  const [menuVisible, setmenuVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [data, setData] = useState([]);
  const [insertProd, setInsertProd] = useState(inicial);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [buscar, setBuscar] = useState("");

  // -------------------------------------------- Metodos ----------------------------------------------

  let baseUrl = "http://localhost:9000/apiTienda/product/";

  const allGet = async () => {
    await axios.get(baseUrl + "listProduct").then((response) => {
      setData(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const agregarProducto = async () => {
    await axios.post(baseUrl + "addProduct", insertProd).then((response) => {
      setData(data.concat(response.data));
      console.log(data);
    });
    setmenuVisible(false);
    setEditarVisible(false);
    allGet();
  };

  // Creamos la peticion Delete
  const borrarProducto = async () => {
    console.log(insertProd);
    if (
      window.confirm(
        "Desea eliminar el producto " +
          (insertProd && insertProd.nombreProducto) +
          "?"
      )
    ) {
      await axios
        .delete(baseUrl + "deleteProduct/" + insertProd.id)
        .then((res) => {
          setData(data.filter((producto) => producto.id !== insertProd.id));
        });
      allGet();
    }
  };

  useEffect(() => {
    allGet();
  }, []);

  // ------------- Metodo para capturar lo que viene de los input ---------------
  // Inicialmente se crea un estado en etapa 0
  // Luego, el value del evento.target lo vamos almacenando de acuerdo
  // al id del atributo
  // finalmente actualizamos el estado haciendo una copia del estado anterior, con el nuevo estado
  // Nota: El estado debe coicidir con el id del input

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setInsertProd((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // como las peticines http son asincronas hay que indicarselo

  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center">
          <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
        </div>
      </div>
    );
  };

  const iconos = [
    {
      label: "Agregar",
      icon: "pi pi-fw pi-plus",
      command: () => {
        mostrarVentanaAgregar();
      },
     
    },

    
  ];

  /* ---------------------- Mostrar la ventana de agregar -----------------------------*/

  const mostrarVentanaAgregar = () => {
    setmenuVisible(true);
    setInsertProd([]);
  };

  const prodSeleccionado = (producto, accion) => {
    setInsertProd(producto);
    console.log(producto);
    (accion === "Editar")? setEditarVisible(true) : borrarProducto();
  };

  /* -------------------------- Funcion para buscar ----------------------------------- */

  const inputBuscar =(e)=>{
    setBuscar(e.target.value);
    filtroBusqueda(e.target.value)
  }

  const filtroBusqueda=(productoBuscado)=>{
    var resultadoBusqueda=tablaBuscar.filter((producto)=>{
      if(producto.nombreProducto.toString().toLowerCase().includes(productoBuscado.toLowerCase()) 
      ||(producto.sede.toString().toLowerCase().includes(productoBuscado.toLowerCase())))
      {
        return producto;
      }
    });
    setData(resultadoBusqueda);

  }
  
  return (
    <div className="container mt-3">
      <h1>Productos</h1>

      <Menubar model={iconos} className="container" />
      <br />
      <div className="container">
        {/*<input label= "Subir archivo" name= "file" type= "file"
          onChange={()=>subirCsv()}/>*/}
        <div className="row">
          <div className="col-md-6">
            <h2 id="header-title">Listado de productos</h2>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o sede..."
              id="buscarProd"
              value={buscar}
              onChange={inputBuscar}
            />

          </div>
        </div>
      </div>
      <br />
      <div>
        {/*<DataTable value={listProd}>
          <Column
            selectionMode="single"
            headerStyle={{ width: "1em" }}
          ></Column>
          <Column field="id" header="Id"></Column>
          <Column field="nombreProducto" header="Nombre"></Column>
          <Column field="nitProveedor" header="NIT Proveedor"></Column>
          <Column field="precioCompra" header="Precio/Compra"></Column>
          <Column field="ivaCompra" header="IVA"></Column>
          <Column field="precioVenta" header="Precio/Venta"></Column>
          <Column field="sede" header="Sede"></Column>
        </DataTable>*/}
        <div className="card">
        <Table striped bordered hover responsive="md" border="secondary">
          <thead>
            <tr style={{ fontWeight: "bold" }}>
              <td>Codigo</td>
              <td>Cantidad</td>
              <td>Producto</td>
              <td>NIT Proveedor</td>
              <td>Precio/Compra</td>
              <td>IVA</td>
              <td>Precio/Venta</td>
              <td>Sede</td>
              
            </tr>
          </thead>

          <tbody >
            {data.map((item) => (
              <tr key={item.id} style={{}}>
                <td>{item.id}</td>
                <td>{item.cant}</td>
                <td>{item.nombreProducto}</td>
                <td>{item.nitProveedor}</td>
                <td>{item.precioCompra}</td>
                <td>{item.ivaCompra}</td>
                <td>{item.precioVenta}</td>
                <td>{item.sede}</td>
                <td>
                  <div>
                  <ButtonB
                      className=" mb-1 mt-1"
                      variant="warning"
                      onClick={() => prodSeleccionado(item, "Editar")}
                    >
                      <i className="pi pi-pencil px-1"></i>Editar
                    </ButtonB>{" "}
                    <ButtonB
                      className=" mb-1 mt-1"
                      variant="danger"
                      onClick={() => prodSeleccionado(item, "Eliminar")}
                    > 
                      <i className="pi pi-trash px-1"></i>Eliminar
                    </ButtonB>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>

      {/** ------------------ Ventana para agregar producto nuevo ---------------*/}
      <Dialog
        header="Agregar producto nuevo"
        visible={menuVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setmenuVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          <span className="p-float-label mt-2">
            <InputText className="container" id="id" onChange={capturaInput} />
            <label htmlFor="id">Id</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="cant"
              onChange={capturaInput}
            />
            <label htmlFor="user">Cantidad</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreProducto"
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre del Producto</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nitProveedor"
              onChange={capturaInput}
            />
            <label htmlFor="user">NIT del Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="precioCompra"
              onChange={capturaInput}
            />
            <label htmlFor="user">Precio de compra ($)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ivaCompra"
              onChange={capturaInput}
            />
            <label htmlFor="user">IVA (%)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="precioVenta"
              onChange={capturaInput}
            />
            <label htmlFor="user">Precio de Venta ($)</label>
          </span>

          <span className="p-float-label mt-4">
            <Form.Select
              aria-label="Default select example"
              type="text"
              className="container "
              id="sede"
              style={{ fontSize: "12px", color: "grey" }}
              onChange={capturaInput}
            >
              <option>Seleccione la ciudad de sede</option>
              <option value="cali">Cali</option>
              <option value="medellin">Medellin</option>
              <option value="bogota">Bogotá</option>
            </Form.Select>
          </span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => agregarProducto()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ------------------ Ventana para editar un prodcuto ---------------*/}

      <Dialog
        header="Editar producto"
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          <span className="p-float-label mt-2">
            <InputText
              className="container"
              id="id"
              disabled
              value={insertProd && insertProd.id}
              onChange={capturaInput}
            />
            <label htmlFor="id">Id</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreProducto"
              value={insertProd && insertProd.nombreProducto}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre del Producto</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nitProveedor"
              value={insertProd && insertProd.nitProveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">NIT del Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="precioCompra"
              value={insertProd && insertProd.precioCompra}
              onChange={capturaInput}
            />
            <label htmlFor="user">Precio de compra ($)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ivaCompra"
              value={insertProd && insertProd.ivaCompra}
              onChange={capturaInput}
            />
            <label htmlFor="user">IVA (%)</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="precioVenta"
              value={insertProd && insertProd.precioVenta}
              onChange={capturaInput}
            />
            <label htmlFor="user">Precio de Venta ($)</label>
          </span>

          <span className="p-float-label mt-4">
            <Form.Select
              aria-label="Default select example"
              type="text"
              className="container "
              id="sede"
              style={{ fontSize: "12px", color: "grey" }}
              value={insertProd && insertProd.sede}
              onChange={capturaInput}
            >
              <option>Seleccione la ciudad de sede</option>
              <option value="cali">Cali</option>
              <option value="medellin">Medellin</option>
              <option value="bogota">Bogotá</option>
            </Form.Select>
          </span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => agregarProducto()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductPage;
