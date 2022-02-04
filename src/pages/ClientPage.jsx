import { Component } from "react";
import { ClientService } from "../service/ClientService";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Buscar from "../component/part/Buscar";
import "primeicons/primeicons.css";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

//export default function ClientPage() {

export default class ClientPage extends Component {
  constructor() {
    super();
    this.state = {
      menuVisible: false,
      client: {
        id: null,
        clientName: null,
        clientNumber: null,
        clientAdress: null,
        clientEmail: null,
        sede: null,
      },
    };

    // this.setState({ clientes: [] })
    this.clientService = new ClientService();
    this.saveCliente = this.saveCliente.bind(this);

    this.iconoAgregar = [
      {
        label: "Agregar un cliente nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.mostrarVentanaAgregar();
        },
      },
    ];

    // los iconos no hacen parte de los estados
    this.iconos = [
      {
        label: "Agregar",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.mostrarVentanaAgregar();
        },
      },

      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          alert("saved");
        },
      },

      {
        label: "Eliminar",
        title: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          alert("Eliminar");
        },
      },
    ];

    // Footer
    this.footerComp = [
      <div className="text-center">
        <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
      </div>,
    ];
  }

  // Llamamaos los metodos del ciclo de vida ---------  componetDidMount --------------
  // * Se ejecuta una vez el componente este cargado

  componentDidMount() {
    document.title = "Tienda Jecsa | Clientes";
    this.clientService
      .getAll()
      .then((data) => this.setState({ clientes: data }));
  }

  mostrarVentanaAgregar() {
    this.setState({
      menuVisible: true,
      client: {
        id: null,
        clientName: null,
        clientNumber: null,
        clientAdress: null,
        clientEmail: null,
        sede: null,
      },
    });
  }

  


  saveCliente() {
    this.clientService.saveClient(this.state.client).then(data => {
      
     this.setState ({
      menuVisible: false,
       client: {
        id: null,
        clientName: null,
        clientNumber: null,
        clientAdress: null,
        clientEmail: null,
        sede: null,
      }
     })
     this.clientService
      .getAll()
      .then((data) => this.setState({ clientes: data }));
    });
  }

  render() {
    return (
      <div>
        <div className="container mt-3" style={{}}>
          <div className="col-md-6">
            <h1 id="header-title">Clientes</h1>
          </div>
        </div>

        <Menubar model={this.iconos} className="container" />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 id="header-title">Listado de Clientes</h2>
            </div>
            <div className="col-md-6 align-self-center ">
              <Buscar buscarA="Buscar Cliente..." idBuscar="buscarCliente" />
            </div>
          </div>
        </div>
        <br />
        <bd />
        <div className="container">
          <div className="card">
          <DataTable value={this.state.clientes} style={{border: "1px, black"}}>
            <Column field="id" header="Cédula"></Column>
            <Column field="clientName" header="Nombre"></Column>
            <Column field="clientAdress" header="Dirección"></Column>
            <Column field="clientNumber" header="Teléfono"></Column>
            <Column field="clientEmail" header="Email"></Column>
            <Column field="sede" header="Sede"></Column>
          </DataTable>
          </div>
          {/*
          <Table striped bordered hover responsive="md" border="secondary">
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <td>Cedula</td>
                <td>Nombre</td>
                <td>Telefono</td>
                <td>Dirección</td>
                <td>Email</td>
              </tr>
            </thead>

            <tbody>
              {this.state.clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.clientName}</td>
                  <td>{cliente.clientNumber}</td>
                  <td>{cliente.clientAdress}</td>
                  <td>{cliente.clientEmail}</td>
                  <Menubar model={this.iconos}> </Menubar>
                </tr>
              ))}
            </tbody>
          </Table>
*/}

          {/* ------------------------ Dialog ----------------------------------*/}

          <Dialog
            header="Agregar cliente nuevo"
            visible={this.state.menuVisible}
            style={{ width: "400px", fontSize: "12px" }}
            modal={true}
            onHide={() => this.setState({ menuVisible: false })}
            footer={this.footerComp}
          >
            <div>
              <span className="p-float-label mt-2">
                <InputText
                  className="container"
                  id="id"
                  value={this.state.client.id}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let client = Object.assign({}, prevState.client);
                      client.id = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="id">Cédula</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="clientName"
                  value={this.state.client.clientName}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let client = Object.assign({}, prevState.client);
                      client.clientName = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="clientName">Nombre y apellidos:</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="clientNumber"
                  value={this.state.client.clientNumber}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState(prevState => {
                      let client = Object.assign({}, prevState.client);
                      client.clientNumber = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="clientNumber">Teléfono:</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="clientAdress"
                  value={this.state.client.clientAdress}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let client = Object.assign({}, prevState.client);
                      client.clientAdress = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="clientAdress">Dirección:</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                type="email"
                  className="container"
                  id="clientEmail"
                  value={this.state.client.clientEmail}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let client = Object.assign({}, prevState.client);
                      client.clientEmail = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="clientEmail">Email:</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="sede"
                  value={this.state.client.sede}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let client = Object.assign({}, prevState.client);
                      client.sede = valor;
                      return { client };
                    });
                  }}
                />
                <label htmlFor="sede">Ciudad:</label>
              </span>
            </div>

            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <Button
                    label="Aceptar"
                    icon="pi pi-check"
                    onClick={this.saveCliente}
                    className="p-button-success mt-2 "
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
