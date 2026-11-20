// Layout.jsx
import Footer from "@component/sections/footer/Footer";
import Header from "@component/sections/header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}