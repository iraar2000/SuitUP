import "../css/global.css"

// the authentication header
export default function AuthHeader() {
    return (
        //  the header *
        <header className='form-header' >
            <div className="logo-container auth-wrapper">
                <img src="/favicon.svg" alt="logo" className="company-logo" />
                <div className="company-description">
                    <p className="company-name">SuitUP</p>
                    <p className="company-details">Elegance first.</p>
                </div>
            </div>
        </header >
    )
}