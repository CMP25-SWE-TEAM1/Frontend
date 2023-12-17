import { useSelector } from "react-redux"
import NotificationComponent from "./NotificationComponent"
import VerifiedEmpty from "./VerifiedEmpty"
import NotificationEmpty from "./NotificationEmpty"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

const NotificationsContainer = ({ list, type }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div>
      {!list[0] && (type === "verified" ? <VerifiedEmpty /> : <NotificationEmpty />)}

      {list[0] && list.map((notification, index) => <NotificationComponent key={index} logo={darkMode ? logoDark : logoLight} text={notification.description} date={notification.creation_time} />)}
    </div>
  )
}

export default NotificationsContainer
