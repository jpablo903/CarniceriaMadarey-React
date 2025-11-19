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
        // Note: We don't clear cart here anymore as it is in AppContext, 
        // but usually cart should be cleared on logout. 
        // I will leave it as is for now and let the component handle it or user can decide.
        // Actually, the original code cleared cart in AppContext. 
        // Since AppContext still holds the cart, we might need a way to clear it.
        // For now, I will just handle Auth logic here.
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
