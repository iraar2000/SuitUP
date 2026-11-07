import { Input } from '@component/base/input/input';
import '../css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import LoadingNotification from '@src/Notification/LoadingNotification';

// the function component for the register page
export default function LoginPage() {
    const { loginAccount, loading, response, error } = useUserAuthApi();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<Boolean>(false);

    // login handler
    const loginHandler = async () => {
        await loginAccount({ email, password, type: 'email' });
    }

    return (
        <div className='auth-root'>
            {/* the page container */}
            <div className="page-container">
                {/* the form container */}
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <p className="form-title">Login</p>
                            <p className="form-subtitle">Have an account already, welcome!</p>
                        </div>
                        <div className="form-input-container">
                            <div className="container">
                                <Input
                                    isRequired
                                    size='sm'
                                    placeholder="Email"
                                    tooltip="This is a tooltip"
                                    onChange={setEmail}
                                />
                            </div>
                            <div className="container">
                                <Input
                                    size='sm'
                                    placeholder="Password"
                                    type='password'
                                    onChange={setPassword}
                                />
                            </div>
                            <div className="container">
                                <div className="button-container">
                                    <button className="remember-me" onClick={() => setRememberMe(prev => !prev)}>
                                        <div className="tick">{rememberMe && <Icons.check.Icon />}</div>
                                        <p className="name">Remember me</p>
                                    </button>
                                    <a className='forgot-password' href='/auth/forgotPassword'>Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        <div className="other-option">
                            <div className="controller-btns">
                                <button className="btn go-back-btn">
                                    <Icons.leftArrow.Icon />
                                    <p className="go-back">Go back</p>
                                </button>
                                <button className="btn finish-btn" onClick={loginHandler}>
                                    <p className="finnish">Finish</p>
                                </button>
                            </div>
                            <div className="op-container">
                                <p className="op-title">Or continue with</p>
                                <div className="option-list"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* the banner container */}
                <div className="banner-container">
                    <img src="/assets/banner.jpg" alt="" />
                </div>
            </div>

            {/* the loading */}
            {loading && <LoadingNotification message={"Please wait while we account login request."} />}
        </div>
    );
}