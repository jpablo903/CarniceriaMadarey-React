import React from "react";

function Contacto(){
    const imageUrl = "https://adclichosting.com/wp-content/uploads/2021/10/Pagina-en-construccion.jpg";
    
    return(
        // Usamos un contenedor principal para centrar todo el contenido de la página
        <div className="pagina-en-construccion"> 
            <h1>Contacto</h1>
            <img 
                src={imageUrl} 
                alt="Página en construcción" 
                className="imagen-construccion"
            />
        </div>
    )
}

export default Contacto;