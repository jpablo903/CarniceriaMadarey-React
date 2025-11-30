import React, { useState, useEffect, useRef } from 'react';

const MapaDiferido = () => {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const contenedorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMostrarMapa(true); 
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } 
    );

    if (contenedorRef.current) {
      observer.observe(contenedorRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={contenedorRef} className="mapa-responsive" style={{ minHeight: '300px', background: '#f0f0f0' }}>
      {mostrarMapa ? (
        <iframe
            title="Carniceria Madarey"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1163.3854949496888!2d-58.567033118768315!3d-34.43815620323999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca57089cbf1a9%3A0xaff371ac4863e875!2sMadarey!5e0!3m2!1ses-419!2sco!4v1764516524410!5m2!1ses-419!2sco"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width: '100%', height: '100%', border: 0 }}
        ></iframe>
      ) : (
        // Mientras no llegamos al mapa, mostramos esto (o una imagen estática)
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
            <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  );
};

export default MapaDiferido;