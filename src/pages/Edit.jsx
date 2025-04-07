import { useState, useEffect } from "react";
import db from "../utils/db";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { EditForm } from "../component/Editform";

export const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

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

    useEffect(() => {
        fetchUser(id)
    }, [id])

    console.log(user);

    const handleUpdate = async (updU) => {
        try {
            const docsheet = doc(db, "ContactBook", id);
            await updateDoc(docsheet, updU);
            navigate('/');
        } catch (error) { console.log("ohhhh"), error }
    }

    return (
        <>
            <EditForm user={user} onUpdate={handleUpdate} />
        </>
    )
}