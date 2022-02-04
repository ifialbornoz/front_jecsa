import React from "react";
import { nanoid } from "nanoid";

export const UsersPage = () => {

  const [modoEditar, SetModoEditar] = React.useState(false)
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [id, setId] = React.useState('');
  const [errorVacio, setErrorVacio] = React.useState(false)


  const cargarTareas = (evento) => {
    // se recibe el evento para evitar que el formulario utilizara el metodo GET
    evento.preventDefault();

    // Este if es para verificar si se refirio algo o si esta vacio.
    // En caso de estar vacio, manda un mensaje a consola y se sale de la funcion
    if (!tarea.trim()) {
      console.log("Componente vacío");
      setErrorVacio(true)
      //alert("Campo Vacio");
      return;
    }
    console.log(tarea);

    // Para enviar las tareas a la lista de tareas debemos crear un state que llegue un array vacio
    // como las tareas necesitan un id, toca agregar como dato un objeto a la lista
    setTareas([
      ...tareas,
      // creamos el objeto
      // nanoid es una libreria q crea id aleatoriamente; primero toca descargar la libreria; npm i nanoid; luego importar
      { id: nanoid(5), nombreTarea: tarea },
    ]);
    // Para resetear el campo de tareas envias un set vacio y en el input pasamos la tarea al value
    setTarea("");
    setErrorVacio(false)
  };


  // ------------------------- Eliminar tareas ----------------------------------
  const delTarea = (id) => {
    console.log(id);
    // vamos a recorrer el array de tareas y filtramos por id. Si el id es diferente se va guardando en arrayFiltrado
    // si el id es igual al q pasamos, excluye esa tarea o item
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };


  // ------------------------ Editar tareas --------------------------------------
  const putTarea = (item) => {
    console.log(item);
    SetModoEditar(true)
    setTarea(item.nombreTarea)
    // En setId enviamos el Id para la funcion edtarTarea
    setId(item.id)

  };

  const editarTarea = (evento) => {
      // se recibe el evento para evitar que el formulario utilizara el metodo GET
      evento.preventDefault();
      if (!tarea.trim()) {
        console.log("Componente vacío");
        setErrorVacio(true)
        return;
      }

      // Utilizamos tareas (donde esta la informacion) la recorremos con un map(). Map toma un item y va ir devolviendo
      // en el nuevo arrayEditado el elemento, segun la condición que le coloquemos
      // si item.id es igual a id que estamos modificando (el id guardado en setId), "?" entonces devuelveme un objeto editado que va a tener
      // el id con su respectiva tarea , si no es igual retorna el item, tal cual

      // Descrpcion de objeto {propiedad1: valor, propiedad2: valor} el valor puede ser cualquier dato

      const arrayEditado = tareas.map(
        item => (item.id === id) ? {id:id, nombreTarea: tarea} : item)
      setTareas(arrayEditado)
      SetModoEditar(false)
      setTarea('')
      setId('')
      setErrorVacio(false)
      console.log(tarea);
  }

    return (
        <div className="container">
      <h1 className="text-center">CRUD - Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.map((item) => (
              <li key={item.id} className="list-group-item">
                <span className="lead">{item.nombreTarea}</span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => delTarea(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end mx-2"
                  onClick={() => putTarea(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              errorVacio ? '¡Campos vacios!' : (modoEditar ? 'Editar Tarea' : 'Agregar Tarea') 
            }
          </h4>
          <form onSubmit={ modoEditar ? editarTarea : cargarTareas}>
            <input
              type="text"
              className="form-control mb-2"
              placeHolder="Ingrese tarea"
              // con el onChange relacionamos el input con el estado
              onChange={(evento) => setTarea(evento.target.value)}
              value={tarea}
            />
            <div className="d-grid gap-2">
              {
                modoEditar ? (
                  <button className="btn btn-warning" type="submit">Editar</button>
                ): (
                  <button className="btn btn-dark" type="submit">Agregar</button>
                ) 
              }
             
            </div>
          </form>
        </div>
      </div>
      <footer>
		<div>
			© 2021 Copyright | CRUD React - Ing. Jaime Agudelo Bentham
		</div>
</footer>
    </div>
    );
}


