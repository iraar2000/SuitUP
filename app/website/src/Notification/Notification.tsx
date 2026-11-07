import { Icons } from "@src/constants/icons"
import './css/notification.css'
import { useLocation, useNavigate } from "react-router-dom"

type NotificationType = {
    message?: string
    type: 'success' | 'error'
}

export default function Notification({ message, type = 'success' }: NotificationType) {
    const navigate = useNavigate();
    const location = useLocation();
    const messageData = location.state?.message ?? message ?? ''

    return (
        <section className={`notification-container ${type}`}>
            <div className={`notification-wrapper`}>
                {/* the success notification */}
                {(type === 'success') && <div className="success-notification">
                    <Icons.circleCheck.Icon size={64} />
                    <div className="info">
                        <h3>Success</h3>
                        <p>{messageData}</p>
                    </div>
                </div>}

                {/* the error notification */}
                {(type === 'error') && <div className="error-notification">
                    <Icons.circleClose.Icon size={64} />
                    <div className="info">
                        <h3>Error</h3>
                        <p>{messageData}</p>
                    </div>
                </div>}

                {/* the button to home */}
                <div className="btn-container">
                    <button className="go-back btn" onClick={() => navigate(-1)}>
                        <Icons.leftArrow.Icon />
                        <p className="label">Go back</p>
                    </button>
                    <button className="home btn">
                        <Icons.home.Icon />
                        <p className="label">Home</p>
                    </button>
                </div>
            </div>
        </section>
    )
}