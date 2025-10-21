/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState({ nombre: "", email: "" });

    const [carrito, setCarrito] = useState([]);

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
    };

    const iniciarSesion = (nombre, email) => {
        setUsuario({ nombre, email });
        setIsAuthenticated(true);
    };

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario({ nombre: "", email: "" });
        vaciarCarrito();
    };


    const value = {

        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        iniciarSesion,
        cerrarSesion,
        
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        modificarCantidad,
        vaciarCarrito
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de AppProvider");
    }
    return context;
}