import Typography from "@mui/material/Typography"

import { Modal, Box } from "@mui/material"

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
            <button className="btn mt-3 w-[100px] dark:!text-white" onClick={handleCloseBirthdateError}>
              Close
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default ErrorPage
