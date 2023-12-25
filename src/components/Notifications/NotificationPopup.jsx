import Snackbar from "@mui/material/Snackbar"

import NotificationComponent from "./NotificationComponent"
import { useSelector } from "react-redux"

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
            color:darkmode?"": "black",
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

export default NotificationPopup
