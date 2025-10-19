import React from "react";

function Ofertas(){
    const imageUrl = "https://adclichosting.com/wp-content/uploads/2021/10/Pagina-en-construccion.jpg";
    
    return(
        <div className="pagina-en-construccion"> 
            <h1>Ofertas</h1>
            <img 
                src={imageUrl} 
                alt="Página en construcción" 
                className="imagen-construccion"
            />
        </div>
    )
}

export default Ofertas;