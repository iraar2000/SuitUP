import { Icons } from "@src/constants/icons"
import { CiCircleCheck } from "react-icons/ci"

type SuccessNotificationType = {
    message?: string
}

export default function SuccessNotification({ message }: SuccessNotificationType) {
    return (
        <section className="notification-container">
            <div className="notification-wrapper">
                <Icons.circleCheck.Icon />
                <h3>Success</h3>
                <p>{message}</p>
            </div>
        </section>
    )
}