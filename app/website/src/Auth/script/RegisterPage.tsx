import { Input } from '@component/base/input/input';
import '../css/global.css'
import { useState } from 'react';
import { Icons } from '@src/constants/icons';
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
                                <p className="form-title">Make it personal.</p>
                                <p className="form-subtitle">Create your SuitUP account. Find your signature style.</p>
                            </div>

                            <div className="main-body">
                                <div className="container">
                                    <Input isRequired placeholder="First name" tooltip="This is a tooltip" onChange={setFirstName} />
                                    <Input isRequired placeholder="Last name" tooltip="This is a tooltip" onChange={setLastName} />
                                </div>
                                <div className="container">
                                    <Input
                                        isRequired
                                        placeholder="User name"
                                        tooltip="This is a tooltip"
                                        onChange={setUserName}
                                    />
                                </div>
                                <div className="container">
                                    <Input
                                        isRequired
                                        placeholder="Email"
                                        tooltip="This is a tooltip"
                                        onChange={setEmail}
                                    />
                                </div>
                                <div className="container">
                                    <Input
                                        placeholder="Password"
                                        type='password'
                                        onChange={setPassword}
                                    />
                                </div>
                                <div className="container">
                                    <Input
                                        hint={passwordMismatch && 'Password does not match!'}
                                        placeholder="Confirm password"
                                        type='password'
                                        onChange={setConfirmPassword}
                                    />
                                </div>
                            </div>

                            <div className="other-option">
                                <div className="controller-btns">
                                    <button className="btn go-back-btn">
                                        <Icons.leftArrow.Icon />
                                        <p className="go-back">Go back</p>
                                    </button>
                                    <button className="btn finish-btn" onClick={registrationHandler}>
                                        <p className="finnish">Finish</p>
                                    </button>
                                </div>
                                <div className="op-container">
                                    <p className="op-title">Or continue with</p>
                                    <div className="option-list"></div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* the footer */}
                    <AuthFooter />
                </div>

                {/* the banner container */}
                <div className="banner-container">
                    <img src="/assets/banner.jpg" alt="" />
                </div>
            </div>

            {/* the loading page */}
            {loading && <LoadingNotification message={"Please wait while we account creation request."} />}
        </section>
    );
}