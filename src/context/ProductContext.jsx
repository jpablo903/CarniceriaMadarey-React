import React, { createContext, useContext } from "react";

const ProductContext = createContext();

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext debe usarse dentro de ProductProvider');
    }
    return context;
};

export function ProductProvider({ children }) {
    const agregarProducto = async (nuevoProducto) => {
        try {
            const response = await fetch('https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto)
            });
            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error agregando producto:', error);
        }
    };

    const editarProducto = async (id, productoEditado) => {
        try {
            const response = await fetch(`https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoEditado)
            });
            const producto = await response.json();
            return producto;
        } catch (error) {
            console.error('Error editando producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await fetch(`https://686c1b1414219674dcc741df.mockapi.io/api/resenia/productos/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error eliminando producto:', error);
        }
    };

    const value = {
        agregarProducto,
        editarProducto,
        eliminarProducto
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
