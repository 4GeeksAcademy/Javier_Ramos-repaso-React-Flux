import React, { useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";
import { UserList } from "../component/userList.jsx";
import { Context } from "../store/appContext.js";
import { Todos } from "../component/todos.jsx";

export const Home = () => {
	const { store } = useContext(Context)
	return (
		<div className="text-center mt-5">
			<h1>Repaso time</h1>
			<hr />
			<UserList />
			<hr />

			{/* si tenemos en el store a selected con info y a todos con info, se va a mostrar el componente Todos, sino, se mostrará el h3 */}
			{store.selected && store.todos ? <Todos /> : <h3>Seleccione un usuario</h3>}
		</div>
	);
}