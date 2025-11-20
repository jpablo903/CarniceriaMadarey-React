import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import '../css/contacto.css';

function Contacto() {
    const { isAuthenticated, usuario } = useAuthContext();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (isAuthenticated && usuario) {
            setFormData(prev => ({
                ...prev,
                nombre: usuario.nombre || '',
                correo: usuario.email || ''
            }));
        }
    }, [isAuthenticated, usuario]);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": form.getAttribute("name"),
                ...formData
            })
        })
            .then(() => {
                setStatus('success');
                setFormData({
                    nombre: isAuthenticated && usuario ? usuario.nombre || '' : '',
                    correo: isAuthenticated && usuario ? usuario.email || '' : '',
                    mensaje: ''
                });
            })
            .catch(error => {
                console.error(error);
                setStatus('error');
            });
    };

    return (
        <main className="contacto-container">
            <h3 className="contacto-title">Contactos</h3>

            {status === 'success' && (
                <div className="feedback-message success">
                    ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                </div>
            )}

            {status === 'error' && (
                <div className="feedback-message error">
                    Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                </div>
            )}

            <form
                className="contact-form"
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
            >

                <input type="hidden" name="form-name" value="contact" />

                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        readOnly={isAuthenticated}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        readOnly={isAuthenticated}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        rows="5"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn-enviar">Enviar</button>
            </form>
        </main>
    );
}

export default Contacto;