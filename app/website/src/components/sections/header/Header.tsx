import HeaderInfo from "./HeaderInfo";
import HeaderNavigator from "./HeaderNavigator";
import './Header.css'

export default function Header() {
    return (
        // the header section
        < header className="header-section" >
            <HeaderInfo message="Want to take the measurements, book an appointment." url="/appointment" urlName="appointment?" />
            <HeaderNavigator />
        </header >
    );
}