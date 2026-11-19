import "./headerNavigator.css"

export default function HeaderNavigator() {
    return (
        // the header navigator section
        <section className="header-navigator-section">
            {/* the site navigation */}
            <nav className="navigation-container">
                <li className="nav-list">
                    <ul className="nav-list-element">Men</ul>
                    <ul className="nav-list-element">Women</ul>
                    <ul className="nav-list-element">Wedding</ul>
                    <ul className="nav-list-element">Business</ul>
                    <ul className="nav-list-element">Clearence</ul>
                </li>
            </nav>

            {/* the site logo */}
            <div className="logo-container">

            </div>

            {/* the header features */}
            <div className="feature-container"></div>
        </section>
    )
}