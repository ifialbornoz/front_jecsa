import axios from "axios";

import { Dialog } from "primereact/dialog";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Table } from "react-bootstrap";
import { useEffect } from "react";
import UserAutent from "../auth/UserAutent";

export default function RepVentasPage() {
  const [tablaBuscar, setTablaBuscar] = useState([]);
  const [listaVisible, setListaVisible] = useState(false);
  const [data, setData] = useState([]);
  const [dataVentas, setDataVentas] = useState([]);
  const [tablaBuscarVentas, setTablaBuscarVentas] = useState([]);
  const [listaVisibleVentas, setListaVisibleVentas] = useState(false);

  const { state } = UserAutent();

  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center">
          <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
        </div>
      </div>
    );
  };

  // ---------------------------- Metodo, Mostar lista de clientes por Sede --------------------------

  let baseUrl = "http://localhost:9000/apiTienda/client/";

  const mostarListaClientes = async () => {
    await axios.get(baseUrl + "listClient").then((response) => {
      setData(response.data);
      setTablaBuscar(response.data);
    });
  };

  const mostrarVentanaLista = () => {
    mostrarPorSede(state.user.userSede);
    setListaVisible(true);
  };

  useEffect(() => {
    mostarListaClientes();
    mostarListaVentas();
  }, []);

  const mostrarPorSede = (ventasSede) => {
    var resultadoBusqueda = tablaBuscar.filter((client) => {
      if (
        client.sede.toString().toLowerCase().includes(ventasSede.toLowerCase())
      ) {
        return client;
      }
    });
    setData(resultadoBusqueda);
  };

  // ----------------------------------------  Ventas por Clientes -----------------------------------------

  let urlVentas = "http://localhost:9000/apiTienda/venta/";
  const mostarListaVentas = async () => {
    
    await axios.get(urlVentas + "finAllVentas").then((response) => {
      setDataVentas(response.data);
      setTablaBuscarVentas(response.data);
    });
  };

  const mostrarVentaPorSede = (ventasSede) => {
    var resultadoBusqueda = tablaBuscarVentas.filter((sedeBuscada) => {
      if (sedeBuscada.sede.toString().toLowerCase().includes(ventasSede.toLowerCase())) 
      {
        return sedeBuscada;
      }
    });
    console.log(resultadoBusqueda)
    setDataVentas(resultadoBusqueda);
  };

  const mostrarVentanaListaVentas = () => {
    mostrarVentaPorSede(state.user.userSede);
    setListaVisibleVentas(true);
  };

  return (
    <div className="container mt-3">
      <h1>Reporte de Ventas</h1>

      <div className="text-center">
        <Button
          className="mx-4"
          onClick={() => mostrarVentanaLista()}
          variant="secondary"
        >
          Listado de Clientes
        </Button>
        <Button
          onClick={() => mostrarVentanaListaVentas()}
          className="mx-4"
          variant="secondary"
        >
          Ventas por Clientes
        </Button>
      </div>

      <Dialog
        header="Listado de Clientes"
        visible={listaVisible}
        style={{ width: "80%", fontSize: "12px" }}
        modal={true}
        onHide={() => setListaVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <Card>
          <Table striped bordered hover responsive="sd" border="secondary">
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Dialog>


    {/** Ventana para mostrar las ventas por Sede */}

      <Dialog
        
        header="Listado de ventas por Clientes"
        visible={listaVisibleVentas}
        style={{ width: "40%", fontSize: "12px" }}
        modal={true}
        onHide={() => setListaVisibleVentas(false)}
        footer={renderFooter("displayBasic")}
      >
          <Card >
          <Table striped bordered hover responsive="sd" border="secondary">
            <thead className="text-center">
              <tr style={{ fontWeight: "bold" }}>
                <td>IDENTIFICACIÓN</td>
                <td>NOMBRE DEL CLIENTE</td>
                <td>VALOR TOTAL DE VENTAS</td>
              </tr>
            </thead>

            <tbody>
              {dataVentas.map((item) => (
                <tr key={item.id} style={{}}>
                  <td width="10%">{item.id}</td>
                  <td>{item.clientName}</td>
                  <td className="pesos">{item.valorAllVentas}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
            {dataVentas.map((item) => (
                <tr key={item.id}>
                    <td colSpan="2" className="text-center"><b>TOTAL DE VENTAS</b></td>
                    <td className="pesos"><b>{item.valorAllVentas}</b></td>
                </tr>
                 ))}
            </tfoot>
          </Table>
        </Card>


      </Dialog>
    </div>
  );
}
