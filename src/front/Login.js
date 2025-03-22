import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App';

const Private = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setAuth(null);
        navigate('/login');
    };

    return (
        <div className='container mt-5'>
            <h2>Bienvenido a la página privada</h2>
            <p>Solo los usuarios autenticados pueden ver esto.</p>
            <button className='btn btn-danger' onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Private;
