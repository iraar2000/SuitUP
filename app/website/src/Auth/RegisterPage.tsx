import { Input } from '@component/base/input/input';
import './css/global.css'
import { useState } from 'react';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import LoadingNotification from '@src/Notification/LoadingNotification';
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';

// the function component for the register page
export default function RegisterPage() {
    const { registerAccount, loading } = useUserAuthApi();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    // registration handler
    const registrationHandler = async () => {
        if (passwordMismatch) return;

        await registerAccount({
            firstName,
            lastName,
            userName,
            phone: "",
            email,
            password,
            address: "",
            location: [0, 0]
        })
    }

    return (
        <section className='auth-root'>
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
                                <p className="upper-title">A BETTER DRESSED BEGINING</p>
                                <div className="title-container">
                                    <p className="form-title">Make it personal.</p>
                                    <p className="form-subtitle">Create your SuitUP account. Find your signature style.</p>
                                </div>
                            </div>

                            <div className="main-body">
                                <div className="input-container">
                                    <Input isRequired label='First name' placeholder="Muhire" tooltip="This is a tooltip" onChange={setFirstName} />
                                    <Input isRequired label='Last name' placeholder="Christophe" tooltip="This is a tooltip" onChange={setLastName} />
                                </div>
                                <div className="input-container">
                                    <Input
                                        isRequired
                                        label='User name'
                                        placeholder="iraar2000"
                                        tooltip="This is a tooltip"
                                        onChange={setUserName}
                                    />
                                </div>
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
                                    <Input
                                        hint={passwordMismatch && 'Password does not match!'}
                                        label='Repeat password'
                                        placeholder="Confirm password"
                                        type='password'
                                        onChange={setConfirmPassword}
                                    />
                                </div>

                                <div className="input-container">
                                    <p className="info">At least 8 characters, including a number.</p>
                                </div>

                                <div className="input-container">
                                    <button className="btn-main" onClick={registrationHandler}>
                                        <p className="finnish">Create account</p>
                                    </button>
                                </div>

                                <div className="input-container">
                                    <p className="info">Already have an account?</p>
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

            {/* the loading page */}
            {loading && <LoadingNotification message={"Please wait while we account creation request."} />}
        </section>
    );
}