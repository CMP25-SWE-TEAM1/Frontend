import { useSelector } from "react-redux"
import NotificationComponent from "./NotificationComponent"
import VerifiedEmpty from "./VerifiedEmpty"
import NotificationEmpty from "./NotificationEmpty"

const NotificationsContainer = ({ list, type }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div>
      {!list[0] && (type === "verified" ? <VerifiedEmpty /> : <NotificationEmpty />)}

      {list[0] && list.map((notification, index) => <NotificationComponent key={index} logo={notification.logo} text={notification.text} />)}
    </div>
  )
}

export default NotificationsContainer
