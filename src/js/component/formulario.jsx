import React, { useState } from "react";

export const Formulario = () => {




    const test = () => 'funcion de prueba'
    //siempre que hay () -> ejecucion
    //funcion sin parentesis -> referencia
    console.log('pepe esta aqui') // estamos ejecutando un console.log porque le pasamos los ()
    console.log(test) // hacemos referencia a la funcion, pero no la ejecutamos


    /*
    ejemplo de map con ejecutando una funcion como callback function 
    const arr = [1,2,3]
    const f = el =>console.log(el) 
    arr.map(f)
    */



    /*
    trabajando con objetos --- -ejemplo
const obj = {} //esta vacio
obj.age = 55
obj.city = 'Sevilla'
obj.sayHi = ()=>console.log('Hi')
obj.sayHi()
console.log(obj) //ya no esta vacio
*/

    let json = { name: 'pepe', age: 55 }
    console.log('json ', json);
    //que sucede cuando utilizamos stringify y el parse (que es el .json() en el fetch) de JSON
    json = JSON.stringify(json)
    console.log('stringify ----> ', json);
    json = (JSON.parse(json))
    console.log('parse ----> ', json);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: ''
    })
    // forma de hacer el handleChange en una sola linea haciendo uso de las caracteristicas de las arrow functions
    //const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log('name', name, 'value', value)
    }


    const handleSubmit = e => {
        e.preventDefault() // evita que se refresque/ recargue la pagina
        console.log('submit event', formData)
    }

    return (
        <>
            <h2>componente formulario</h2>

            <p>binding de 2 vias</p>

            <form className="w-50 mx-auto form-control" onSubmit={handleSubmit}>
                <label >name
                    <input className="form-control" name="name" value={formData.name} onChange={handleChange} type="text" />
                </label>
                <label >phone
                    <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} type="text" />
                </label>
                <label >address
                    <input className="form-control" name="address" value={formData.address} onChange={handleChange} type="text" />
                </label>
                <label > email
                    <input className="form-control" name="email" value={formData.email} onChange={handleChange} type="text" />
                </label>

                <input type="submit" value="enviar" className="btn btn-primary" />

            </form>
            {/* siempre que querramos ejecutar algo como un alert(), console.log() o demas funciones/metodos que llevan el () en un evento, 
                tenemos que poner ()=> antes para que solo se ejecute cuando se dispara el evento */}
            <button onClick={() => alert('click')}>
                test
            </button>
        </>

    )
}