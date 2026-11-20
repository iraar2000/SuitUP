import { Routes, Route } from "react-router-dom";

import LoginPage from "./Auth/script/LoginPage";
import RegisterPage from "./Auth/script/RegisterPage";
import ProfilePage from "./Auth/script/ProfilePage";
import ChangePasswordPage from "./Auth/script/ChangePasswordPage";
import ForgotPasswordPage from "./Auth/script/ForgotPasswordPage";
import Notification from "./Notification/Notification";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Collections from "./pages/Collections";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import Layout from "./Layout";

// the routes for the app
export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* the home page */}
                <Route path="home" element={<Home />} />

                {/* the appointment page */}
                <Route path="appointment" element={<Appointment />} />
                <Route path="collection/:type" element={<Collections />} />
                <Route path="cart" element={<Cart />} />
                <Route path="search" element={<Search />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* the authentication routes */}
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
            <Route path="auth/profile" element={<ProfilePage />} />
            <Route path="auth/changePassword" element={<ChangePasswordPage />} />
            <Route path="auth/forgotPassword" element={<ForgotPasswordPage />} />

            {/* the notification routes */}
            <Route path="notification/success" element={<Notification type="success" />} />
            <Route path="notification/error" element={<Notification type="error" />} />
        </Routes>
    );
}