import React, { useState } from "react";


import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Redirect, useLocation } from "react-router";
import UserAutent from "../auth/UserAutent";
import { Image } from "primereact/image";

export default function LoginPage() {
  // con este hook podemos controlar las redirecciones, por eso debemos pasar como segundo parametro
  // en el login del onClick el location.state.from, Porq que si este llamado no viene de una ruta anterior, equivale
  // a un indefinido, por lo cual no permite el ingreso a cualquier pagina

  const location = useLocation();
  const { login, state } = UserAutent();

  const userCredencials = {};

  const texte = "¡Usuario o contraseña son incorrecta!";
  const textvacio = "";

  const inicial = [
    {
      is:"",
      user: "",
      userPass: "",
      userName: "",
      userSede:"",
      role: "",
    },

    /*
    
      user:
      userPass:
      userName:
      userSede:
      role:

    */
  ];

  
  let baseUrl = "http://localhost:9000/apiTienda/user/";
  const [loginVisible, setLoginVisible] = useState(true);
  const [ingresoDatos, setIngresoDato] = useState(inicial);
  //const [user, setUser] = useState([]);
  const [textError, setTextError] = useState(textvacio);

  const capturaInput = (e) => {
    const { id, value } = e.target;
    setIngresoDato((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const ingresarLogin = async () => {
    await axios.get(baseUrl + "listUser").then((response) => {
      let datos = response.data;
      state.setUser(datos);
      //console.log(datos);
      datos.forEach((item) => {
        if (
          item.user === ingresoDatos.user &&
          item.userPass === ingresoDatos.pass
        ) {
          //alert("Ingreso exitoso"+ingresoDatos.user);
          setLoginVisible(false);
          setTextError(textvacio);
          setIngresoDato(inicial);
          login(userCredencials, location.state?.from);
          state.setUser(item);
        } else {
          setTextError(texte);
          <Redirect to="/login" />;
          setLoginVisible(true);
        }
      });
    });
  };

  const renderFooter = (name) => {
    return (
      <div>
        <div className="text-center">
          <b>© 2021 Copyright</b> | Tienda Deportiva Jecsa
        </div>
      </div>
    );
    }
    // como segundo argumento a la funcion login traemos el location.state.from
    // estado que se difinió en el privateRouter, y se utilizae l null operator "?"
    // porq si no se viene de otra ruta sino que se recargó directemente ne el login, seria undefined

  return (
    <div>
      {/*<button
            onClick={()=> login(userCredencials, location.state?.from)}
          >Iniciar sesión</button>
      */}
      <Dialog
        className="dialogLogin"
        header="Ingreso | Tienda Jeccs"
        visible={loginVisible}
        style={{ width: "400px", fontSize: "12px" }}
        modal={true}
        onHide={() => setLoginVisible(false)}
        footer={renderFooter("displayBasic")}
      >
        <div className="container col text-center">
          <Image
            className=""
            src="Jesca.png"
            //src="http://3.83.104.46:8080/Proyecto_MinTic/img/Jesca.png"
            alt="Image"
            width="200"
          />
        </div>
        <br/>
        <div>
          <span className="p-float-label mt-2">
            <InputText
              className="container"
              id="user"
              onChange={capturaInput}
            />
            <label htmlFor="user">Usuario:</label>
          </span>

          <span className="p-float-label mt-4">
            <InputText
              className="container"
              id="pass"
              onChange={capturaInput}
              type="password"
            />
            <label htmlFor="user">Contraseña:</label>
          </span>

          {/*
          <span className="p-float-label mt-4">
            <Form.Select
              aria-label="Default select example"
              type="text"
              className="container "
              id="sede"
              style={{ fontSize: "12px", color: "grey" }}
              onChange={capturaInput}
            >
              <option>Seleccione la ciudad de sede</option>
              <option value="cali">Cali</option>
              <option value="medellin">Medellin</option>
              <option value="bogota">Bogotá</option>
            </Form.Select>
          </span>
          */}
        </div>
        <label className="text-center container" style={{ color: "red" }}>
          {textError}
        </label>

        <div className="container">
          <div className="row">
            <div className="col text-center">
              <Button
                label="Aceptar"
                icon="pi pi-check"
                onClick={() => ingresarLogin()}
                // onClick={() => login(userCredencials, location.state?.from)}
                className="p-button-success mt-2 "
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );

}
