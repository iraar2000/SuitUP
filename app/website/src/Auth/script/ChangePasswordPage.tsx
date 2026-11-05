import { Input } from '@component/base/input/input';
import '../css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';

// the function component for the register page
export default function ChangePasswordPage() {
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [confirmPassword, setConfirmPassword] = useState<String>('');
    const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    return (
        <div className='auth-root'>
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
                                <button className="btn finish-btn">
                                    <p className="finnish">Finnish</p>
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
        </div>
    );
}