import React, { useState, useEffect } from 'react';
import '../css/productos.css';
import NotificacionCarrito from './NotificacionCarrito';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos';

function Ofertas() {
    const { agregarAlCarrito } = useAppContext();
    const { esAdmin } = useAuthContext();
    const [ofertas, setOfertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [notificacionMensaje, setNotificacionMensaje] = useState(null);
    const DURACION_NOTIFICACION = 2500;
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        agregarAlCarrito(item);
        setNotificacionMensaje(`${item.nombre} agregado al carrito! ✅`);
        setTimeout(() => {
            setNotificacionMensaje(null);
        }, DURACION_NOTIFICACION);
    };

    const handleEditarProducto = (producto) => {
        sessionStorage.setItem('productoEditando', JSON.stringify(producto));
        navigate('/admin');
    };

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                setCargando(true);
                const response = await fetch(URL_PRODUCTOS_API);
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status} ${response.statusText}`);
                }
                const productosData = await response.json();

                const ofertasData = productosData.filter(producto => producto.idCategoria === 'ofertas');
                setOfertas(ofertasData);
                setError(null);
            } catch (err) {
                setError(`No se pudieron cargar las ofertas: ${err.message}.`);
            } finally {
                setCargando(false);
            }
        };

        fetchOfertas();
    }, []);

    if (cargando) {
        return (
            <main className="productos-page-horizontal">
                <h1 className="titulo-principal">Ofertas</h1>
                <h3 className="cargando-texto">Cargando ofertas ...</h3>
            </main>
        );
    }

    if (error) {
        return (
            <main className="productos-page-horizontal">
                <h1 className="titulo-principal">Ofertas</h1>
                <h3 className="error-texto" style={{ color: 'red' }}>{error}</h3>
            </main>
        );
    }

    return (
        <main className="productos-page-horizontal">
            <h1 className="titulo-principal">Ofertas Especiales</h1>

            <div className="secciones-container">
                {ofertas.length > 0 ? (
                    <ProductoCard
                        titulo="Nuestras Ofertas"
                        items={ofertas}
                        handleAddToCart={handleAddToCart}
                        esAdmin={esAdmin}
                        onEditarProducto={handleEditarProducto}
                    />
                ) : (
                    <div className="no-results">
                        <p>No hay ofertas disponibles en este momento.</p>
                    </div>
                )}
            </div>

            <NotificacionCarrito mensaje={notificacionMensaje} />
        </main>
    );
}

export default Ofertas;