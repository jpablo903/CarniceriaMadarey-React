import React, { useState, useEffect } from 'react';
import '../css/adminpanel.css';
import { useProductContext } from '../context/ProductContext';
import { useAuthContext } from '../context/AuthContext';

const URL_PRODUCTOS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos';

function AdminPanel() {
    const { agregarProducto, editarProducto, eliminarProducto } = useProductContext();
    const { esAdmin } = useAuthContext();
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: 0,
        unidad: 'kg',
        imagen: '',
        idCategoria: 'vacuno'
    });

    useEffect(() => {
        const productoGuardado = sessionStorage.getItem('productoEditando');
        if (productoGuardado) {
            const producto = JSON.parse(productoGuardado);
            setProductoEditando(producto);
            setFormData({
                nombre: producto.nombre,
                precio: producto.precio,
                unidad: producto.unidad,
                imagen: producto.imagen,
                idCategoria: producto.idCategoria
            });
            setMostrarFormulario(true);
            sessionStorage.removeItem('productoEditando');
        }
        cargarProductos();
    }, []);

    // Efecto para filtrar productos cuando cambia la búsqueda
    useEffect(() => {
        if (busqueda.trim() === '') {
            setProductosFiltrados(productos);
        } else {
            const filtrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
            setProductosFiltrados(filtrados);
        }
    }, [busqueda, productos]);

    const cargarProductos = async () => {
        try {
            const response = await fetch(URL_PRODUCTOS_API);
            const data = await response.json();
            setProductos(data);
            setProductosFiltrados(data);
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productoEditando) {
                await editarProducto(productoEditando.id, formData);
            } else {
                await agregarProducto(formData);
            }
            await cargarProductos();
            resetForm();
        } catch (error) {
            console.error('Error guardando producto:', error);
        }
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto);
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio,
            unidad: producto.unidad || 'kg',
            imagen: producto.imagen || '',
            idCategoria: producto.idCategoria
        });
        setMostrarFormulario(true);
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            await eliminarProducto(id);
            await cargarProductos();
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            precio: 0,
            unidad: 'kg',
            imagen: '',
            idCategoria: 'vacuno'
        });
        setProductoEditando(null);
        setMostrarFormulario(false);
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const limpiarBusqueda = () => {
        setBusqueda('');
    };

    // Función para formatear el precio
    const formatPrecio = (precio) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(precio);
    };

    if (!esAdmin) {
        return (
            <main className="admin-page">
                <h3>Acceso Denegado</h3>
                <p>No tienes permisos para acceder a esta sección.</p>
                <p>Por favor, inicia sesión con una cuenta de administrador.</p>
            </main>
        );
    }

    return (
        <main className="admin-page">
            <h3>Panel de Administración</h3>

            <div className="admin-controls">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Buscar productos por nombre..."
                            value={busqueda}
                            onChange={handleBusquedaChange}
                            className="search-input"
                        />
                        {busqueda && (
                            <button
                                onClick={limpiarBusqueda}
                                className="clear-search-btn"
                                title="Limpiar búsqueda"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </div>
                    <span className="search-results">
                        {productosFiltrados.length} de {productos.length} productos
                    </span>
                </div>

                <button
                    className="btn-agregar-producto"
                    onClick={() => setMostrarFormulario(true)}
                >
                    <i className="fas fa-plus"></i>
                    Agregar Producto
                </button>
            </div>

            {mostrarFormulario && (
                <div className="admin-form-overlay" onClick={(e) => {
                    if (e.target.className === 'admin-form-overlay') {
                        resetForm();
                    }
                }}>
                    <div className="admin-form-container">
                        <h4>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h4>

                        <form onSubmit={handleSubmit}>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    placeholder="Ej: Bife de Chorizo"
                                    required
                                />
                            </label>

                            <label>
                                Precio:
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.precio}
                                    onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
                                    placeholder="Ej: 5200.00"
                                    required
                                />
                            </label>

                            <label>
                                Unidad:
                                <select
                                    value={formData.unidad}
                                    onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                                    required
                                >
                                    <option value="kg">Kilogramo (kg)</option>
                                    <option value="unidad">Unidad</option>
                                    <option value="pack">Pack</option>
                                    <option value="docena">Docena</option>
                                </select>
                            </label>

                            <label>
                                Imagen (URL):
                                <input
                                    type="url"
                                    value={formData.imagen}
                                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                            </label>

                            <label>
                                Categoría:
                                <select
                                    value={formData.idCategoria}
                                    onChange={(e) => setFormData({ ...formData, idCategoria: e.target.value })}
                                    required
                                >
                                    <option value="vacuno">Cortes Vacunos</option>
                                    <option value="pollo">Cortes de Pollo</option>
                                    <option value="cerdo">Cortes de Cerdo</option>
                                </select>
                            </label>

                            {/* Vista previa de la imagen */}
                            {formData.imagen && (
                                <div className="image-preview">
                                    <p>Vista previa:</p>
                                    <img
                                        src={formData.imagen}
                                        alt="Vista previa"
                                        className="preview-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <div className="form-buttons">
                                <button type="submit" className="btn-guardar">
                                    {productoEditando ? 'Actualizar' : 'Crear'}
                                </button>
                                <button type="button" onClick={resetForm} className="btn-cancelar">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="productos-list-admin">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <div key={producto.id} className="producto-admin-card">
                            <div className="producto-image">
                                {producto.imagen ? (
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="producto-img"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                ) : null}
                                <div className="no-image" style={{ display: producto.imagen ? 'none' : 'block' }}>
                                    <i className="fas fa-image"></i>
                                    <span>Sin imagen</span>
                                </div>
                            </div>
                            <div className="producto-info">
                                <h4>{producto.nombre}</h4>
                                <div className="producto-details">
                                    <span className="producto-precio">{formatPrecio(producto.precio)}</span>
                                    <span className="producto-unidad">/{producto.unidad || 'kg'}</span>
                                </div>
                                <span className="categoria-badge">{producto.idCategoria.toUpperCase()}</span>
                            </div>
                            <div className="producto-actions">
                                <button
                                    className="btn-editar"
                                    onClick={() => handleEditar(producto)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className="btn-eliminar-admin"
                                    onClick={() => handleEliminar(producto.id)}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        <p>No se encontraron productos</p>
                        <p>Intenta con otros términos de búsqueda</p>
                        {busqueda && (
                            <button
                                onClick={limpiarBusqueda}
                                className="btn-limpiar-busqueda"
                            >
                                Limpiar búsqueda
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default AdminPanel;