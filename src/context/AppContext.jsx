/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

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
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const eliminarDelCarrito = (idProducto) => {
        setCarrito(carrito.filter(item => item.id !== idProducto));
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

    const vaciarCarrito = () => {
        setCarrito([]);
        localStorage.removeItem('carrito');
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