import '../css/footer.css';

const basePath = '/icon';

const Footer = () => {
    return (
        <footer>
            <section className="footer-social-media">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${basePath}/icons8-instagram-48.png`}
                        alt="Instagram"
                        width="48"
                    />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${basePath}/icons8-x-48.png`}
                        alt="X"
                        width="48"
                    />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${basePath}/icons8-facebook-nuevo-48.png`}
                        alt="Facebook"
                        width="48"
                    />
                </a>
                <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${basePath}/icons8-whatsapp-48.png`}
                        alt="WhatsApp"
                        width="48"
                    />
                </a>
            </section>

            <section className="footer-info">
                <p>Derechos reservados &copy; 2025</p>
                <p className="footer-desarrollador">
                    Desarrollado por: Revolución Tech ARG
                    <img
                        src={`${basePath}/argentina.png`}
                        alt="Bandera de Argentina"
                        width="20"
                    />
                </p>
            </section>
        </footer>
    );
};

export default Footer;