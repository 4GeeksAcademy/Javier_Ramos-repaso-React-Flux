import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const UserList = () => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState('')
    console.log(store.users)


    const handleDelete = (name) => {
        actions.delUser(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        actions.createUser(user)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setUser(e.target.value)} />
                <input type="submit" value="crear usuario" />
            </form>
            <ul className="w-50 mx-auto">
                {store.users?.map(el => <li className=" my-3 d-flex justify-content-between" key={el.id}>
                    {el.name}
                    <div>
                        <span className="fa-solid fa-circle-check mx-3" onClick={() => actions.selectUser(el.name)}></span>
                        <span className="fa-solid fa-trash" onClick={() => handleDelete(el.name)}></span>
                    </div>
                </li>)}
            </ul >
        </>
    )
}