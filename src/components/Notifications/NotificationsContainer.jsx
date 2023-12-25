import { useSelector } from "react-redux"
import NotificationComponent from "./NotificationComponent"
import VerifiedEmpty from "./VerifiedEmpty"
import NotificationEmpty from "./NotificationEmpty"
import { useEffect } from "react"

const NotificationsContainer = ({ list, type, feedRef, loading }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div>
      {!list[0] && !loading && (type === "verified" ? <VerifiedEmpty /> : <NotificationEmpty />)}

      {list[0] && list.map((notification, index) => <NotificationComponent key={index} logo={notification.notifierProfileImage} type={notification.type} text={notification.description} date={notification.creation_time} notifier={notification.notifierUser} />)}

      <div ref={feedRef}></div>
    </div>
  )
}

export default NotificationsContainer
