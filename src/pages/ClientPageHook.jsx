import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import { Card, Table } from "react-bootstrap";

const ClientPageHook = () => {
  const inicial = [
    {
      id: " ",
      clientName: " ",
      clientNumber: " ",
      clientAdress: " ",
      clientEmail: " ",
      sede: " ",
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

  let baseUrl = "http://localhost:9000/apiTienda/client/";

  const allGet = async () => {
    await axios.get(baseUrl + "listClient").then((response) => {
      setData(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const agregarSuplier = async () => {
    await axios.post(baseUrl + "addClient", insertSuplier).then((response) => {
      setData(data.concat(response.data));
      console.log(data);
    });
    setmenuVisible(false);
    setEditarVisible(false);
    allGet();
  };

  // Creamos la peticion Delete
  const borrarSuplier = async () => {
    if (
      window.confirm(
        "Desea eliminar el Cliente: " +
          (insertSuplier && insertSuplier.clientName) +
          "?"
      )
    ) {
      await axios
        .get(baseUrl + "deleteClient/" + insertSuplier.id)
        .then((res) => {
          setData(data.filter((client) => client.id !== insertSuplier.id));
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

  const suplierSeleccionado = (client, accion) => {
    setInsertSuplier(client);
    accion === "Editar" ? setEditarVisible(true) : borrarSuplier();
  };

  /* -------------------------- Funcion para buscar ----------------------------------- */

  const inputBuscar = (e) => {
    setBuscar(e.target.value);
    filtroBusqueda(e.target.value);
  };

  const filtroBusqueda = (clientBuscado) => {
    var resultadoBusqueda = tablaBuscar.filter((client) => {
      if (
        client.clientName
          .toString()
          .toLowerCase()
          .includes(clientBuscado.toLowerCase()) ||
        client.id.toString().toLowerCase().includes(clientBuscado.toLowerCase())
      ) {
        return client;
      }
    });
    setData(resultadoBusqueda);
  };

  return (
    <div className="container mt-3">
      <h1>Clientes</h1>

      <Menubar model={iconos} className="container" />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 id="header-title">Listado de clientes</h2>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Identificación o Nombre..."
              id="buscarClient"
              value={buscar}
              onChange={inputBuscar}
            />
          </div>
        </div>
      </div>
      <br />
      <div>
        <Card>
          <Table striped bordered hover responsive="md" border="secondary">
            <thead className="text-center">
              <tr style={{ fontWeight: "bold" }}>
                <td>Indentificación</td>
                <td>Nombre</td>
                <td>Teléfono</td>
                <td>Direccion</td>
                <td>Correo</td>
                <td>Sucursal</td>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={{}}>
                  <td width="10%">{item.id}</td>
                  <td>{item.clientName}</td>
                  <td>{item.clientNumber}</td>
                  <td>{item.clientAdress}</td>
                  <td>{item.clientEmail}</td>
                  <td>{item.sede}</td>

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
        header="Agregar cliente nuevo"
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
            <InputText className="container" id="id" onChange={capturaInput} />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientName"
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre del cliente</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientNumber"
              onChange={capturaInput}
            />
            <label htmlFor="user">Telefono o Celular</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientAdress"
              onChange={capturaInput}
            />
            <label htmlFor="user">Dirección</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientEmail"
              onChange={capturaInput}
            />
            <label htmlFor="user">Correo</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="sede"
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>
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
        header="Editar cliente"
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
              id="id"
              value={insertSuplier && insertSuplier.id}
              onChange={capturaInput}
            />
            <label htmlFor="user">Identificación</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientName"
              value={insertSuplier && insertSuplier.clientName}
              onChange={capturaInput}
            />
            <label htmlFor="user">Nombre</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientNumber"
              value={insertSuplier && insertSuplier.clientNumber}
              onChange={capturaInput}
            />
            <label htmlFor="user">Teléfono o Celular</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientAdress"
              value={insertSuplier && insertSuplier.clientAdress}
              onChange={capturaInput}
            />
            <label htmlFor="user">Dirección</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="clientEmail"
              value={insertSuplier && insertSuplier.clientEmail}
              onChange={capturaInput}
            />
            <label htmlFor="user">Correo</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="sede"
              value={insertSuplier && insertSuplier.sede}
              onChange={capturaInput}
            />
            <label htmlFor="user">Ciudad</label>
          </span>
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

export default ClientPageHook;
