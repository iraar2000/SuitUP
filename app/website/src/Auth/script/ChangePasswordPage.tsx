import { Input } from '@component/base/input/input';
import '../css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';
import LoadingNotification from '@src/Notification/LoadingNotification';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
            {/* the page container */}
            <div className="page-container">
                {/* the form container */}
                <div className="form-container">
                    <div className="form-wrapper">
                        <div className="form-header">
                            <p className="form-title">Change password</p>
                            <p className="form-subtitle">You can change your password here!</p>
                        </div>
                        <div className="form-input-container">
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
                                <button className="btn finish-btn" onClick={changePasswordHandler}>
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
            {loading && <LoadingNotification message={'Please wait while we change the account password request.'} />}
        </div>
    );
}