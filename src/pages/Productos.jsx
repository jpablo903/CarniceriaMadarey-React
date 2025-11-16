import React, { useState, useEffect } from 'react';
import NotificacionCarrito from './NotificacionCarrito';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos'; 

const CATEGORIAS_BASE = [
    { id: 'vacuno', titulo: 'Cortes Vacunos', items: [] },
    { id: 'pollo', titulo: 'Cortes de Pollo', items: [] },
    { id: 'cerdo', titulo: 'Cortes de Cerdo', items: [] },
];

const ProductoCard = ({ titulo, items, handleAddToCart, esAdmin, onEditarProducto }) => {
    const formatPrecio = (precio, unidad) => {
        const precioFormateado = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(precio);
        
        return `${precioFormateado} / ${unidad}`;
    };

    return (
        <div className="producto-section">
            <h2 className="section-title">{titulo}</h2>
            <div className="productos-grid-compact">
                {items.map(item => (
                    <div key={item.id} className="producto-item-compact">
                        <div className="producto-imagen-container-compact">
                            {item.imagen ? (
                                <>
                                    <img 
                                        src={item.imagen} 
                                        alt={item.nombre}
                                        className="producto-imagen-compact"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            // Mostrar el placeholder cuando la imagen falle
                                            const placeholder = e.target.parentElement.querySelector('.producto-sin-imagen-compact');
                                            if (placeholder) {
                                                placeholder.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div className="producto-sin-imagen-compact" style={{display: 'none'}}>
                                        <i className="fas fa-image"></i>
                                    </div>
                                </>
                            ) : (
                                <div className="producto-sin-imagen-compact">
                                    <i className="fas fa-image"></i>
                                </div>
                            )}
                        </div>
                        
                        <div className="producto-info-compact">
                            <h3 className="producto-nombre-compact">{item.nombre}</h3>
                            <p className="producto-precio-compact">
                                {formatPrecio(item.precio, item.unidad || 'kg')}
                            </p>
                        </div>
                        
                        <div className="producto-actions-compact">
                            {!esAdmin ? (
                                <button 
                                    className="btn-agregar-carrito-compact"
                                    onClick={() => handleAddToCart(item)}
                                    title="Agregar al carrito"
                                >
                                    <i className="fas fa-cart-plus"></i>
                                    Agregar
                                </button>
                            ) : (
                                <button 
                                    className="btn-editar-producto-compact"
                                    onClick={() => onEditarProducto(item)}
                                    title="Editar producto"
                                >
                                    <i className="fas fa-edit"></i>
                                    Editar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

function Productos() {
    const { agregarAlCarrito, esAdmin } = useAppContext();
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