import React, { createContext, useContext } from "react";
import { toast } from 'react-toastify';

const ProductContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

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
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto)
            });
            const producto = await response.json();
            toast.success(`✅ Producto "${nuevoProducto.nombre}" creado exitosamente!`, {
                position: "bottom-right",
                autoClose: 3000
            });
            return producto;
        } catch (error) {
            console.error('Error agregando producto:', error);
            toast.error('❌ Error al crear el producto', {
                position: "bottom-right"
            });
            throw error;
        }
    };

    const editarProducto = async (id, productoEditado) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoEditado)
            });
            const producto = await response.json();
            toast.info(`📝 Producto "${productoEditado.nombre}" actualizado`, {
                position: "bottom-right",
                autoClose: 2500
            });
            return producto;
        } catch (error) {
            console.error('Error editando producto:', error);
            toast.error('❌ Error al actualizar el producto', {
                position: "bottom-right"
            });
            throw error;
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            toast.warning('🗑️ Producto eliminado correctamente', {
                position: "bottom-right",
                autoClose: 2500
            });
        } catch (error) {
            console.error('Error eliminando producto:', error);
            toast.error('❌ Error al eliminar el producto', {
                position: "bottom-right"
            });
            throw error;
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
