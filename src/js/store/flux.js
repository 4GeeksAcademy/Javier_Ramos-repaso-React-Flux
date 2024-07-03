const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: null,
			selected: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			delTodo: async (id) => {
				try {
					//no estamos teniendo const resp y const data porque no estamos usando sus valores para nada en estas funciones.

					await fetch('https://playground.4geeks.com/todo/todos/' + id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify() //para POST y PUT
					})
					//getActions() -> nos permite ejecutar otra funcion de actions
					//getUsersTodos(user) -> funcion que se trae el listado de todos del usuario, pero necesita el nombre del usuario que lo recibe como parametro
					//getStore().selected -> nos permite acceder a la variable selected que esta dentro del store
					//getUsersTodos(getStore().selected) ---> accedemos al store, tomamos el valor de la variable selected y se lo pasamos a getUsersTodos() 
					getActions().getUsersTodos(getStore().selected)
				} catch (error) {
					console.log(error)
				}
			},
			createTodo: async (todo) => {
				//el objeto que se crea TIENE que ser como DICE la API, las propiedades del objeto tiene que ser las que dice la API, no es negociable!
				const payload = {
					label: todo,
					is_done: false
				}
				try {
					//no estamos teniendo const resp y const data porque no estamos usando sus valores para nada en estas funciones.
					await fetch('https://playground.4geeks.com/todo/todos/' + getStore().selected, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(payload) //para POST y PUT
					})
					//no pasamos nada al store aqui porque la respuesta del fetch es solo el todo que se crea, no el listado de todos
					//por eso llamamos a getUsersTodos() pra traernos la lista actualizada
					//getActions() -> nos permite ejecutar otra funcion de actions
					//getUsersTodos(user) -> funcion que se trae el listado de todos del usuario, pero necesita el nombre del usuario que lo recibe como parametro
					//getStore().selected -> nos permite acceder a la variable selected que esta dentro del store
					//getUsersTodos(getStore().selected) ---> accedemos al store, tomamos el valor de la variable selected y se lo pasamos a getUsersTodos() 
					getActions().getUsersTodos(getStore().selected)
				} catch (error) {
					console.log(error)
				}
			},
			selectUser: (user) => {
				//no es async porque estamos trabajando con nuestros estados como tal, no con fetch
				setStore({ selected: user }); //ponemos en el store el usuario que ha sido seleccionado en selected
				getActions().getUsersTodos(user); //ejecutamos la funcion getUsersTodos() para traernos la lista de todos del usuario y le pasamos el user para completar la direccion del url del fetch
			},
			getUsersTodos: async (user) => {
				try {
					//si es un get, no hace falta poner metodo: get porque es el metodo por defecto del FETCH
					//aqui si usamos resp y data porque vamos a utilizar los valores de data para pasarlo al store 
					const resp = await fetch('https://playground.4geeks.com/todo/users/' + user)
					const data = await resp.json() // js trabaja con objetos, no con texto
					setStore({ todos: data.todos }) //almacenamos en el store, en todos la respuesta 
				} catch (error) {
					console.log(error)
				}
			},
			createUser: async (name) => {
				try {
					//no estamos teniendo const resp y const data porque no estamos usando sus valores para nada en estas funciones.					
					await fetch('https://playground.4geeks.com/todo/users/' + name, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify() //para POST y PUT
					})
					//no pasamos nada al store aqui porque la respuesta del fetch es solo el usuario que se crea, no el listado de usuarios
					//por eso llamamos a getUsers() pra traernos la lista actualizada
					getActions().getUsers()

				} catch (error) {
					console.log(error)
				}
			},
			delUser: async (name) => {
				try {
					//no estamos teniendo const resp y const data porque no estamos usando sus valores para nada en estas funciones.
					await fetch('https://playground.4geeks.com/todo/users/' + name, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify() //para POST y PUT
					})
					//llamamos a getUsers() despues de eliminar para traernos la lista actualizada de usuarios
					getActions().getUsers()
				} catch (error) {
					console.log(error)
				}
			},
			getUsers: async () => {
				try {
					//si es un get, no hace falta poner nada porque es el metodo por defecto del FETCH
					//no pasamos un usuario porque este fetch nos devuelve TODOS los usuarios
					// tenemos resp y data porque necesitamos pasar lo que va a estar en data al store
					const resp = await fetch('https://playground.4geeks.com/todo/users')
					const data = await resp.json() // js trabaja con objetos, no con texto
					setStore({ users: data.users })
				} catch (error) {
					console.log(error)
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
