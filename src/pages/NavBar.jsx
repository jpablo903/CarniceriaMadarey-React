import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logoCarniceriaMadarey.png';
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import '../css/navbar.css';
import '../css/login-modal.css';
const LoginForm = ({ onLoginSuccess, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && email) {
            onLoginSuccess(nombre, email);
        } else {
            alert('Por favor, ingresa tu nombre y correo.');
        }
    };

    return (
        <div className="login-modal-overlay">
            <div className="login-form-container">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h3>Iniciar Sesión</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </label>
                    <label>
                        Correo Electrónico:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <button type="submit" className="btn-login-submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const { carrito } = useAppContext();
    const { isAuthenticated, usuario, cerrarSesion, iniciarSesion, esAdmin } = useAuthContext();
    const itemCount = carrito ? carrito.length : 0;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    const handleLoginClick = () => {
        setMostrarLogin(true);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        cerrarSesion();
        setMenuOpen(false);
        setUserMenuOpen(false);
    };

    const handleLoginSuccess = (nombre, email) => {
        iniciarSesion(nombre, email);
        setMostrarLogin(false);
        alert(`¡Bienvenido ${nombre}!`);
    };

    return (
        <nav className="navbar-tech">
            <div className="navbar-top-row">
                <div className="navbar-logo-title">
                    <Link to='/' className="logo-link">
                        <img src={logoImage} alt="Logo de Carniceria Madarey" className="logo-img" />
                    </Link>
                    <div className="navbar-brand">
                        <span className="brand-title">Carniceria Madarey</span>
                        <span className="premium-text">Calidad Premium</span>
                    </div>
                </div>
            </div>

            <div className="navbar-bottom-row">
                <div className="navbar-menu-section">
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
                    </ul>
                </div>

                <div className="navbar-icons-section">
                    <div className="nav-carrito-item">
                        <Link to='/Carrito' className={`btn-carrito ${getLinkClass('/Carrito')}`} title="Ir al carrito">
                            <i className="fas fa-shopping-cart"></i>
                            {itemCount > 0 && <span className="carrito-contador">{itemCount}</span>}
                        </Link>
                    </div>

                    <div className="nav-user-section">
                        {isAuthenticated ? (
                            <div className="user-menu-container">
                                <button
                                    className="user-menu-toggle"
                                    onClick={toggleUserMenu}
                                    title="Menú de usuario"
                                >
                                    <i className="fas fa-user-circle"></i>
                                </button>


                                {userMenuOpen && (
                                    <div className="user-dropdown-menu">
                                        {esAdmin && (
                                            <div className="user-dropdown-item">
                                                <Link to="/admin" className="btn-admin-dashboard" onClick={() => setUserMenuOpen(false)}>
                                                    <i className="fas fa-cog"></i>
                                                    Panel Admin
                                                </Link>
                                            </div>
                                        )}
                                        <div className="user-dropdown-item">
                                            <span className="user-info">Hola, {usuario.nombre}</span>
                                        </div>
                                        <div className="user-dropdown-item">
                                            <button onClick={handleLogout} className="btn-logout-dropdown">
                                                <i className="fas fa-sign-out-alt"></i>
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={handleLoginClick} className="btn-login-icon" title="Iniciar sesión">
                                <i className="fas fa-user"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isAuthenticated && (
                <div className="navbar-user-row">
                    <div className="user-greeting">
                        <span className="user-welcome">Hola, {usuario.nombre}</span>
                    </div>
                </div>
            )}

            {mostrarLogin && (
                <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    onClose={() => setMostrarLogin(false)}
                />
            )}
        </nav>
    )
}

export default NavBar;