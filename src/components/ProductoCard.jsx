import React from 'react';

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

                                            const placeholder = e.target.parentElement.querySelector('.producto-sin-imagen-compact');
                                            if (placeholder) {
                                                placeholder.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div className="producto-sin-imagen-compact" style={{ display: 'none' }}>
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

export default ProductoCard;
