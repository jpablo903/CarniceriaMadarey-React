import React from "react";

function Inicio() {

    const videoSrc = "/videos/carnicería premium Madarey.mp4";
    const subtitlesSrc = "/videos/subtitulosvideo.vtt";

    return (
        <main className="inicio-page">
            <section>
                <div className="video-responsive">
                    <video controls autoPlay muted>
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
                    Puedes contactarnos al teléfono (011) 3832-8549 o enviarnos un correo electrónico a
                    Giuli.madarey@gmail.com.
                </p>

                <div className="mapa-responsive">
                    <iframe
                        title="Ubicación de Carniceria Madarey"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.636660144573!2d-58.58334818475252!3d-34.4690378804797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbe010183b1c1%3A0x2a04944122d6b38c!2sRivadavia%20%26%20Brandsen%2C%20B1646%20San%20Fernando%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sco!4v1689037482810!5m2!1ses-419!2sco"
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </section>
        </main>
    );
}

export default Inicio;