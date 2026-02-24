import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>
                    © {new Date().getFullYear()} <strong>SHOPEZ</strong> — Your one-stop shop
                </p>
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
