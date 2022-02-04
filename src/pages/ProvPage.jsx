import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import { Card, Table } from "react-bootstrap";

const ProvPage = () => {
  const inicial = [
    {
      //id: "",
      nitProveedor: "",
      nombreProveedor: "",
      direccionProveedor: "",
      ciudadProveedor: "",
    },
  ];

  // ------------------------------------- Estapa 0 - useState --------------------------------------------

  const [menuVisible, setmenuVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [data, setData] = useState([]);
  const [insertSuplier, setInsertSuplier] = useState(inicial);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [buscar, setBuscar] = useState("");


  // -------------------------------------------- Metodos ----------------------------------------------

  let baseUrl = "http://localhost:9000/apiTienda/vendors/";

  const allGet = async () => {
    await axios.get(baseUrl + "listVendors").then((response) => {
      setData(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const agregarSuplier = async () => {
    await axios.post(baseUrl + "addVendors", insertSuplier).then((response) => {
      setData(data.concat(response.data));
    });
    setmenuVisible(false);
    setEditarVisible(false);
    allGet();
  };

  // Creamos la peticion Delete
  const borrarSuplier = async () => {
    if (window.confirm("Desea eliminar el proveedor " + (insertSuplier && insertSuplier.nombreProveedor) + "?" )
    ) {
      await axios.delete(baseUrl + "deleteVendors/" + insertSuplier.nitProveedor)
      .then((res) => {
        setData(data.filter((suplier) => suplier.nitProveedor !== insertSuplier.nitProveedor));
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
    setInsertSuplier((prevState) => ({
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
    setInsertSuplier([]);
  };

  const suplierSeleccionado = (suplier, accion) => {
    setInsertSuplier(suplier);
    accion === "Editar" ? setEditarVisible(true) : borrarSuplier();
  };

  /* -------------------------- Funcion para buscar ----------------------------------- */

  const inputBuscar =(e)=>{
    setBuscar(e.target.value);
    filtroBusqueda(e.target.value)
  }

  const filtroBusqueda=(suplierBuscado)=>{
    var resultadoBusqueda=tablaBuscar.filter((suplier)=>{
      if(suplier.nombreProveedor.toString().toLowerCase().includes(suplierBuscado.toLowerCase()) 
      ||(suplier.nitProveedor.toString().toLowerCase().includes(suplierBuscado.toLowerCase())))
      {
        return suplier;
      }
    });
    setData(resultadoBusqueda);

  }  

  return (
    <div className="container mt-3">
      <h1>Proveedores</h1>

      <Menubar model={iconos} className="container" />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 id="header-title">Listado de proveedores</h2>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Nit o Nombre..."
              id="buscarSuplier"
              value={buscar}
              onChange={inputBuscar}
            />

          </div>
        </div>
      </div>
      <br />
      <div>
      <Card >
      <Table striped bordered hover responsive="sd" border="secondary">
          <thead className="text-center">
            <tr style={{ fontWeight: "bold" }}>
              <td>Nit</td>
              <td>Nombre</td>
              <td>Dirección</td>
              <td>Ciudad</td>
              <td>Acción</td>
                            
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.nitProveedor} style={{}}>
                <td width="10%">{item.nitProveedor}</td>
                <td>{item.nombreProveedor}</td>
                <td>{item.direccionProveedor}</td>
                <td>{item.ciudadProveedor}</td>
               
                <td width="10%">

                    <ButtonB
                      className=" mb-1 mt-1"
                      variant="warning"
                      onClick={() => suplierSeleccionado(item, "Editar")}
                    >
                      <i className="pi pi-pencil" width="20%"></i>
                    </ButtonB>{" "}
                    <ButtonB
                      className=" mb-1 mt-1"
                      variant="danger"
                      onClick={() => suplierSeleccionado(item, "Eliminar")}
                    > 
                      <i className="pi pi-trash" width="20%"></i>
                    </ButtonB>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Card>
      </div>

      {/** ------------------ Ventana para agregar proveedor nuevo ---------------*/}
      <Dialog
        header="Agregar proveedor nuevo"
        visible={menuVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setmenuVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          {/*<span className="p-float-label mt-2">
            <InputText className="container" id="id" onChange={capturaInput} />
            <label htmlFor="id">Id</label>
            </span>*/}

                    
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
              id="nombreProveedor"
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre del Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="direccionProveedor"
              onChange={capturaInput}
            />
            <label htmlFor="user">Direccion Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ciudadProveedor"
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad Proveedor</label>
          </span>

          {/*<span className="p-float-label mt-4">
            <InputText
              className="container"
              id="tel_proveedor"
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono Proveedor</label>
        </span>*/}

        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => agregarSuplier()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>

      {/* ------------------ Ventana para editar un prodcuto ---------------*/}

      <Dialog
        header="Editar proveedor"
        visible={editarVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setEditarVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          {/*<span className="p-float-label mt-2">
            <InputText
              className="container"
              id="id"
              disabled
              value={insertSuplier && insertSuplier.id}
              onChange={capturaInput}
            />
            <label htmlFor="id">Id</label>
    </span>*/}

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nitProveedor"
              value={insertSuplier && insertSuplier.nitProveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">NIT del Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="nombreProveedor"
              value={insertSuplier && insertSuplier.nombreProveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre del Proveedor</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="direccionProveedor"
              value={insertSuplier && insertSuplier.direccionProveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">Dirección</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="ciudadProveedor"
              value={insertSuplier && insertSuplier.ciudadProveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>

          {/*<span className="p-float-label mt-4">
            <InputText
              className="container"
              id="tel_proveedor"
              value={insertSuplier && insertSuplier.tel_Proveedor}
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono</label>
    </span>*/}
         
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => agregarSuplier()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProvPage;
    