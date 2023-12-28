import { useSelector } from "react-redux"
import NotificationComponent from "./NotificationComponent"
import VerifiedEmpty from "./VerifiedEmpty"
import NotificationEmpty from "./NotificationEmpty"
import { useEffect } from "react"

import React from "react"

/**
 * Manages the display of notifications, adapting content based on type and loading state, and rendering placeholders when appropriate.
 *
 * @component
 */
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

// NotificationsContainer.propTypes = {
//   /**
//    * The list of notifications to display
//    */
//   list: React.PropTypes.array.isRequired,
//   /**
//    * The type of notifications to display (e.g., "verified", "mentions")
//    */
//   type: React.PropTypes.string.isRequired,
//   /**
//    * A ref object to attach to the container for the notification feed
//    */
//   feedRef: React.PropTypes.object.isRequired,
//   /**
//    * Indicates whether notifications are currently loading
//    */
//   loading: React.PropTypes.bool.isRequired,
// }

export default NotificationsContainer
