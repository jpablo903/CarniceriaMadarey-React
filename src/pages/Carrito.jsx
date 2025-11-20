import React, { useState } from 'react';
import '../css/carrito.css'; import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';

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

function Carrito() {
    const {
        carrito,
        modificarCantidad,
        eliminarDelCarrito,
        vaciarCarrito
    } = useAppContext();

    const { isAuthenticated, usuario, iniciarSesion } = useAuthContext();

    const [mostrarLogin, setMostrarLogin] = useState(false);

    const handleFinalizarCompra = () => {
        if (!isAuthenticated) {
            setMostrarLogin(true);
        } else {
            alert(`¡Compra finalizada para ${usuario.nombre}! Gracias.`);
            vaciarCarrito();
        }
    };

    const handleLoginSuccess = (nombre, email) => {
        iniciarSesion(nombre, email);
        setMostrarLogin(false);
        alert(`¡Bienvenido ${nombre}! Ahora puedes completar tu pedido.`);
    };

    if (!carrito || carrito.length === 0) {
        return (
            <main className="carrito-page">
                <h3 className="titulo-carrito">Tu Carrito de Compras</h3>
                <div className="carrito-vacio">
                    <i className="fas fa-shopping-basket" style={{ fontSize: '4rem', color: '#D4AF37', marginBottom: '20px' }}></i>
                    <p>Tu carrito está vacío. ¡Explora nuestros productos y agrega algo delicioso!</p>
                    <Link to="/productos" className="btn-finalizar-compra" style={{ maxWidth: '300px', display: 'block', margin: '20px auto' }}>
                        Ir a Productos
                    </Link>
                </div>
            </main>
        );
    }

    const subtotal = carrito.reduce((sum, item) => {
        return sum + (item.precio * item.cantidad);
    }, 0);

    const envio = 1500;
    const totalPagar = subtotal + envio;

    const formatCurrency = (value) => {
        return `$${value.toLocaleString('es-AR')}`;
    };


    return (
        <main className="carrito-page">
            <h3 className="titulo-carrito">Tu Carrito de Compras</h3>

            <div className="carrito-content-wrapper">

                <section className="carrito-items-container">
                    <div className="carrito-header">
                        <span className="carrito-col producto-col">Producto</span>
                        <span className="carrito-col precio-col">Precio/Kg</span>
                        <span className="carrito-col cantidad-col">Cantidad</span>
                        <span className="carrito-col subtotal-col">Total Ítem</span>
                        <span className="carrito-col acciones-col"></span>
                    </div>

                    <div id="carrito-lista">
                        {carrito.map(item => (
                            <div key={item.id} className="carrito-item">
                                <span className="carrito-col producto-col">{item.nombre}</span>

                                <span className="carrito-col precio-col">{formatCurrency(item.precio)}</span>

                                <span className="carrito-col cantidad-col">
                                    <div className="cantidad-controles">
                                        <button
                                            className="btn-cantidad"
                                            onClick={() => modificarCantidad(item.id, item.cantidad - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="cantidad-valor">{item.cantidad.toFixed(2)} {item.unidad}</span>
                                        <button
                                            className="btn-cantidad"
                                            onClick={() => modificarCantidad(item.id, item.cantidad + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </span>

                                <span className="carrito-col subtotal-col">
                                    {formatCurrency(item.precio * item.cantidad)}
                                </span>

                                <span className="carrito-col acciones-col">
                                    <button
                                        className="btn-eliminar"
                                        title="Eliminar ítem"
                                        onClick={() => eliminarDelCarrito(item.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="carrito-resumen">
                    <h4 className="resumen-titulo">Resumen del Pedido</h4>
                    <div className="resumen-detalle">
                        <p>Subtotal: <span>{formatCurrency(subtotal)}</span></p>
                        <p>Envío: <span>{formatCurrency(envio)}</span></p>
                        <div className="resumen-separador"></div>
                        <p className="resumen-total">Total a Pagar: <span>{formatCurrency(totalPagar)}</span></p>
                    </div>

                    <button
                        className="btn-finalizar-compra"
                        onClick={handleFinalizarCompra}
                    >
                        {isAuthenticated ? 'Finalizar Compra' : 'Iniciar Sesión'}
                    </button>
                    {
                        !isAuthenticated && (
                            <p className="login-checkout-info">Iniciar sesión para completar la compra.</p>
                        )
                    }
                </section>

                {mostrarLogin && (
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onClose={() => setMostrarLogin(false)}
                    />
                )}
            </div>
        </main>
    );
}

export default Carrito;