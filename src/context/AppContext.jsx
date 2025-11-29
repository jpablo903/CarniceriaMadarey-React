/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext debe usarse dentro de AppProvider');
    }
    return context;
};

export function AppProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem('carrito');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id === producto.id);

        if (itemExistente) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
            toast.info(`➕ Cantidad de "${producto.nombre}" aumentada`, {
                position: "bottom-right",
                autoClose: 2000
            });
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
            toast.success(`🛒 "${producto.nombre}" agregado al carrito!`, {
                position: "bottom-right",
                autoClose: 2500,
                icon: "🛒"
            });
        }
    };

    const eliminarDelCarrito = (idProducto) => {
        const producto = carrito.find(item => item.id === idProducto);
        setCarrito(carrito.filter(item => item.id !== idProducto));

        if (producto) {
            toast.warning(`🗑️ "${producto.nombre}" eliminado del carrito`, {
                position: "bottom-right",
                autoClose: 2000
            });
        }
    };

    const modificarCantidad = (idProducto, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return;
        }

        setCarrito(carrito.map(item =>
            item.id === idProducto
                ? { ...item, cantidad: nuevaCantidad }
                : item
        ));
    };

    const vaciarCarrito = (mostrarNotificacion = true) => {
        const cantidadItems = carrito.length;
        setCarrito([]);
        localStorage.removeItem('carrito');

        if (cantidadItems > 0 && mostrarNotificacion) {
            toast.info(`🧹 Carrito vaciado (${cantidadItems} ${cantidadItems === 1 ? 'producto' : 'productos'})`, {
                position: "bottom-right",
                autoClose: 2500
            });
        }
    };

    const contextValue = {
        // Carrito
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        modificarCantidad,
        vaciarCarrito
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}