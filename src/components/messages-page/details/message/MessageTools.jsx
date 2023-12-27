// Functions
import copyToClipboard from "copy-to-clipboard"
// Hooks
import { useState } from "react"

/**
 * Renders a set of message tools for a given message.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - messageId: The ID of the message.
 *   - messageMedia: The media content of the message.
 *   - messageText: The text content of the message.
 *   - hideMsgTools: A function to hide the message tools.
 *   - msgToolsPositionX: The X position of the message tools (toRight/toLeft) to avoid overflow.
 *   - msgToolsPositionY: The Y position of the message tools (toTop/toBottom) to avoid overflow.
 *   - visibiltyStyle: The visibility style of the message tools (visible or hidden).
 * @return {JSX.Element} The rendered message tools.
 */
const MessageTools = (props) => {
  // ==============  Props   ==============
  const messageId = props.messageId
  const messageMedia = props.messageMedia
  const messageText = props.messageText
  const hideMsgTools = props.hideMsgTools
  const msgToolsPositionX = props.msgToolsPositionX
  const msgToolsPositionY = props.msgToolsPositionY
  const visibiltyStyle = props.visibiltyStyle

  // ==============  Data   ==============
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertVTimeOut, setAlertVTimeOut] = useState(null)

  // ==============  Functions   ==============
  // Function to handle copying message text and media to clipboard
  const handleCopy = () => {
    // Hide message tools
    hideMsgTools()

    // Create clipboard text with message text and media
    const clipboardText = `${messageText ? messageText : ""}${messageText && messageMedia ? `\n` : ""}${messageMedia ? messageMedia : ""}`

    // Copy clipboard text to clipboard
    copyToClipboard(clipboardText)

    // Clear timeout for alert visibility
    clearTimeout(alertVTimeOut)

    // Show alert
    setIsAlertVisible(true)

    // Set timeout to hide alert after 2250 milliseconds
    setAlertVTimeOut(
      setTimeout(() => {
        setIsAlertVisible(false)
      }, 2250)
    )
  }

  return (
    <>
      <div data-testid="message-tools" className={`message-tools ${msgToolsPositionY === "T" ? "to-top" : "to-bottom"} ${msgToolsPositionX === "L" ? "to-left" : "to-right"}`} style={{ display: visibiltyStyle }}>
        <ul>
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
        </ul>
      </div>
      {isAlertVisible && <div className="message-copied-pop">Copied to clipboard</div>}
    </>
  )
}

export default MessageTools
