import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ name, phone, email, address, contactId }) => {

    const handleDelete = contactId => {

    }

    return (
        <div className="card w-75">
            <p>name: {name}</p>
            <p>phonme: {phone}</p>
            <p>email: {email}</p>
            <p>address: {address}</p>
            <Link className="btn btn-success" to={'/single/' + contactId}>
                edit
            </Link>
            <button className="btn-btn-danger" onClick={handleDelete}>
                delete
            </button>
            <button className="btn-btn-danger">
                delete
            </button>
        </div>
    )
}