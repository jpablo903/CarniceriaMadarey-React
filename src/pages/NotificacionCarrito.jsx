
const DURACION_NOTIFICACION = 2500; 

const NotificacionCarrito = ({ mensaje }) => {
    
    if (!mensaje) return null;

    return (
        <div className="notificacion-carrito">
            {mensaje}
        </div>
    );
};

export default NotificacionCarrito;