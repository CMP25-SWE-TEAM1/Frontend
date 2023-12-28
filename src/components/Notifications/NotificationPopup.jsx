import Snackbar from "@mui/material/Snackbar"

import NotificationComponent from "./NotificationComponent"
import { useSelector } from "react-redux"

import React from "react"

/**
 * Renders a placeholder with clear guidance when no notifications are present, encouraging exploration and engagement with verified accounts.
 *
 * @component
 */
const NotificationPopup = ({ notification, open, handleClick, handleClose }) => {
  const notificationContent = notification && (
    <div className="flex w-fit items-center">
      <NotificationComponent logo={notification.notifierProfileImage} type={notification.type} text={notification.description} date={notification.creation_time} id={notification.notifier} />
    </div>
  )
  //   useEffect(() => {
  //     console.log(notification)
  //   }, [notification])

  const darkmode = useSelector((state) => state.theme.darkmode)
  return (
    <div>
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-root": {
            padding: 0,
            backgroundColor: darkmode ? "" : "white",
            color: darkmode ? "" : "black",
          },
          "& .MuiSnackbarContent-action": {
            padding: 0,
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={notificationContent}
      />
    </div>
  )
}

// NotificationPopup.propTypes = {
//   /**
//    * The notification object to display
//    */
//   notification: React.PropTypes.object, // Optional prop
//   /**
//    * Controls whether the popup is open or closed
//    */
//   open: React.PropTypes.bool.isRequired,
//   /**
//    * Function called when the notification content is clicked
//    */
//   handleClick: React.PropTypes.func, // Optional prop
//   /**
//    * Function used to handle the closing of the popup
//    */
//   handleClose: React.PropTypes.func.isRequired,
// }
export default NotificationPopup
