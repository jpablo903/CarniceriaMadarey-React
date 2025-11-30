import React from "react";
import '../css/inicio.css';
import MapaDiferido from "../components/MapaDiferido";

function Inicio() {

    const videoSrc = "/videos/carnicería premium Madarey.mp4";
    const subtitlesSrc = "/videos/subtitulosvideo.vtt";
    const posterSrc = "/assets/posterSrc.webp";

    return (
        <main className="inicio-page">
            <section>
                <div className="video-responsive">
                    <video controls autoPlay muted poster={posterSrc} >
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