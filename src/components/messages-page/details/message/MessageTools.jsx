import copyToClipboard from "copy-to-clipboard"
import { useState } from "react"

const MessageTools = (props) => {
  const messageId = props.messageId
  const messageMedia = props.messageMedia
  const messageText = props.messageText
  const hideMsgTools = props.hideMsgTools
  const visibiltyStyle = props.visibiltyStyle
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertVTimeOut, setAlertVTimeOut] = useState(null)

  const handleReply = () => {}
  const handleCopy = () => {
    copyToClipboard(`${messageText}\n${messageMedia ? messageMedia : ""}`)
    clearTimeout(alertVTimeOut)
    setIsAlertVisible(true)
    setAlertVTimeOut(
      setTimeout(() => {
        setIsAlertVisible(false)
      }, 2250)
    )
  }
  const handleDelete = () => {}
  return (
    <>
      <div className="message-tools" style={{ display: visibiltyStyle }}>
        <ul>
          <li className="reply-tool" onClick={handleReply}>
            <div className="tool-content">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M12 6.229C5.269 7.328 1.995 12.498 2 22.001h2c0-1.914.705-3.537 2.095-4.825 1.5-1.391 3.739-2.259 5.905-2.331v5.507L23.259 10.5 12 .648v5.581zm2 1.773V5.056l6.222 5.443L14 15.942v-3.004l-.924-.07c-.265-.021-.531-.03-.798-.03-2.765 0-5.594 1.064-7.542 2.87l-.129.122c1.13-4.802 3.874-7.242 8.499-7.733l.895-.095z"></path>
                  </g>
                </svg>
              </div>
              <div className="tool-text">Reply</div>
            </div>
          </li>
          <li className="copy-tool" onClick={handleCopy}>
            <div className="tool-content">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M15 6v3h3v2h-3v3h-2v-3h-3V9h3V6h2zm4.5-4C20.88 2 22 3.12 22 4.5v11c0 1.38-1.12 2.5-2.5 2.5h-11C7.12 18 6 16.88 6 15.5v-11C6 3.12 7.12 2 8.5 2h11zM8 15.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-11c0-.28-.22-.5-.5-.5h-11c-.28 0-.5.22-.5.5v11zm-4 4V8h-.5C2.67 8 2 8.67 2 9.5v10C2 20.88 3.12 22 4.5 22h10c.83 0 1.5-.67 1.5-1.5V20H4.5c-.28 0-.5-.22-.5-.5z"></path>
                  </g>
                </svg>
              </div>
              <div className="tool-text">Copy message</div>
            </div>
          </li>
          <li className="delete-tool" onClick={handleDelete}>
            <div className="tool-content">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path>
                  </g>
                </svg>
              </div>
              <div className="tool-text">Delete for you</div>
            </div>
          </li>
        </ul>
      </div>
      {isAlertVisible && <div className="message-copied-pop">Copied to clipboard</div>}
    </>
  )
}

export default MessageTools
