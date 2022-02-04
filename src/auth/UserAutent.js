/** En este hook se consume el contexto, aca se recibe el contexValue que me envia el componente AuthProvider 
 * para consumir ese contexto debemos user el hook de react useContext() que recibe como argumento el contexto
 * a consumir (AuthContext) importado del AuthProvider.
 * Nota: Lo q se consume es el contexto, y el provider es quien nos envia la información.
 * La idea del userAuten es retornar el contexto a los hijos para no hacerlo en todos los archivos, es decir,
 * cuando se necesite, se llama al componente UserAutent
*/

import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function UserAutent() {
    const contextValue = useContext(AuthContext);
    return contextValue
}
