import { Redirect, Route, useLocation } from "react-router";
import UserAutent from "../auth/UserAutent";

// el if debe evaluar si solo existe el rol - role && user?.role !== role
// pregunta si el rol y el usiario existe, pregunte si es igual al rol q envian en el user

export default function PrivateRoute({tipoRole: role, ...props}) {

    //const user = null;

    // Llamamo el hook useLocation de react.router-dom
    const location = useLocation();

    const {tipoRole, startLogin} = UserAutent();

    if(role && !tipoRole (role)) return <Redirect to="/"/>

    //si el usuario no esta registrado, redirigeme al login sino, ve  al
    // direccion recibida atraves de los props
    
    // Con el useLocation podemos saber cual fue la ruta anterior para redireccionar y seguridad
    if(!startLogin()) return <Redirect to={{pathname: "/login", state: {from: location}}}/>

    return (
        <Route {...props}/>
    )
}
