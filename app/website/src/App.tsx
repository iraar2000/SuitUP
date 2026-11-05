import { Routes, Route } from "react-router-dom";

import LoginPage from "./Auth/script/LoginPage";
import RegisterPage from "./Auth/script/RegisterPage";
import ProfilePage from "./Auth/script/ProfilePage";
import ChangePasswordPage from "./Auth/script/ChangePasswordPage";
import ForgotPasswordPage from "./Auth/script/ForgotPasswordPage";

// the routes for the app
export default function App() {
    return (
        <Routes>
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
            <Route path="auth/profile" element={<ProfilePage />} />
            <Route path="auth/changePassword" element={<ChangePasswordPage />} />
            <Route path="auth/forgotPassword" element={<ForgotPasswordPage />} />
        </Routes>
    );
}