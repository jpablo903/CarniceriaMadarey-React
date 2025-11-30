import React, { useRef, useState } from "react";
import '../css/inicio.css';
import MapaDiferido from "../components/MapaDiferido";
import posterImage from '../assets/poster-video.webp';

function Inicio() {

    const videoRef = useRef(null); 
    const [isPlaying, setIsPlaying] = useState(false);

    const videoSrc = "/videos/carnicería premium Madarey.mp4";
    const subtitlesSrc = "/videos/subtitulosvideo.vtt";
    const posterSrc = posterImage;

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play(); 
            setIsPlaying(true);      
        }
    };

    return (
        <main className="inicio-page">
            <section>
                <div className="video-responsive" style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#000' }}>
                    
                    {!isPlaying && (
                        <button 
                            onClick={handlePlayVideo}
                            aria-label="Reproducir video"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.3)', 
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" />
                            </svg>
                        </button>
                    )}

                    <video 
                        ref={videoRef} 
                        controls={isPlaying}
                        muted 
                        playsInline 
                        preload="none" 
                        poster={posterSrc}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            display: 'block' 
                        }} 
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Tu navegador no soporta la reproducción de video.
                        <track
                            src={subtitlesSrc}
                            kind="subtitles"
                            srcLang="es"
                            label="Español"
                            default
                        />
                    </video>
                </div>
            </section>

            <section className="description">
                <h2>Bienvenidos a nuestra carniceria</h2>
                <p>
                    En Madarey, nos enorgullece ofrecerte la mejor calidad en carnes.<br />
                    Nuestros productos son seleccionados cuidadosamente para garantizar frescura y sabor en cada bocado.
                    Desde cortes premium hasta opciones para toda la familia, tenemos lo que necesitas para tus comidas
                    diarias
                    o celebraciones especiales.<br />
                    Además, contamos con un equipo de expertos listos para asesorarte en la elección del corte perfecto
                    para cada ocasión.
                    En Madarey, no solo vendemos carne, vendemos calidad y confianza.
                    Te invitamos a visitarnos y descubrir la diferencia que hace la calidad en cada plato.
                    ¡Esperamos verte pronto!
                </p>
                <p>
                    Estamos ubicados en calle Rivadavia y Brandsen, B1646 San Fernando, Provincia de Buenos Aires.
                    Puedes contactarnos al teléfono (011) 6821-3482 o enviarnos un correo electrónico a
                    Giuli.madarey@gmail.com.
                </p>

                <MapaDiferido />
            </section>
        </main>
    );
}

export default Inicio;