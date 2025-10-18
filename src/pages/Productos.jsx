import React, { useState, useEffect } from 'react';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos'; 

const CATEGORIAS_BASE = [
    { id: 'vacuno', titulo: 'Cortes Vacunos', items: [] },
    { id: 'pollo', titulo: 'Cortes de Pollo', items: [] },
    { id: 'cerdo', titulo: 'Cortes de Cerdo', items: [] },
    // { id: 'especiales', titulo: 'Cortes Especiales', items: [] },
];


const ProductoCard = ({ titulo, items, agregarAlCarrito }) => {
    
    const handleAddToCart = (item) => {
        agregarAlCarrito(item); 
        console.log(`Agregado al carrito: ${item.nombre}`);
    };

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


function Productos({ agregarAlCarrito }) {
    const [productosAgrupados, setProductosAgrupados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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
                console.error("Error al cargar los datos:", err);
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
                        agregarAlCarrito={agregarAlCarrito} 
                    />
                ))}
            </section>
        </main>
    );
}

export default Productos;