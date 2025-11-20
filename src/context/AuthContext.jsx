import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext debe usarse dentro de AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }) {
    // Cargar estado inicial desde localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem('isAuthenticated');
        return saved ? JSON.parse(saved) : false;
    });

    const [usuario, setUsuario] = useState(() => {
        const saved = localStorage.getItem('usuario');
        return saved ? JSON.parse(saved) : { nombre: "", email: "" };
    });

    // Guardar en localStorage cuando cambien los estados
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }, [usuario]);

    const esAdmin = React.useMemo(() => {
        return isAuthenticated && usuario.nombre === "AdminMadarey" && usuario.email === 'admin@madarey.com';
    }, [isAuthenticated, usuario.nombre, usuario.email]);

    const iniciarSesion = (nombre, email) => {
        setUsuario({ nombre, email });
        setIsAuthenticated(true);
        console.log('Usuario logueado:', { nombre, email });
    };

    const cerrarSesion = () => {
        setIsAuthenticated(false);
        setUsuario({ nombre: "", email: "" });
        // Limpiar localStorage al cerrar sesión
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('usuario');

    };

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        usuario,
        setUsuario,
        iniciarSesion,
        cerrarSesion,
        esAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
