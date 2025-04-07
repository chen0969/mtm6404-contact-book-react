import { useState, useEffect } from 'react'
import db from './utils/db'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [conatctBook, setconatctBook] = useState([]);

  const fetchUser = async () => {
    const dbGet = await getDocs(collection(db, "ContactBook"));
    const data = dbGet.docs.map(
      doc => (
        {
          id: doc.id,
          ...doc.data()
        }
      )
    );
    data.sort((a, b) => a.lastName.localeCompare(b.lastName));
    setconatctBook(data);
  };

  useEffect(
    () => { fetchUser(); }, []
  );

  console.log(conatctBook);
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <h1 className='col-12 text-center o-h1'>Contact Book</h1>
        </div>
        <hr />

        <ul className='row justify-content-center p-0'>
          {conatctBook.map((user) => (
            <li className='col-12 fs-1 text-center' key={user.id}>
              <Link to={`/user/${user.id}`}>
                {`${user.lastName}`}
              </Link>
            </li>
          ))}
        </ul>
        <hr />

        <div className='row justify-content-center'>
          <Link className='col-3 text-center' to="/add">
            <button>Add User</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default App
