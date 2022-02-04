import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonB from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table, Row, Col } from "react-bootstrap";
import UserAutent from "../auth/UserAutent";

const VentasHook = () => {
  const { state } = UserAutent();

  const inicial = [
    {
      id: "",
      clientId: "",
      totalVenta: "",
      detalleVenta: [].cantidad,
      ivaVenta: "",
      valorAllVentas: "",
      sede: "",
    },
  ];

  // ------------------------------------- Estapa 0 - useState --------------------------------------------

  const [menuVisible, setmenuVisible] = useState(false);
  const [editarVisible, setEditarVisible] = useState(false);
  const [data, setData] = useState([]);
  const [insertProd, setInsertProd] = useState([inicial]);
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [dataClient, setDataClient] = useState([]);
  const [tablaBuscarClient, setTablaBuscarClient] = useState([]);
  const [captId, setCaptId] = useState([]);
  const [buscarC, setBuscarC] = useState("")

  // -------------------------------------------- Metodos ----------------------------------------------

  let baseUrl = "http://localhost:9000//apiTienda/venta/";

  const allGet = async () => {
    await axios.get(baseUrl + "finAllVentas").then((response) => {
      setData(response.data);
      setTablaBuscar(response.data);
    });
  };

  // Creamos la petición post
  const agregarVenta = async () => {
    await axios.post(baseUrl + "addVenta", insertProd).then((response) => {
      setData(data.concat(response.data));
      console.log(data);
    });
    setmenuVisible(false);
    setEditarVisible(false);
    allGet();
  };

  // Creamos la peticion Delete
  const borrarProducto = async () => {
    if (window.confirm("Desea eliminar esta venta? ")) {
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
    getAllClients();

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
    accion === "Editar" ? setEditarVisible(true) : borrarProducto();
  };

  /* -------------------------- Funcion para buscar ----------------------------------- */

  const inputBuscar = (e) => {
    setBuscar(e.target.value);
    filtroBusqueda(e.target.value);
  };

  const filtroBusqueda = (productoBuscado) => {
    var resultadoBusqueda = tablaBuscar.filter((producto) => {
      if (
        producto.nombreProducto
          .toString()
          .toLowerCase()
          .includes(productoBuscado.toLowerCase()) ||
        producto.sede
          .toString()
          .toLowerCase()
          .includes(productoBuscado.toLowerCase())
      ) {
        return producto;
      }
    });
    setData(resultadoBusqueda);
  };








  // ----------------------- Metodo para leer clientes -----------------------------

  let baseUrlClients = "http://localhost:9000/apiTienda/client/";

  const getAllClients = async () => {
    await axios.get(baseUrlClients + "listClient").then((response) => {
      setDataClient(response.data);
      setTablaBuscarClient(response.data);
    });
  };

  // ----------------------- Metodo para buscar cliente -------------------------------

  const capturaInputCliente = (e) => {
    const { id, value } = e.target;
    setCaptId((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    
  };

  const inputBuscarCliente = (e) => {
      e.preventDefault();
    setBuscarC(e.target.value);
    buscarCliente(e.target.value);
  };

  const buscarCliente = (clienteBuscado) => {
    console.log(clienteBuscado);

    const clienteEncontrado = tablaBuscarClient.filter((cliente) => {
      if (cliente.clientId) {
        return cliente;
      }
    });
    console.log(clienteEncontrado);
    setDataClient(clienteEncontrado);
  };

  // ----------------------- Render de la pagina Ventas --------------------------------
  return (
    <div className="container mt-3">
      <h1>Ventas</h1>

      <Menubar model={iconos} className="container" />
      <br />
      <div className="container">
        {/*<input label= "Subir archivo" name= "file" type= "file"
          onChange={()=>subirCsv()}/>*/}
        <div className="row">
          <div className="col-md-6">
            <h2 id="header-title">Listado de Ventas</h2>
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
      <hr />
      <div>
        <div className="card">
          <Table striped bordered hover responsive="md" border="secondary">
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <td># Venta</td>
                <td>Id Client</td>
                <td>Subtotal</td>
                <td>IVA</td>
                <td>Total</td>
                <td>Sucursal</td>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={{}}>
                  <td>{item.id}</td>
                  <td>{item.clientId}</td>
                  <td>{item.totalVenta}</td>
                  <td>{item.ivaVenta}</td>
                  <td>{item.valorAllVentas}</td>
                  <td>{item.sede}</td>

                  <td>
                    <div>
                      <ButtonB
                        className=" mb-1 mt-1"
                        variant="warning"
                        onClick={() => prodSeleccionado(item, "Editar")}
                      >
                        <i className="pi pi-pencil"></i>
                      </ButtonB>{" "}
                      <ButtonB
                        className=" mb-1 mt-1"
                        variant="danger"
                        onClick={() => prodSeleccionado(item, "Eliminar")}
                      >
                        <i className="pi pi-trash"></i>
                      </ButtonB>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/** ------------------ Ventana para agregar Venta nueva ---------------*/}
      <Dialog
        header="Agregar Venta "
        visible={menuVisible}
        style={{ width: "1000px", fontSize: "12px" }}
        modal={true}
        onHide={() => setmenuVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div>
          <div className="">
            <div>
              <div width="10%">
                <span className="p-float-label mt-2" style={{ float: "right" }}>
                  <InputText disabled id="id" />
                  <label htmlFor="id">Consecutivo</label>
                </span>
              </div>
              <div className="col-2">
                <input
                  height="15px"
                  type="text"
                  className="form-control"
                  placeholder="Identificación..."
                  id="buscarProd"
 
                  onChange={inputBuscarCliente}
                />
              </div>
              <div>
                <span className="p-float-label mt-2">
                  <InputText
                    placeholder="Nombre Cliente"
                    disabled
                    id="clientName"
                  />
                  <label htmlFor="clientName">
                    {tablaBuscarClient.clientName}
                  </label>
                </span>
              </div>
               <div className="">
                  <Button
                    id="clientName"
                    label="Buscar"
                    icon="pi pi-check"
                    onClick={() => buscarCliente()}
                    className="p-button-success mt-2 "
                  />
              </div>
            </div>

            <Col>
              <span className="p-float-label mt-2">
                <InputText disabled id="userSede" onChange={capturaInput} />
                <label htmlFor="userSede">{state.user.userSede}</label>
              </span>
            </Col>
          </div>

          <hr />

          <Table>
            <thead>
                <tr>
                    <td>Cantidad</td>
                    <td>Codigo</td>
                    <td>Descripción</td>
                    <td>Valor/Unidad</td>
                    <td>Valor/Total</td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td
                    onChange={capturaInputCliente}
                    >0</td>
                    <td>-</td>
                    <td>-</td>
                    <td>$0</td>
                    <td>$0</td>
                </tr>
                <tr>
                    <td
                    onChange={capturaInputCliente}
                    >0</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td
                    onChange={capturaInputCliente}
                    >0</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">Subtotal:</td>
                    <td>$-</td>
                </tr>
                <tr>
                    <td colSpan="4" >I.V.A:</td>
                    <td>$-</td>
                </tr>
                <tr>
                    <td colSpan="4" >Total:</td>
                    <td>$-</td>
                </tr>
            </tfoot>
          </Table>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => agregarVenta()}
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
              value={insertProd && insertProd.clientId}
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
                onClick={() => agregarVenta()}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default VentasHook;
