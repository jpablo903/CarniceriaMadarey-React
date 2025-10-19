import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logoCarniceriaMadarey.png'; 

function NavBar({ itemCount}) { 
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation(); 

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
        </nav>
    )
}

export default NavBar;