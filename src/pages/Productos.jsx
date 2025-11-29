import React, { useState, useEffect } from 'react';
import '../css/productos.css';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import { toast } from 'react-toastify';
import { FaSearch, FaTimes } from 'react-icons/fa';

const URL_PRODUCTOS_API = import.meta.env.VITE_API_URL;

const CATEGORIAS_BASE = [
    { id: 'vacuno', titulo: 'Cortes Vacunos', items: [] },
    { id: 'pollo', titulo: 'Cortes de Pollo', items: [] },
    { id: 'cerdo', titulo: 'Cortes de Cerdo', items: [] },
];

function Productos() {
    const { agregarAlCarrito } = useAppContext();
    const { esAdmin } = useAuthContext();
    const [productosAgrupados, setProductosAgrupados] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [todosLosProductos, setTodosLosProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('todos');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const categorias = [
        { value: 'todos', label: 'Todas las categorías' },
        { value: 'vacuno', label: 'Cortes Vacunos' },
        { value: 'pollo', label: 'Cortes de Pollo' },
        { value: 'cerdo', label: 'Cortes de Cerdo' },
    ];

    const handleAddToCart = (item) => {
        agregarAlCarrito(item);
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
                setTodosLosProductos(productosData);
                setProductosFiltrados(productosData);
                setError(null);
            } catch (err) {
                setError(`No se pudieron cargar los productos: ${err.message}.`);
                setProductosAgrupados(CATEGORIAS_BASE);
                setTodosLosProductos([]);
                setProductosFiltrados([]);
            } finally {
                setCargando(false);
            }
        };

        fetchDatosYAgrupar();
    }, []);

    useEffect(() => {
        let filtrados = todosLosProductos;

        if (filtroCategoria !== 'todos') {
            filtrados = filtrados.filter(producto =>
                producto.idCategoria === filtroCategoria
            );
        }

        if (busqueda.trim() !== '') {
            filtrados = filtrados.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        setProductosFiltrados(filtrados);

        // Update grouped products with filtered results
        const nuevaEstructura = CATEGORIAS_BASE.map(categoriaBase => {
            return {
                ...categoriaBase,
                items: filtrados.filter(
                    producto => producto.idCategoria === categoriaBase.id
                )
            };
        });
        setProductosAgrupados(nuevaEstructura);
    }, [busqueda, filtroCategoria, todosLosProductos]);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleFiltroCategoriaChange = (e) => {
        setFiltroCategoria(e.target.value);
    };

    const limpiarBusqueda = () => {
        setBusqueda('');
    };

    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroCategoria('todos');
    };

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

            <div className="productos-controls">
                <div className="productos-filters-container">
                    <div className="productos-search-container">
                        <div className="productos-search-input-wrapper">
                            <FaSearch className="productos-search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar productos por nombre..."
                                value={busqueda}
                                onChange={handleBusquedaChange}
                                className="productos-search-input"
                            />
                            {busqueda && (
                                <button
                                    onClick={limpiarBusqueda}
                                    className="productos-clear-search-btn"
                                    title="Limpiar búsqueda"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="productos-filter-category-container">
                        <select
                            value={filtroCategoria}
                            onChange={handleFiltroCategoriaChange}
                            className="productos-filter-category-select"
                        >
                            {categorias.map(categoria => (
                                <option key={categoria.value} value={categoria.value}>
                                    {categoria.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {(busqueda || filtroCategoria !== 'todos') && (
                        <button
                            onClick={limpiarFiltros}
                            className="productos-clear-filters-btn"
                            title="Limpiar todos los filtros"
                        >
                            <FaTimes />
                            Limpiar Filtros
                        </button>
                    )}
                </div>

                <div className="productos-search-results">
                    {productosFiltrados.length} de {todosLosProductos.length} productos
                    {filtroCategoria !== 'todos' && ` en ${categorias.find(c => c.value === filtroCategoria)?.label}`}
                </div>
            </div>

            {productosFiltrados.length > 0 ? (
                <div className="secciones-container">
                    {productosAgrupados.map(categoria => (
                        categoria.items.length > 0 && (
                            <ProductoCard
                                key={categoria.id}
                                titulo={categoria.titulo}
                                items={categoria.items}
                                handleAddToCart={handleAddToCart}
                                esAdmin={esAdmin}
                                onEditarProducto={handleEditarProducto}
                            />
                        )
                    ))}
                </div>
            ) : (
                <div className="productos-no-results">
                    <FaSearch />
                    <p>No se encontraron productos</p>
                    <p>Intenta con otros términos de búsqueda</p>
                    {(busqueda || filtroCategoria !== 'todos') && (
                        <button
                            onClick={limpiarFiltros}
                            className="productos-btn-limpiar-busqueda"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            )}
        </main>
    );
}

export default Productos;