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
    // Cargar estado inicial desde localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem('isAuthenticated');
        return saved ? JSON.parse(saved) : false;
    });

    const [usuario, setUsuario] = useState(() => {
        const saved = localStorage.getItem('usuario');
        return saved ? JSON.parse(saved) : { nombre: "", email: "" };
    });

    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem('carrito');
        return saved ? JSON.parse(saved) : [];
    });

    // Guardar en localStorage cuando cambien los estados
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const esAdmin = React.useMemo(() => {
        return isAuthenticated && usuario.nombre === "AdminMadarey" && usuario.email === 'admin@madarey.com';
    }, [isAuthenticated, usuario.nombre, usuario.email]);

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
        console.log('Usuario logueado:', { nombre, email });
    };

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario({ nombre: "", email: "" });
        vaciarCarrito();
        // Limpiar localStorage al cerrar sesión
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('usuario');
        localStorage.removeItem('carrito');
    };

    const contextValue = {
        // Estados de autenticación
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        iniciarSesion,
        cerrarSesion,
        
        // Carrito
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        modificarCantidad,
        vaciarCarrito,

        // Funciones CRUD
        agregarProducto,
        editarProducto,
        eliminarProducto,
        esAdmin
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}