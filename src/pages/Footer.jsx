import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
    return (
        <footer className="footer-modern">
            <div className="footer-container">
                <div className="footer-column brand-column">
                    <h3 className="footer-brand">Carnicería Madarey</h3>
                    <p className="footer-tagline">Calidad Premium en cada corte.</p>
                    <div className="footer-disclaimer">
                        <p>
                            <strong>Proyecto Educativo:</strong> Esta página es parte de un proyecto del curso de React JS del programa <strong>Talento Tech</strong>.
                        </p>
                        <p>
                            La información aquí presentada es netamente ilustrativa. Esta página no tiene relación comercial con la Carnicería Madarey real, aunque se cuenta con autorización para el uso de su nombre. No se realizan operaciones reales ni se representan datos verídicos del negocio.
                        </p>
                    </div>
                </div>

                <div className="footer-column links-column">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/Productos">Productos</Link></li>
                        <li><Link to="/Ofertas">Ofertas</Link></li>
                        <li><Link to="/Resenias">Reseñas</Link></li>
                        <li><Link to="/Contacto">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-column contact-column">
                    <h4>Contacto</h4>
                    <p><i className="fas fa-map-marker-alt"></i> Rivadavia y Brandsen, San Fernando</p>
                    <p><i className="fas fa-phone"></i> (011) 3832-8549</p>
                    <p><i className="fas fa-envelope"></i> Giuli.madarey@gmail.com</p>

                    <div className="social-links">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 Carnicería Madarey. Todos los derechos reservados.</p>
                <p className="developer-credit">
                    Desarrollado por: <strong>Revolución Tech ARG</strong> 🇦🇷
                </p>
            </div>
        </footer>
    );
};

export default Footer;