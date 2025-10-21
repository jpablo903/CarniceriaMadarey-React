import React, { useState, useEffect } from 'react';
import NotificacionCarrito from './NotificacionCarrito';
import { useAppContext } from '../context/AppContext';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos'; 

const CATEGORIAS_BASE = [
    { id: 'vacuno', titulo: 'Cortes Vacunos', items: [] },
    { id: 'pollo', titulo: 'Cortes de Pollo', items: [] },
    { id: 'cerdo', titulo: 'Cortes de Cerdo', items: [] },
    // { id: 'especiales', titulo: 'Cortes Especiales', items: [] },
];


const ProductoCard = ({ titulo, items, handleAddToCart }) => {
    return (
        <div className="card">
            <h2>{titulo}</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <span>
                            {item.nombre} - ${item.precioDisplay}
                        </span>
                        
                        <button 
                            className="btn-agregar-carrito-producto" 
                            title="Agregar al carrito"
                            // Llama al nuevo handleAddToCart de la función Productos
                            onClick={() => handleAddToCart(item)}
                        >
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


function Productos() {

    const { agregarAlCarrito } = useAppContext();

    const [productosAgrupados, setProductosAgrupados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    // Nuevo estado para la notificación
    const [notificacionMensaje, setNotificacionMensaje] = useState(null); 

    // Duración de la notificación en milisegundos
    const DURACION_NOTIFICACION = 2500; 
    
    // Nueva función para manejar la adición al carrito y la notificación
    const handleAddToCart = (item) => {
        // 1. Llama a la función principal para agregar al carrito
        agregarAlCarrito(item); 
        
        // 2. Muestra la notificación
        setNotificacionMensaje(`${item.nombre} agregado al carrito! ✅`);

        // 3. Oculta la notificación después de un tiempo
        setTimeout(() => {
            setNotificacionMensaje(null);
        }, DURACION_NOTIFICACION);
    };

    // Lógica de carga y agrupación (se mantiene igual)
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

    // Renderizado de estados
    if (cargando) {
        return (
            <main className="productos-page">
                <h3 className="titulo-productos">Cargando productos ...</h3>
            </main>
        );
    }

    if (error) {
        return (
            <main className="productos-page">
                <h3 className="titulo-productos" style={{ color: 'red' }}>{error}</h3>
            </main>
        );
    }

    return (
        <main className="productos-page">
            <h3 className="titulo-productos">Productos</h3>
            
            <section className="card-container">
                {productosAgrupados.map(categoria => ( 
                    <ProductoCard 
                        key={categoria.id} 
                        titulo={categoria.titulo} 
                        items={categoria.items} 
                        // Pasamos la nueva función handleAddToCart
                        handleAddToCart={handleAddToCart} 
                    />
                ))}
            </section>
            
            {/* Renderizamos la notificación al final de la página */}
            <NotificacionCarrito mensaje={notificacionMensaje} />
            
        </main>
    );
}

export default Productos;