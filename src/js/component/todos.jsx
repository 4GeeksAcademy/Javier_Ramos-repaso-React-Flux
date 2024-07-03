import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Todos = () => {

    const { store, actions } = useContext(Context);
    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault(); // evita recarga de la pagina
        //a esta accion de crear todo, dependiendo del estilo y como lo diseñemos, le enviaremos o el task y en flux crearemos el objeto a pasarle, 
        //o crearemos el objeto aquí y se lo pasaremos a la funcion para recibirlo en flux
        //en este caso, estamos enviando la tarea y creando el objeto en flux
        actions.createTodo(task)
        setTask('') //devolvemos el estado a vacio para que se limpie cuando se hace el envio   
    }
    //ejecutamos en una linea la accion delTodo pasandole el id que recibimos del onClick en linea 29
    const handleDelete = (id) => actions.delTodo(id)

    return (

        <form onSubmit={handleSubmit}>
            {/* mostramos el usuario en selected en el store */}
            <h3>Todos de {store.selected}</h3>
            {/* como es un solo estado, estamos haciendo el manejo del estado del onChange directamente */}
            <input type="text" name="label" value={task} onChange={e => setTask(e.target.value)} />
            <input type="submit" value="crear todo" />
            <ul className="w-50 mx-auto">
                {store.todos?.map(el => <li className=" my-3 d-flex justify-content-between" key={el.id}>{el.label}
                    {/*necesitamos pasarle el id, asi que usamos ()=> handleDelete(el.id) para poderle pasar el id que viene del map  */}
                    <span className="fa-solid fa-trash" onClick={() => handleDelete(el.id)}></span></li>)}
            </ul>
        </form>
    )

}