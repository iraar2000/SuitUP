import './css/loading.css'
import { OrbitProgress } from "react-loading-indicators";

interface LoadingNotificationProps {
    message?: String
}

// the loading notification component
export default function LoadingNotification({ message }: LoadingNotificationProps) {
    return (
        <section className="notification-container">
            <div className="loading-notification">
                <OrbitProgress
                    variant="spokes"
                    color="#2563eb"
                    size="large"
                />

                <h3>Loading...</h3>
                <p>{message}</p>
            </div>
        </section>
    );
}