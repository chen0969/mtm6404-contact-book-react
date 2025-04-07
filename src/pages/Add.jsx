import { useState } from "react";
import db from "../utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {
    const nav = useNavigate();
    const [formD, setFormD] = useState({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormD((newD) => ({
            ...newD,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formD);
        const push = collection(db, "ContactBook")
        try {
            const newUser = await addDoc(push, {
                name: formD.name,
                lastName: formD.lastName,
                email: formD.email,
                phone: formD.phone,
                address: formD.address
            })
            nav('/');
         } catch (error) { console.log('oh shit', error); }
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <div className="row justify-content-center">
                <h1 className="col-12 p-3 text-center">Add User Sheet</h1>
                <input className="col-6 p-3 fs-3" type="text" name="name" value={formD.name} placeholder="your first name" onChange={handleChange} />
                <input className="col-6 p-3 fs-3" type="text" name="lastName" value={formD.lastName} placeholder="your last name" onChange={handleChange} />
                <input className="col-12 p-3 fs-4" type="email" name="email" value={formD.email} placeholder="your email address" onChange={handleChange} />
                <input className="col-12 p-3 fs-4" type="text" name="phone" value={formD.phone} placeholder="your phone number" onChange={handleChange} />
                <input className="col-12 p-3 fs-5" type="text" name="address" value={formD.address} placeholder="your address" onChange={handleChange} />
                <button className="col-3 p-3 fs-1" type="submit">Add User</button>
            </div>
        </form>
    )
}