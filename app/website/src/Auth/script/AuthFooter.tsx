import { Icons } from "@src/constants/icons"
import "../css/global.css"

export default function AuthFooter() {
    return (
        // the footer
        <footer className="form-footer">
            <div className="copyright-container auth-wrapper">
                <div className="year-content">
                    <Icons.copyright.Icon />
                    <p className="year-text">{(new Date()).getFullYear()} SuitUP</p>
                </div>

                <div className='privacy-terms'>
                    <a className="privacy">Privacy policy</a>
                    <div className='sepatator'></div>
                    <a className="terms">Terms of services</a>
                </div>
            </div>
        </footer>
    )
}