import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useState } from "react"

import "./message-compose.css"

const MessageCompose = () => {
  // GIFs modal
  const [composeModalOpen, setComposeModalOpen] = useState(true)
  const handleComposeModalOpen = () => setComposeModalOpen(true)
  const handleComposeModalClose = () => setComposeModalOpen(false)

  return (
    <Modal open={composeModalOpen} onClose={handleComposeModalClose} aria-labelledby="compose message">
      <Box sx={modalStyle}>
        <div id="message-compose" className="message-compose">
          <div className="message-compose-header">
            <div onClick={handleComposeModalClose} className="message-compose-close" title="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </div>
            <div className="message-compose-title">New message</div>
            <div className="message-compose-next">Next</div>
          </div>
          <div className="message-compose-body"></div>
        </div>
      </Box>
    </Modal>
  )
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  maxWidth: 600,
  maxHeight: "80vh",
  borderRadius: "16px",
  overflowY: "auto",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  py: 0,
  px: 2,
}

export default MessageCompose
