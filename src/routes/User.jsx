import { useState, useEffect } from "react";
import db from '../utils/db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams, Link, useNavigate } from "react-router-dom";

export const User = () => {

    const [user, setUser] = useState({});

    const { id } = useParams();

    const navigate = useNavigate();

    const fetchUser = async (userId) => {
        const dbTarget = doc(db, "ContactBook", userId);
        const dbGet = await getDoc(dbTarget);
        if (dbGet.exists()) {
            setUser(
                {
                    id: dbGet.id,
                    ...dbGet.data()
                }
            )
        } else {
            alert('User not found in the database.');
            return null;
        }
    };

    useEffect(() => { fetchUser(id) }, [id]);

    // console.log(user);

    const handleDelete = async () => {
        const msg = "confirm delete user?";
        try {
            if(confirm(msg) == true){
                const dbTarget = doc(db, "ContactBook", id);
                await deleteDoc(dbTarget);
                setUser({});
                navigate('/');
            } else{
                navigate(0);
            }
        } catch (error) {
            console.log("damn error", error);
        }
    }

    const DeleteUser = () => {
        return(
            <span className="col-3 text-center">
            <button onClick={handleDelete}>Delete User</button>
        </span>
        )
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h1 className="col-12 text-center">{user.name} {user.lastName}</h1>
                </div>
                <hr />
                <ul className="row justify-content-center">
                    <li className="col-12 text-center">Phone: {user.phone}</li>
                    <li className="col-12 text-center">Email: {user.email}</li>
                    <li className="col-12 text-center">Address: {user.address}</li>
                </ul>
                <hr />
                <div className="row justify-content-center">
                    <Link className='col-3 text-center' to={`/edit/${user.id}`}>
                        <button>Edit User</button>
                    </Link>
                    <DeleteUser />
                </div>
            </div>

        </>
    )
}

export default User;