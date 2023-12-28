import Typography from "@mui/material/Typography"

import { Modal, Box } from "@mui/material"

import React from "react"

/**
 * Generates ErrorPage component which displays an error message in a modal when signup issues arise, prompting the user to return to the previous step for correction.
 *
 * @component
 */
const ErrorPage = ({ setDay, setMonth, setYear, setNickName, setEmail, openBirthdateErrorModal, handleCloseBirthdateErrorModal }) => {
  const handleCloseBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page")
    const FirstStep = document.getElementById("First Step")

    ErrorPage.style.display = "none"
    FirstStep.style.display = "block"

    setDay("")
    setMonth("")
    setYear("")
    setNickName("")
    setEmail("")

    handleCloseBirthdateErrorModal()
  }
  return (
    <div id="Error Page" className="m-auto -mt-10 hidden w-[320px]">
      <div className="!h-fit">
        <Modal className="relative" open={openBirthdateErrorModal} onClose={handleCloseBirthdateErrorModal} disableEscapeKeyDown disablePortal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 100%)",
              width: 300,
              bgcolor: "transparent",
              border: "1px solid white",
              boxShadow: 24,
              p: 2,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // marginTop: "45%",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Can't complete your signup right now.
            </Typography>
            <button className="btn mt-3 w-[100px] dark:!bg-white" onClick={handleCloseBirthdateError}>
              Close
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

// ErrorPage.propTypes = {
//   /**
//    * Function to update the selected day
//    */
//   setDay: React.PropTypes.func,

//   /**
//    * Function to update the selected month
//    */
//   setMonth: React.PropTypes.func,

//   /**
//    * Function to update the selected year
//    */
//   setYear: React.PropTypes.func,

//   /**
//    * Function to update the nickname
//    */
//   setNickName: React.PropTypes.func,

//   /**
//    * Function to update the email
//    */
//   setEmail: React.PropTypes.func,

//   /**
//    * Bool to open the birthdate error modal
//    */
//   openBirthdateErrorModal: React.PropTypes.bool,

//   /**
//    * Function to handle the closing of the birthdate error modal
//    */
//   handleCloseBirthdateErrorModal: React.PropTypes.func,
// }
export default ErrorPage
