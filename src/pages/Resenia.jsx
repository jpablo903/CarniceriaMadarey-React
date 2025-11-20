import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import '../css/resenias.css';

const URL_RESENIAS_API = 'https://686c1b1414219674dcc741df.mockapi.io/api/resenia/resenias';

function Resenias() {
    const { isAuthenticated, usuario } = useAuthContext();
    const [resenias, setResenias] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [calificacion, setCalificacion] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        fetchResenias();
    }, []);

    const fetchResenias = async () => {
        try {
            const response = await fetch(URL_RESENIAS_API);
            if (response.ok) {
                const data = await response.json();
                setResenias(data.reverse());
            } else {
                console.error('Error al cargar reseñas');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para dejar una reseña.');
            return;
        }
        if (calificacion === 0) {
            alert('Por favor, selecciona una calificación.');
            return;
        }
        if (!nuevoComentario.trim()) {
            alert('Por favor, escribe un comentario.');
            return;
        }

        setEnviando(true);
        const nuevaResenia = {
            nombre: usuario.nombre,
            descripcion: nuevoComentario,
            cantidadEstrella: calificacion,
            fecha: new Date().toLocaleDateString('es-AR')
        };

        try {
            const response = await fetch(URL_RESENIAS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaResenia)
            });

            if (response.ok) {
                const reseniaGuardada = await response.json();
                setResenias([reseniaGuardada, ...resenias]);
                setNuevoComentario('');
                setCalificacion(0);
                alert('¡Gracias por tu reseña!');
            } else {
                alert('Hubo un error al enviar tu reseña. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al enviar reseña:', error);
            alert('Error de conexión.');
        } finally {
            setEnviando(false);
        }
    };

    const renderEstrellas = (rating, interactive = false) => {
        return (
            <div className={`star-rating ${interactive ? 'interactive' : ''}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= (interactive ? (hoverRating || calificacion) : rating) ? 'filled' : ''}`}
                        onClick={() => interactive && setCalificacion(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        style={{
                            cursor: interactive ? 'pointer' : 'default',
                            color: star <= (interactive ? (hoverRating || calificacion) : rating) ? '#D4AF37' : '#ccc',
                            fontSize: interactive ? '2rem' : '1.2rem',
                            transition: 'color 0.2s'
                        }}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <main className="resenias-page">
            <section className="review-section">
                <h2 className="section-title">Opiniones de nuestros clientes</h2>

                <div className="review-form-container">
                    {isAuthenticated ? (
                        <>
                            <h3>Dejá tu reseña</h3>
                            <p className="user-posting-as">Publicando como: <strong>{usuario.nombre}</strong></p>
                            <form className="review-form" onSubmit={handleSubmit}>
                                <div className="rating-input-container">
                                    <p>Tu calificación:</p>
                                    {renderEstrellas(calificacion, true)}
                                </div>

                                <textarea
                                    id="review-text"
                                    placeholder="Escribe tu reseña aquí... ¿Qué te parecieron nuestros productos?"
                                    value={nuevoComentario}
                                    onChange={(e) => setNuevoComentario(e.target.value)}
                                    required
                                    disabled={enviando}
                                ></textarea>

                                <button type="submit" className="btn-enviar-resenia" disabled={enviando}>
                                    {enviando ? 'Enviando...' : 'Enviar reseña'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="login-prompt-review">
                            <i className="fas fa-user-lock"></i>
                            <h3>Inicia sesión para dejar tu opinión</h3>
                            <p>Queremos saber qué piensas. Por favor, ingresa a tu cuenta para compartir tu experiencia.</p>
                        </div>
                    )}
                </div>

                <h3 className="recent-reviews-title">Reseñas recientes</h3>
                <div className="review-list">
                    {resenias.length > 0 ? (
                        resenias.map((resenia) => (
                            <div key={resenia.id} className="review-card">
                                <div className="review-header">
                                    <div className="review-author-avatar">
                                        {resenia.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="review-meta">
                                        <h4 className="review-author">{resenia.nombre}</h4>
                                        <span className="review-date">{resenia.fecha || 'Fecha no disponible'}</span>
                                    </div>
                                    <div className="review-rating-display">
                                        {renderEstrellas(resenia.cantidadEstrella)}
                                    </div>
                                </div>
                                <div className="review-body">
                                    <p>{resenia.descripcion}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-reviews">Aún no hay reseñas. ¡Sé el primero en opinar!</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Resenias;