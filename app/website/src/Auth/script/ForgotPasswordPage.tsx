import { Input } from '@component/base/input/input';
import '../css/global.css'
import { useEffect, useState } from 'react';
import { Icons } from '@src/constants/icons';
import { useUserAuthApi } from '@src/hooks/api/Auth/authApi';


// the function component for the forgot password page
export default function ForgotPasswordPage() {
    const { forgotAccountPassword, response, error } = useUserAuthApi();

    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        console.log(response);
    }, [response]);

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
                    <div className="form-wrapper">
                        <div className="form-header">
                            <p className="form-title">Forgot password</p>
                            <p className="form-subtitle">Have you forgotten the you account password?</p>
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
                        </div>
                        <div className="other-option">
                            <div className="controller-btns">
                                <button className="btn go-back-btn">
                                    <Icons.leftArrow.Icon />
                                    <p className="go-back">Go back</p>
                                </button>
                                <button className="btn finish-btn" onClick={forgotPasswodHandler}>
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
        </div>
    );
}