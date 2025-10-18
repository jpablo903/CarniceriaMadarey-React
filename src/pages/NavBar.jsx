import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from '../assets/logoCarniceriaMadarey.png'; 

function NavBar({ itemCount }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                <li className="nav-item"><Link to='/' onClick={toggleMenu}>Inicio</Link></li>
                <li className="nav-item"><Link to='/Productos' onClick={toggleMenu}>Productos</Link></li>
                <li className="nav-item"><Link to='/Ofertas' onClick={toggleMenu}>Ofertas</Link></li>
                <li className="nav-item"><Link to='/Resenias' onClick={toggleMenu}>Reseñas</Link></li>
                <li className="nav-item"><Link to='/Contacto' onClick={toggleMenu}>Contacto</Link></li>
                
                <li className="nav-item nav-carrito-item">
                    <Link to='/Carrito' className="btn-carrito" onClick={toggleMenu} title="Ir al carrito">
                        <i className="fas fa-shopping-cart"></i> 
                        {itemCount > 0 && <span className="carrito-contador">{itemCount}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;