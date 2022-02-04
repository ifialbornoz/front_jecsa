import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Image } from "primereact/image";
import UserAutent from "../auth/UserAutent";

export default function Navigation() {
  
  const { logout, state } = UserAutent();

  //const [userActivo, setUserActivo] = useState(" ")
/*
  const mostarUsuarioActivo = () => {
    
    if (!startLogin) {
      const datosUser = user.userName;
      console.log("iniciado");
      console.log(datosUser);
      setUserActivo(`/ Sede ${datosUser}`);
      
    } else {
      setUserActivo(userInicial);
      console.log("no iniciado");
        
      
    }
  };
*/

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
        className="navGral"
      >
        <Navbar.Brand as={NavLink} to="/" className="mx-4">
          <Image
            src="logo.png"
            alt="Image"
            width="50"
          />
          <p className="jecsa" style={{ color: "#0acffe", float: "right" }}>
            Tienda Deportiva - Jecsa
          </p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menú" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/clientesHook">
                Clientes
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/proveedores">
                Proveedores
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/productos">
                Productos
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/addproductos">
                Subir Productos - CSV
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ventas">
                Ventas
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/rVentas">
                Reporte de Ventas
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/sedes">
                Sedes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="mx-1">
            
            <Nav.Link as={NavLink} to="/admin/:user">
              Registrar Usuarios
            </Nav.Link>
            <Nav.Link as={NavLink} to="/consolidado">
              Consolidado
            </Nav.Link>
            <Nav.Link onClick={logout} as={NavLink} to="/">
              Cerrar sesión
            </Nav.Link>
            <Nav.Link
              style={{ color: "#0acffe", float: "right" }}
              disabled
              >
                {state.user && <b>{state.user.userName}</b>}
              </Nav.Link>
                      
             </Nav>
             
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
