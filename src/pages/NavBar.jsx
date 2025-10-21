import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logoCarniceriaMadarey.png'; 
import { useAppContext } from "../context/AppContext";

function NavBar() { 
    
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation(); 

    const { carrito, isAuthenticated, usuario, cerrarSesion } = useAppContext();
    
    const itemCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className="navbar-tech">
            <div className="navbar-logo">
                <Link to='/'>
                    <img src={logoImage} alt="Logo de Carniceria Madarey" className="logo-img" />
                </Link>
            </div>

            <div className="navbar-brand-center">
                <span className="brand-title">Carniceria Madarey</span>
                <span className="premium-text">Calidad Premium</span>
            </div>

            <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <li className="nav-item">
                    <Link to='/' onClick={toggleMenu} className={getLinkClass('/')}>Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link to='/Productos' onClick={toggleMenu} className={getLinkClass('/Productos')}>Productos</Link>
                </li>
                <li className="nav-item">
                    <Link to='/Ofertas' onClick={toggleMenu} className={getLinkClass('/Ofertas')}>Ofertas</Link>
                </li>
                <li className="nav-item">
                    <Link to='/Resenias' onClick={toggleMenu} className={getLinkClass('/Resenias')}>Reseñas</Link>
                </li>
                <li className="nav-item">
                    <Link to='/Contacto' onClick={toggleMenu} className={getLinkClass('/Contacto')}>Contacto</Link>
                </li>
                
                <li className="nav-item nav-carrito-item">
                    <Link to='/Carrito' className={`btn-carrito ${getLinkClass('/Carrito')}`} onClick={toggleMenu} title="Ir al carrito">
                        <i className="fas fa-shopping-cart"></i> 
                        {itemCount > 0 && <span className="carrito-contador">{itemCount}</span>}
                    </Link>
                </li>
            </ul>

            {isAuthenticated && (
                <div className="nav-user-profile-wrapper user-wrapper-desktop">
                    <div className="user-profile-info"> 
                        <span className="user-name">Hola, {usuario.nombre}</span>
                        <button onClick={() => { cerrarSesion(); toggleMenu(); }} className="btn-logout" title="Cerrar sesión">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar;