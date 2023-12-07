import { useSelector } from "react-redux"
import NotificationComponent from "./NotificationComponent"

const NotificationsContainer = ({ list }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div>
      {list.map((notification, index) => (
        <NotificationComponent key={index} logo={notification.logo} text={notification.text} />
      ))}
    </div>
  )
}

export default NotificationsContainer
