import { Input } from '@component/base/input/input';
import './css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import LoadingNotification from '@src/Notification/LoadingNotification';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';

// the function component for the register page
export default function ChangePasswordPage() {
    const { changeAccountPassword, loading, response, error } = useUserAuthApi()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;


    // change password handler
    const changePasswordHandler = async () => {
        const token = searchParams.get("token");

        if (password !== confirmPassword) return;
        await changeAccountPassword({ email, password, token })
    }

    useEffect(() => {
        if (!response && !error) return

        if (response) navigate('/notification/success', {
            state: { message: "Password changed successfully!" }
        });
        else if (error) navigate('/notification/error', {
            state: { message: "Failed to change the password!" }
        });
    }, [response, error])

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
                                <p className="upper-title">A FRESH START</p>
                                <div className="title-container">
                                    <p className="form-title">Set a new password.</p>
                                    <p className="form-subtitle">Choose a strong password to keep your account secure.</p>
                                </div>
                            </div>

                            <div className="main-body">
                                <div className="input-container">
                                    <Input
                                        isRequired
                                        label='Email'
                                        placeholder="your@example.com"
                                        tooltip="This is a tooltip"
                                        onChange={setEmail}
                                    />
                                </div>
                                <div className="input-container">
                                    <Input
                                        placeholder="Password"
                                        label='Password'
                                        type='password'
                                        onChange={setPassword}
                                    />
                                </div>
                                <div className="input-container">
                                    <Input
                                        hint={passwordMismatch && 'Password does not match!'}
                                        label='Confirm password'
                                        placeholder="Confirm password"
                                        type='password'
                                        onChange={setConfirmPassword}
                                    />
                                </div>

                                <div className="input-container">
                                    <p className="info">At least 8 characters, including a number.</p>
                                </div>

                                <div className="input-container">
                                    <button className="btn-main" onClick={changePasswordHandler}>
                                        <p className="finnish">Update password</p>
                                    </button>
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
            {loading && <LoadingNotification message={'Please wait while we change the account password request.'} />}
        </div>
    );
}