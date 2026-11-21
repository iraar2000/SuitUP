import { useState } from "react"
import "./headerNavigator.css"
import { Icons } from "@src/constants/icons";
import { Link } from "react-router-dom";

export default function HeaderNavigator() {
    const [activeMenu, setActiveMenu] = useState<"men" | "women" | "wedding" | "business" | "clearence" | "search" | "profile" | "cart" | null>(null)
    const [menu, setMenu] = useState<"men" | "women" | "wedding" | "business" | "clearence" | "search" | "profile" | "cart" | null>(null);
    const [activeBtn, setActiveBtn] = useState<"search" | "profile" | "cart" | null>(null);

    // the function which handles the mouseEnter
    const handleMouseEnter = (menu: "men" | "women" | "wedding" | "business" | "clearence" | "search" | "profile" | "cart" | null) => {
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
                <Link to={"/home"} className="logo-container" onClick={() => setActiveBtn(null)}>
                    <img src="/favicon.svg" alt="logo" className="company-logo" />
                    <div className="company-description">
                        <p className="company-name">SuitUP</p>
                        <p className="company-details">Elegance first.</p>
                    </div>
                </Link>

                {/* the header features */}
                <div className="feature-container">
                    {/* the search button */}
                    <nav className="feature-navigator">
                        <ul className="feature-listing">
                            <li className="feature-element">
                                <Link aria-label={Icons.search.label} to="/search" className={`search-navigator ${activeBtn === 'search' ? 'menu-btn-active' : ''}`} onClick={() => setActiveBtn('search')}>
                                    <Icons.search.Icon />
                                </Link>
                            </li>

                            {/* the profile button */}
                            <li className="feature-element">
                                <Link aria-label={Icons.user.label} to="/profile" className={`profile-navigator ${activeBtn === 'profile' ? 'menu-btn-active' : ''}`} onClick={() => setActiveBtn('profile')} >
                                    <Icons.user.outlineIcon />
                                </Link>
                            </li>

                            {/* the cart button */}
                            <li className="feature-element">
                                <Link aria-label={Icons.cart.label} to="/cart" className={`cart-navigator ${activeBtn === 'cart' ? 'menu-btn-active' : ''}`} onClick={() => setActiveBtn('cart')}>
                                    <Icons.cart.outlineIcon />
                                </Link>
                            </li>

                            {/* the appointment button */}
                            <li className="feature-element">
                                <Link to="/appointment" className="appointment-navigator">
                                    <p>book appointment</p>
                                </Link>
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