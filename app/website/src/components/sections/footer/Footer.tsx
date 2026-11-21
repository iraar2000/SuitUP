import { Link } from "react-router-dom"
import "./Footer.css"

export default function Footer() {
    return (
        // the application page footer section
        < footer className="footer-section" >
            <div className="company-logo-wrapper">
                <Link to={"/home"} className="logo-container">
                    <img src="/favicon.svg" alt="logo" className="company-logo" />
                    <div className="company-description">
                        <p className="company-name">SuitUP</p>
                        <p className="company-details">Elegance first.</p>
                    </div>
                </Link>
            </div>
            <nav className="platform-navigation"></nav>
        </footer >
    )
}