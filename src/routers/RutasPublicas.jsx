import { Redirect, Route } from "react-router";
import UserAutent from "../auth/UserAutent";

export default function RutasPublicas({tipoRole: role, ...props}) {

    //const user = null;
    

    const {startLogin} = UserAutent();

    // En las rutas publicas se comprueba si el usuario esta logeado
    // no tiene necesidad de entrar nuevamente al login, sino que lo 
    // redirige a otra pagin, ejm: ventas.

    if(startLogin()) return <Redirect to="/"/>
    return (
        <Route {...props}/>
    )
}
