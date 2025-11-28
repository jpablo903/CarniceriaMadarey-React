import React, { useState, useEffect, useMemo } from 'react';
import { useAuthContext } from '../context/AuthContext';
import '../css/resenias.css';
import Swal from 'sweetalert2';

const URL_RESENIAS_API = import.meta.env.VITE_API_URL_RESENIAS;
const RESENAS_POR_PAGINA = 5;

function Resenias() {
    const { isAuthenticated, usuario } = useAuthContext();

    const [resenias, setResenias] = useState([]);
    const [cargandoDatos, setCargandoDatos] = useState(true);

    const [nuevoComentario, setNuevoComentario] = useState('');
    const [calificacion, setCalificacion] = useState(0);
    const [enviando, setEnviando] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        fetchResenias();
    }, []);

    const fetchResenias = async () => {
        setCargandoDatos(true);
        try {
            const response = await fetch(URL_RESENIAS_API);
            if (response.ok) {
                const data = await response.json();
                setResenias(data);
            } else {
                console.error('Error al cargar reseñas');
            }
        } catch (error) {
            console.error('Error de red:', error);
        } finally {
            setCargandoDatos(false);
        }
    };

    const { reseniasPaginadas, totalPaginas } = useMemo(() => {
        const reseniasOrdenadas = [...resenias].sort((a, b) => {
            const idA = a.id ? Number(a.id) : 0;
            const idB = b.id ? Number(b.id) : 0;
            return idB - idA;
        });

        const total = reseniasOrdenadas.length;
        const totalPags = Math.ceil(total / RESENAS_POR_PAGINA);

        let paginaCalculo = paginaActual;
        if (paginaCalculo > totalPags && totalPags > 0) {
            paginaCalculo = totalPags;
        } else if (paginaCalculo < 1) {
            paginaCalculo = 1;
        }

        const indiceInicio = (paginaCalculo - 1) * RESENAS_POR_PAGINA;
        const indiceFin = paginaCalculo * RESENAS_POR_PAGINA;
        const paginadas = reseniasOrdenadas.slice(indiceInicio, indiceFin);

        return { reseniasPaginadas: paginadas, totalPaginas: totalPags };

    }, [resenias, paginaActual]);

    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const irAPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    const obtenerNumerosPaginacion = () => {
        const delta = 1;
        const rango = [];
        const rangoConPuntos = [];
        let l;

        for (let i = 1; i <= totalPaginas; i++) {
            if (i === 1 || i === totalPaginas || (i >= paginaActual - delta && i <= paginaActual + delta)) {
                rango.push(i);
            }
        }

        for (let i of rango) {
            if (l) {
                if (i - l === 2) {
                    rangoConPuntos.push(l + 1);
                } else if (i - l !== 1) {
                    rangoConPuntos.push('...');
                }
            }
            rangoConPuntos.push(i);
            l = i;
        }

        return rangoConPuntos;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated || calificacion === 0 || !nuevoComentario.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Validación incompleta',
                text: 'Asegúrate de iniciar sesión, dar una calificación y escribir un comentario.',
                confirmButtonColor: '#d33'
            });
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaResenia)
            });

            if (response.ok || response.status === 201) {
                const reseniaGuardada = await response.json();

                const reseniaFinal = {
                    ...nuevaResenia,
                    ...reseniaGuardada,
                    id: reseniaGuardada.id || Date.now()
                };

                setResenias(prevResenias => [reseniaFinal, ...prevResenias]);
                setPaginaActual(1);

                setNuevoComentario('');
                setCalificacion(0);

                Swal.fire({
                    icon: 'success',
                    title: '¡Gracias!',
                    text: 'Tu reseña ha sido publicada.',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un error al enviar tu reseña.', confirmButtonColor: '#d33' });
            }
        } catch (error) {
            console.error('Error al enviar reseña:', error);
            Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudo conectar con el servidor.', confirmButtonColor: '#d33' });
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

                <h3 className="recent-reviews-title">
                    Reseñas recientes
                </h3>

                <div className="review-list">
                    {cargandoDatos ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            <p>Cargando comentarios...</p>
                        </div>
                    ) : resenias.length > 0 ? (
                        reseniasPaginadas.map((resenia, index) => {
                            const posicionGlobal = (paginaActual - 1) * RESENAS_POR_PAGINA + index + 1;
                            const uniqueKey = `p${paginaActual}-i${index}-id${resenia.id || 'none'}`;
                            return (
                                <div key={uniqueKey} className="review-card">
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
                            );
                        })
                    ) : (
                        <p className="no-reviews">Aún no hay reseñas. ¡Sé el primero en opinar!</p>
                    )}
                </div>

                {!cargandoDatos && totalPaginas > 1 && (
                    <div className="pagination-controls">
                        <button
                            onClick={irPaginaAnterior}
                            disabled={paginaActual === 1}
                            className="pagination-btn"
                        >
                            Anterior
                        </button>

                        <div className="pagination-numbers" style={{ display: 'flex', gap: '5px' }}>
                            {obtenerNumerosPaginacion().map((pagina, index) => (
                                <React.Fragment key={index}>
                                    {pagina === '...' ? (
                                        <span className="pagination-ellipsis" style={{ padding: '0 5px' }}>...</span>
                                    ) : (
                                        <button
                                            onClick={() => irAPagina(pagina)}
                                            className={`pagination-number ${paginaActual === pagina ? 'active' : ''}`}
                                        >
                                            {pagina}
                                        </button>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <button
                            onClick={irPaginaSiguiente}
                            disabled={paginaActual === totalPaginas}
                            className="pagination-btn"
                        >
                            Siguiente
                        </button>
                    </div>
                )}

                {!cargandoDatos && totalPaginas > 1 && (
                    <p className="pagination-info">
                        Página {paginaActual} de {totalPaginas}
                        {resenias.length > 0 && (
                            <span> • Mostrando <strong>{reseniasPaginadas.length}</strong> de {resenias.length} reseñas</span>
                        )}
                    </p>
                )}
            </section>
        </main>
    );
}

export default Resenias;