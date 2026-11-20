import { useState } from "react"
import "./headerNavigator.css"
import { Icons } from "@src/constants/icons";

export default function HeaderNavigator() {
    const [activeMenu, setActiveMenu] = useState<"men" | "women" | "wedding" | "business" | "clearence" | null>(null)
    const [menu, setMenu] = useState<"men" | "women" | "wedding" | "business" | "clearence" | null>(null);

    // the function which handles the mouseEnter
    const handleMouseEnter = (menu: "men" | "women" | "wedding" | "business" | "clearence" | null) => {
        setActiveMenu(menu);
        setMenu(menu);
    };

    // the function which handles the mouseLeave
    const handleMouseLeave = () => { setActiveMenu(null); }
    return (
        <section className="menu-container">
            {/* the header navigator section */}
            <section className="header-navigator-section">
                {/* the site navigation */}
                <nav className="navigation-container" onMouseLeave={handleMouseLeave}>
                    <ul className="nav-list">
                        <li className={`nav-list-element ${activeMenu === 'men' ? 'active-menu' : ''}`} onMouseEnter={() => handleMouseEnter("men")}>
                            <a href="/collection/men" className="sub-nav">Men</a>
                        </li>
                        <li className={`nav-list-element ${activeMenu === 'women' ? 'active-menu' : ''}`} onMouseEnter={() => handleMouseEnter("women")}>
                            <a href="/collection/women" className="sub-nav">Women</a>
                        </li>
                        <li className={`nav-list-element ${activeMenu === 'wedding' ? 'active-menu' : ''}`} onMouseEnter={() => handleMouseEnter("wedding")}>
                            <a href="/collection/wedding" className="sub-nav">Wedding</a>
                        </li>
                        <li className={`nav-list-element ${activeMenu === 'business' ? 'active-menu' : ''}`} onMouseEnter={() => handleMouseEnter("business")}>
                            <a href="/collection/business" className="sub-nav">Business</a>
                        </li>
                        <li className={`nav-list-element ${activeMenu === 'clearence' ? 'active-menu' : ''}`} onMouseEnter={() => handleMouseEnter("clearence")}>
                            <a href="/collection/clearance" className="sub-nav">Clearence</a>
                        </li>
                    </ul>
                </nav>

                {/* the site logo */}
                <div className="logo-container">
                    <img src="/favicon.svg" alt="logo" className="company-logo" />
                    <div className="company-description">
                        <p className="company-name">SuitUP</p>
                        <p className="company-details">Elegance first.</p>
                    </div>
                </div>

                {/* the header features */}
                <div className="feature-container">
                    {/* the search button */}
                    <nav className="feature-navigator">
                        <ul className="feature-listing">
                            <li className="feature-element">
                                <a aria-label={Icons.search.label} href="/search" className="search-navigator">
                                    <Icons.search.Icon />
                                </a>
                            </li>

                            {/* the profile button */}
                            <li className="feature-element">
                                <a aria-label={Icons.user.label} href="/profile" className="profile-navigator">
                                    <Icons.user.outlineIcon />
                                </a>
                            </li>

                            {/* the cart button */}
                            <li className="feature-element">
                                <a aria-label={Icons.cart.label} href="/cart" className="cart-navigator">
                                    <Icons.cart.outlineIcon />
                                </a>
                            </li>

                            {/* the appointment button */}
                            <li className="feature-element">
                                <a href="/appointment" className="appointment-navigator">
                                    <p>book appointment</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            {/* the popup menu */}
            {
                activeMenu && (
                    <section className="popup-menu" onMouseEnter={() => setActiveMenu(menu)} onMouseLeave={handleMouseLeave}>
                        <p className="menu">-- {menu} --</p>
                    </section>
                )
            }
        </section >
    )
}