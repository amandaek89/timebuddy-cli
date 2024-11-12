import React from 'react'
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        localStorage.removeItem('token');
        navigate('/');


    }

    return (
        <div>
            <button onClick={handleClick} type="button" className="btn btn-outline-light">Logout</button>
        </div>
    )
}

export default Logout