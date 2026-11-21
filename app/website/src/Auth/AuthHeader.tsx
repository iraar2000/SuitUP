import { useNavigate } from "react-router-dom";
import "./css/global.css"

// the authentication header
export default function AuthHeader() {
    const navigate = useNavigate();

    return (
        //  the header *
        <header className='form-header' >
            <button onClick={() => { navigate("/home") }} className="logo-container auth-wrapper">
                <img src="/favicon.svg" alt="logo" className="company-logo" />
                <div className="company-description">
                    <p className="company-name">SuitUP</p>
                    <p className="company-details">Elegance first.</p>
                </div>
            </button>
        </header >
    )
}