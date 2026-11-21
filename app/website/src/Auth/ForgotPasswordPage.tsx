import { Input } from '@component/base/input/input';
import './css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import { useNavigate } from 'react-router-dom';
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';


// the function component for the forgot password page
export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const { forgotAccountPassword, response, error } = useUserAuthApi();

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (!response && !error) return

        if (response) navigate('/notification/success', {
            state: { message: "The request to change password sent successfully!" }
        });
        else if (error) navigate('/notification/error', {
            state: { message: "Failed to send the request to change the password!" }
        });
    }, [response, error])

    // forgot password handler
    const forgotPasswodHandler = async () => {
        const { response, error } = await forgotAccountPassword({ email })
        console.log(response?.data.message, error);
    }

    return (
        <div className='auth-root'>
            <div className="page-container">
                {/* the form container */}
                <div className="form-container">
                    {/* the header */}
                    <AuthHeader />

                    {/* the main */}
                    <main className="form-main auth-wrapper">
                        <div className="main-container">
                            <div className="main-header">
                                <a href="/auth/login" className="back">
                                    <Icons.leftArrow.Icon />
                                    <p className="back-text">Back to sign in</p>
                                </a>
                                <p className="upper-title">YOUR PERSONAL WARDROBE</p>
                                <div className="title-container">
                                    <p className="form-title">Forgot your password?</p>
                                    <p className="form-subtitle">Enter the email linked to your account. We’ll send you
                                        a link to reset your password.</p>
                                </div>
                            </div>

                            <div className="main-body">
                                <div className="input-container">
                                    <Input
                                        isRequired
                                        size='sm'
                                        label='Email'
                                        placeholder="Email"
                                        tooltip="Enter your registered email"
                                        onChange={setEmail}
                                    />
                                </div>

                                <div className="input-container">
                                    <button className="btn-main" onClick={forgotPasswodHandler}>
                                        <p className="finnish">Send Reset Email</p>
                                    </button>
                                </div>

                                <div className="input-container">
                                    <p className="info">Remember it now?</p>
                                    <a href="/auth/login" className="info info-nav">Signin</a>
                                </div>

                            </div>
                        </div>
                    </main>

                    {/* the footer */}
                    <AuthFooter />
                </div>

                {/* the banner container */}
                <div className="banner-container">
                    <div className="image-container">
                        <img src="/assets/banner.jpg" alt="banner image" />
                    </div>
                </div>
            </div>
        </div>
    );
}