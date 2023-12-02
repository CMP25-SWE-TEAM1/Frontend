import { useState } from "react"
import TextField from "@mui/material/TextField"
import { createTheme } from "@mui/material"

const MessageInput = (props) => {
  const handleSendMessage = props.handleSendMessage
  const [newMessage, setNewMessage] = useState("")
  const [sndMsgActv, setSndMsgActv] = useState("")

  const handleChange = (event) => {
    setNewMessage(event.target.value)
    event.target.value === "" ? setSndMsgActv("") : setSndMsgActv("active")
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSndMsg()
    }
  }

  const handleSndMsg = () => {
    if (newMessage !== "") handleSendMessage(newMessage)
    // Reset values
    setNewMessage("")
    setSndMsgActv("")
  }

  const myTheme = createTheme({
    spacing: 1,
  })

  return (
    <div className="keyboard">
      <div className="content">
        {/* Left icons (Media - GIF - Emoji) */}
        <div className="icons">
          <div className="media-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
          <div className="gif-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
          <div className="emoji-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
        </div>
        {/* Message text */}
        <div className="message-text">
          <div className="input-area">
            <TextField
              fullWidth
              multiline
              maxRows={6}
              value={newMessage}
              variant="standard"
              // placeholder cause error in runtime (no solution found for now!)
              // placeholder="Start a new message"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                px: myTheme.spacing(4),
                py: myTheme.spacing(12),
              }}
              id="message-input-field"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {/* Send message icon */}
        <div className={`send-message ${sndMsgActv}`}>
          <div
            className="send-icon"
            onClick={() => {
              handleSndMsg()
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageInput
