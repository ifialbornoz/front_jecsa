import React from "react";
import { BrowserRouter as Route, Switch} from "react-router-dom"
import UserPage from "../admin/UserPage";
import ClientPage from "../pages/ClientPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductPage from "../pages/ProductPage";
import ProvPage from "../pages/ProvPage";
import RepVentasPage from "../pages/RepVentasPage";
import VentasPage from "../pages/VentasPage";
import Layout from "../component/layouts/Layout";
import SedesPage from "../pages/SedesPage";
import PrivateRoute from "./PrivateRoute";
import ConsolidatePage from "../pages/ConsolidatePage";
import RutasPublicas from "./RutasPublicas";
import Roles from "../auth/Roles";
import LoginPageError from "../pages/LoginPageError";
import ProductPagePrime from "../pages/ProductPagePrime";
import ClientPageHook from "../pages/ClientPageHook";
import VentasHook from "../pages/VentasHook";
// import UserAutent from "../auth/UserAutent"

export default function AppRouter() {

    //const loginOk = new UserAutent();
    //console.log(loginOk.login);


    return (
        <>
        {/*<Router>
            <Layout>*/}
                <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <RutasPublicas exact path="/login" component={LoginPage} />
                    <Route exact path="/loginError" component={LoginPageError} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/clientes" component={ClientPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/clientesHook" component={ClientPageHook} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/proveedores" component={ProvPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/ventas" component={VentasHook} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/rVentas" component={RepVentasPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/admin/:user" component={UserPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/productos" component={ProductPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/addproductos" component={ProductPagePrime} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/sedes" component={SedesPage} />
                    <PrivateRoute tipoRole={Roles.admin} exact path="/consolidado" component={ConsolidatePage} />
                    
                    <Route path="*" component={NotFoundPage} />
                </Switch>
              {/*  </Layout>
            </Router>*/}
        </>

    )
}
