import { Input } from '@component/base/input/input';
import './css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import LoadingNotification from '@src/Notification/LoadingNotification';
import { useNavigate } from 'react-router-dom';
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';

// the function component for the register page
export default function LoginPage() {
    const { loginAccount, loading, response, error } = useUserAuthApi();
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<Boolean>(false);

    // login handler
    const loginHandler = async () => {
        await loginAccount({ email, password, type: 'email' });
    }

    useEffect(() => {
        if (!response && !error) return

        if (response) navigate('/notification/success', {
            state: { message: "Login successfully into the account!" }
        });
        else if (error) navigate('/notification/error', {
            state: { message: "Failed to login the account!" }
        });
    }, [response, error])

    return (
        <div className='auth-root'>

            {/* the page container */}
            <div className="page-container">
                {/* the form container */}
                <div className="form-container">
                    {/* the header */}
                    <AuthHeader />

                    {/* the main */}
                    <main className="form-main auth-wrapper">
                        <div className="main-container">
                            <div className="main-header">
                                <p className="upper-title">YOUR PERSONAL WARDROBE</p>
                                <div className="title-container">
                                    <p className="form-title">Welcome back.</p>
                                    <p className="form-subtitle">Sign in to a world tailored to you.</p>
                                </div>
                            </div>

                            <div className="main-body">
                                <div className="input-container">
                                    <Input
                                        isRequired
                                        size='sm'
                                        label='Email'
                                        placeholder="your@example.com"
                                        tooltip="Enter your registration email"
                                        onChange={setEmail}
                                    />
                                </div>
                                <div className="input-container">
                                    <Input
                                        size='sm'
                                        label='Password'
                                        placeholder="Password"
                                        type='password'
                                        onChange={setPassword}
                                    />
                                </div>
                                <div className="input-container">
                                    <div className="remember-forgot">
                                        <button className="remember-me" onClick={() => setRememberMe(prev => !prev)}>
                                            <div className="tick">{rememberMe && <Icons.check.Icon />}</div>
                                            <p className="name">Remember me</p>
                                        </button>
                                        <a className='forgot-password' href='/auth/forgotPassword'>Forgot password?</a>
                                    </div>
                                </div>

                                <div className="input-container">
                                    <p className="info">At least 8 characters, including a number.</p>
                                </div>

                                <div className="input-container">
                                    <button className="btn-main" onClick={loginHandler}>
                                        <p className="finnish">Create account</p>
                                    </button>
                                </div>

                                <div className="input-container">
                                    <p className="info">Already have an account?</p>
                                    <a href="/auth/register" className="info info-nav">Create account</a>
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

            {/* the loading */}
            {loading && <LoadingNotification message={"Please wait while we account login request."} />}
        </div>
    );
}