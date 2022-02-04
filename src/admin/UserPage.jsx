import {Component} from "react";
import { Col, Row } from "react-bootstrap";
import { UserService } from "../service/UserService";
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
import Form from "react-bootstrap/Form";
import { Toast } from 'primereact/toast';



//export default function UserPage() {

export default class UserPage extends Component {

  

  constructor() {
    super();
    this.state = {
      menuVisible: false,
      
      user: {
        id: null,
        userPass: null,
        userName: null,
        user: null,
        userSede: null,
        role: null,
      },

      selectUser: {
        id: null,
        userPass: null,
        userName: null,
        user: null,
        userSede: null,
        role: null,
      },


    };

    // this.setState({ users: [] })
    this.userService = new UserService();
    this.saveUser = this.saveUsers.bind(this);
    this.deleteUserId = this.deleteUsers.bind(this);
   

    this.iconoAgregar = [
      {
        label: "Agregar un usuario nuevo",
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
          if(this.state.selectUser.id!==null){
            
          this.mostrarVentanaEdicion();
          }else {
            this.setState({
              menuVisible: false,
            })
           
        
          }
        },
      },

      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.deleteUsers();
        },
      },
    ];

    // Footer
    this.footerComp = [
      <div className="text-center">
        <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
      </div>,
    ];

    this.showSuccess = this.showSuccess.bind(this);
  }

  showSuccess() {
    this.toast.show({severity:'success', summary: 'Success Message', detail:'Accion exitosa', life: 3000}); 
  }

  // ----------------------------------    Llamamaos los metodos del ciclo de vida ---------  componetDidMount --------------
  // * Se ejecuta una vez el componente este cargado

  componentDidMount() {
    document.title = "Tienda Jeccs | Registrar Usuarios";
    this.secuenciaIdUser();
    this.listasUsuarios();
  }


  /* ---------------------- Mostrar la ventana de agregar -----------------------------*/

  secuenciaIdUser (){
    this.userService.getAll().then((data) => this.setState({usersId: data }));

    
  }

  mostrarVentanaAgregar() {
    
    this.setState({
      menuVisible: true,
      user: {
        id: null,
        userPass: null,
        userName: null,
        user: null,
        userSede: null,
        role: null,
      },


    });
  }

  /* ---------------------- Guardar Usuarios en la lista -----------------------------*/ 
  
  saveUsers() {
    this.userService.saveUsers(this.state.user).then((data) => {
      this.setState({
        menuVisible: false,
        user: {
          id: null,
          userPass: null,
          userName: null,
          user: null,
          userSede: null,
          role: null,
        },
      });
      this.showSuccess();
      this.listasUsuarios();
    });
  }

  /* ---------------------- Metodo para listar los usuarios -----------------------------*/ 


  listasUsuarios(){
    this.userService.getAll().then((data) => this.setState({users: data }));

  
  }

  /* ---------------------- Mostrar la ventana de edición -----------------------------*/ 

  mostrarVentanaEdicion(){

    this.setState({
      menuVisible: true,
      user: {
        id: this.state.selectUser.id,
        userPass: this.state.selectUser.userPass,
        userName: this.state.selectUser.userName,
        user: this.state.selectUser.user,
        userSede: this.state.selectUser.userSede,
        role: this.state.selectUser.role,
      },

    })
  }

  /* ---------------------- Borrar Usuarios de la lista -----------------------------*/ 

  deleteUsers (){
    if(window.confirm("¿Desea eliminar el usuario? " + this.state.selectUser.userName )){
      this.userService.deleteUserId(this.state.selectUser.id).then(data => {
        this.showSuccess();
        this.listasUsuarios();
      })
    }

  }
  
  

  render() {
    return (
      
      <div>
        <Toast ref={(el) => this.toast = el} />

        <div className="container mt-3" style={{}}>
          <div className="col-md-6">
            <h1 id="header-title">Usuarios</h1>
          </div>
        </div>

        <Menubar model={this.iconos} className="container" />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 id="header-title">Listado de Usuarios</h2>
            </div>
            {/*<div className="col-md-6 align-self-center ">
              <Buscar buscarA="Buscar Usuarios..." idBuscar="buscarUsuarios" />
            </div>*/}
          </div>
        
        <br />

        <div className="container">
          <DataTable value={this.state.users}  
          selectionMode="sigle" 
          onSelectionChange={e => this.setState({ selectUser: e.value })} 
          selection={this.state.selectUser}>

            <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
            <Column field="id" header="Id"></Column>
            <Column field="userName" header="Nombre"></Column>
            <Column field="user" header="Usuario"></Column>
            <Column field="userPass" header="Contraseña"></Column>
            <Column field="userSede" header="Sede"></Column>
            <Column field="role" header="Rol"></Column>
          </DataTable>
          {/*}
          <Table striped bordered hover responsive="md" border="secondary">
            <thead>
              <tr style={{ fontWeight: "bold" }}>
                <td>Id</td>
                <td>Nombre</td>
                <td>Usuario</td>
                <td>Contraseña</td>
                <td>Sede</td>
                <td>Rol</td>
              </tr>
            </thead>

            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.user}</td>
                  <td>{user.userPass}</td>
                  <td>{user.userSede}</td>
                  <td>{user.role}</td>
                  <Menubar model={this.iconos}> </Menubar>
                </tr>
              ))}
            </tbody>
          </Table>
*/}

          {/* ------------------------ Dialog ----------------------------------*/}

          <Dialog
            header="Agregar usuario nuevo"
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
                  value={this.state.user.id}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.id = valor;
                      return { user };
                    });
                  }}
                />
                <label htmlFor="id">Id</label>
              </span>

              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="userName"
                  value={this.state.user.userName}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.userName = valor;
                      return { user };
                    });
                  }}
                />
                <label htmlFor="user">Nombre</label>
              </span>
              
              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="user"
                  value={this.state.user.user}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.user = valor;
                      return { user };
                    });
                  }}
                />
                <label htmlFor="userName">Usuario</label>
              </span>
              <span className="p-float-label mt-4">
                <InputText
                  className="container"
                  id="userPass"
                  value={this.state.user.userPass}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.userPass = valor;
                      return { user };
                    });
                  }}
                />
                <label htmlFor="userPass">Contraseña</label>
              </span>

              <span className="p-float-label mt-4">
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  className="container "
                  id="userSede"
                  style={{fontSize: "12px", color: "grey" }}
                  value={this.state.user.userSede}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.userSede = valor;
                      return { user };
                    });
                  }}
                >
                  <option>Seleccione la ciudad de sede</option>
                  <option value="cali">Cali</option>
                  <option value="medellin">Medellin</option>
                </Form.Select>
              </span>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalCheck"
              >
               <Col

                className="mt-2"
                sm={{ span: 4, offset: 0 }}>

                <Form.Label>Role</Form.Label>
                <Form.Check name="roleUser" type="radio" label="Regular" value="regular" 
                id="role"
                onChange={(e) => {
                  let valor = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.role = valor;
                    return { user };
                  });
                }}
                
                
                />
                <Form.Check name="roleUser" type="radio" label="Administrador" value="admin" 
                id="role"
                onChange={(e) => {
                  let valor = e.target.value;
                  this.setState((prevState) => {
                    let user = Object.assign({}, prevState.user);
                    user.role = valor;
                    console.log(user)
                    return { user };
                  });
                }}
                
                />
                </Col>
              </Form.Group>

              {/* 
              <span className="p-float-label mt-4">
                <InputText
                  type="text"
                  className="container"
                  id="userSede"
                  value={this.state.user.userSede}
                  onChange={(e) => {
                    let valor = e.target.value;
                    this.setState((prevState) => {
                      let user = Object.assign({}, prevState.user);
                      user.userSede = valor;
                      return { user };
                    });
                  }}
                />
                <label htmlFor="userSede">Sede</label>
              </span>
              */}
            </div>
            

            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <Button
                    label="Aceptar"
                    icon="pi pi-check"
                    onClick={this.saveUser}
                    className="p-button-success mt-2 "
                  />
                </div>
              </div>
            </div>
          </Dialog>
          
        </div>
      </div>
      </div>
    );
  }
}
