// Para el componente es necesario importar el createContext de react
// - se crea el AuthContext a traves del createContext()
//   este se exporta porq se va a necesitar en archivos externos
//   para consumir dicho contexto

// Al crear el componente AuthProvider, el jsx que va a retornar va a ser
// el AuthContext.Provider, componente para enviar un contexValue

/* El contexValue es un objeto que creamos con la infromacion que queremos 
   transmitir a los componentes hijos, en este caso vamos a trasmitir el user
   este va a ser un estado (useState) que va cambiando conforme al usuario se autentique
   y cierre sesión */


import { React, useState } from "react"
import { createContext } from "react";
import { useHistory } from "react-router";


// Se coloca export porq se va a consumir externamente
export const AuthContext = createContext()

export default function AuthProvider({children}) {

    const history = useHistory();

    const [user, setUser] = useState(null);
    const state = {user, setUser}

    // cuando el ususario se actualiza se vuelve a renderizar las turas que enlazan el contexto
    // por eso se vuelve  averificar la autenticacion y por eso se ve que cambia de pagina al inicar
    // y cerrar sesion. Pero para volver a la ruta anterior se debe utilizar un historyPush

    const login = (userCredencials,  fromLocation) =>{

        
        //setUser({id:1, userName: "Cali" ,role: Roles.admin, userSede: "cali"});
        if(fromLocation){
            history.push(fromLocation)
        }
        
        
    }

    const logout = () => setUser(null);

    // Si el usuario existe retorna true con la doble negación, en caso que no exita retorna false
    // Los consulto en el privateRouter y rutasPublicas

    const startLogin = () => !!user;
    const tipoRole = (role) => user?.role === role;

//const [user, setUser] = React.useState(null);


//const [user, setuser] = useState(null)

// const [user, setUser] = useState(null)

const   contextValue = {

    startLogin,
    tipoRole,
    login,
    logout,
    state
};



    return (
        <>
 
                <AuthContext.Provider value={contextValue}>
                    {children}
                </AuthContext.Provider>

        </>
    )
}

