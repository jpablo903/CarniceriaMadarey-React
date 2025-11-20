import React, { useState, useEffect } from 'react';
import '../css/productos.css';
import NotificacionCarrito from './NotificacionCarrito';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos';

const CATEGORIAS_BASE = [
    { id: 'vacuno', titulo: 'Cortes Vacunos', items: [] },
    { id: 'pollo', titulo: 'Cortes de Pollo', items: [] },
    { id: 'cerdo', titulo: 'Cortes de Cerdo', items: [] },
];

function Productos() {
    const { agregarAlCarrito } = useAppContext();
    const { esAdmin } = useAuthContext();
    const [productosAgrupados, setProductosAgrupados] = useState([]);
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
        const fetchDatosYAgrupar = async () => {
            try {
                setCargando(true);
                const response = await fetch(URL_PRODUCTOS_API);
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status} ${response.statusText}`);
                }
                const productosData = await response.json();

                const nuevaEstructura = CATEGORIAS_BASE.map(categoriaBase => {
                    return {
                        ...categoriaBase,
                        items: productosData.filter(
                            producto => producto.idCategoria === categoriaBase.id
                        )
                    };
                });

                setProductosAgrupados(nuevaEstructura);
                setError(null);
            } catch (err) {
                setError(`No se pudieron cargar los productos: ${err.message}.`);
                setProductosAgrupados(CATEGORIAS_BASE);
            } finally {
                setCargando(false);
            }
        };

        fetchDatosYAgrupar();
    }, []);

    if (cargando) {
        return (
            <main className="productos-page-horizontal">
                <h1 className="titulo-principal">Productos</h1>
                <h3 className="cargando-texto">Cargando productos ...</h3>
            </main>
        );
    }

    if (error) {
        return (
            <main className="productos-page-horizontal">
                <h1 className="titulo-principal">Productos</h1>
                <h3 className="error-texto" style={{ color: 'red' }}>{error}</h3>
            </main>
        );
    }

    return (
        <main className="productos-page-horizontal">
            <h1 className="titulo-principal">Productos</h1>

            <div className="secciones-container">
                {productosAgrupados.map(categoria => (
                    <ProductoCard
                        key={categoria.id}
                        titulo={categoria.titulo}
                        items={categoria.items}
                        handleAddToCart={handleAddToCart}
                        esAdmin={esAdmin}
                        onEditarProducto={handleEditarProducto}
                    />
                ))}
            </div>

            <NotificacionCarrito mensaje={notificacionMensaje} />
        </main>
    );
}

export default Productos;