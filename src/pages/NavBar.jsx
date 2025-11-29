import { FaCog, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import ReactDOM from "react-dom";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/logoCarniceriaMadarey.png';
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import '../css/navbar.css';
import '../css/login-modal.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

const LoginForm = ({ onLoginSuccess, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && email) {
            onLoginSuccess(nombre, email);
        } else {
            toast.warning('Por favor, ingresa tu nombre y correo.');
        }
    };

    const modalContent = (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-form-container" onClick={(e) => e.stopPropagation()}>
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

    return ReactDOM.createPortal(modalContent, document.body);
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
        // El toast de bienvenida lo maneja AuthContext
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

                        {/* Items exclusivos para móvil */}
                        <li className="nav-item mobile-only">
                            {isAuthenticated ? (
                                <>
                                    <span className="mobile-user-info">Hola, {usuario.nombre}</span>
                                    {esAdmin && (
                                        <Link to="/admin" className="mobile-btn-admin" onClick={toggleMenu}>
                                            <FaCog /> Panel Admin
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="mobile-btn-logout">
                                        <FaSignOutAlt /> Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleLoginClick} className="mobile-btn-login">
                                    <FaUser /> Iniciar Sesión
                                </button>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="navbar-icons-section">
                    <div className="nav-carrito-item">
                        <Link to='/Carrito' className={`btn-carrito ${getLinkClass('/Carrito')}`} title="Ir al carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
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
                                    <FaUserCircle />
                                </button>

                                {userMenuOpen && (
                                    <div className="user-dropdown-menu">
                                        {esAdmin && (
                                            <div className="user-dropdown-item">
                                                <Link to="/admin" className="btn-admin-dashboard" onClick={() => setUserMenuOpen(false)}>
                                                    <FaCog />
                                                    Panel Admin
                                                </Link>
                                            </div>
                                        )}
                                        <div className="user-dropdown-item">
                                            <span className="user-info">Hola, {usuario.nombre}</span>
                                        </div>
                                        <div className="user-dropdown-item">
                                            <button onClick={handleLogout} className="btn-logout-dropdown">
                                                <FaSignOutAlt />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={handleLoginClick} className="btn-login-icon" title="Iniciar sesión">
                                <FaUser />
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