// Components
import MessageTools from "./MessageTools"
// Hooks
import { useState, useRef } from "react"

/**
 * Renders a message component with the given props.
 *
 * @param {object} props - The props object containing the messageId, messageText, messageMedia, messageMeta, mediaType, and messageDirection.
 * @return {JSX.Element} The rendered message component.
 */
const Message = (props) => {
  // ==============  Props   ==============
  const messageId = props.messageId
  const messageText = props.messageText
  const messageMedia = props.messageMedia
  const messageMeta = props.messageMeta
  const mediaType = props.mediaType
  const messageDirection = props.direction

  // ==============  Data   ==============
  const msgToolsRef = useRef(null)
  const msgContentRef = useRef(null)
  const gifRef = useRef(null)

  const [msgToolsPositionY, setMsgToolsPositionY] = useState("T")
  const [msgToolsPositionX, setMsgToolsPositionX] = useState("T")
  const [msgToolsVisibile, setMsgToolsVisibile] = useState(false)
  const [msgToolsVisibiltyStyle, setMsgToolsVisibiltyStyle] = useState("none")

  const [gifPaused, setGifPaused] = useState(false)

  // ==============  Functions   ==============
  const handleMsgToolsVisibilty = () => {
    const rectMsgTools = msgToolsRef.current.getBoundingClientRect()
    const rectMsgContent = msgContentRef.current.getBoundingClientRect()
    // Top Bottom
    if (rectMsgTools.bottom >= window.innerHeight - rectMsgTools.bottom) setMsgToolsPositionY("T")
    else setMsgToolsPositionY("B")

    // Left Right
    if (messageDirection === "R") {
      if (rectMsgContent.right - rectMsgTools.left >= 180) setMsgToolsPositionX("R")
      else setMsgToolsPositionX("L")
    } else {
      if (rectMsgTools.right - rectMsgContent.left >= 180) setMsgToolsPositionX("L")
      else setMsgToolsPositionX("R")
    }

    !msgToolsVisibile ? setMsgToolsVisibiltyStyle("block") : setMsgToolsVisibiltyStyle("none")
    setMsgToolsVisibile(!msgToolsVisibile)
  }
  const getMessageTime = (messageTime) => {
    const messageDate = new Date(messageTime)
    const currentDate = new Date()

    const isSameDay = messageDate.getDate() === currentDate.getDate()
    const isYesterday = messageDate.getDate() === currentDate.getDate() - 1
    const isSameWeek = messageDate.getFullYear() === currentDate.getFullYear() && messageDate.getMonth() === currentDate.getMonth() && messageDate.getDate() >= currentDate.getDate() - currentDate.getDay()

    if (isSameDay) {
      return messageDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    } else if (isYesterday) {
      return `Yesterday, ${messageDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`
    } else if (isSameWeek) {
      return messageDate.toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    } else {
      return messageDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    }
  }
  const handleGIFPress = () => {
    if (!gifPaused) {
      gifRef.current.pause()
      setGifPaused(true)
    } else {
      gifRef.current.play()
      setGifPaused(false)
    }
  }

  // {/* [Message Received] Message-content + message-info */}
  return (
    <div className={`message ${messageDirection === "R" ? "right" : "left"}`} role="message">
      {/* Message-content */}
      <div className="message-content" ref={msgContentRef}>
        {/* Message-text + Message-interact */}
        <div className="message-box">
          <div className="message-data">
            {/* Message image OR GIF */}
            {messageMedia && (
              <div className="message-media">
                {mediaType === "Img" && <img src={messageMedia} alt="attachment" />}
                {mediaType === "GIF" && (
                  <div
                    className="message-media-gif"
                    onClick={() => {
                      setGifPaused(!gifPaused)
                      handleGIFPress()
                    }}
                  >
                    <div className="message-media-icons">
                      <div className="gif-play-btn">
                        {gifPaused && (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path d="M21 12L4 2v20l17-10z"></path>
                            </g>
                          </svg>
                        )}
                        {!gifPaused && (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path d="M4 2h5v20H4V2zm11 20h5V2h-5v20z"></path>
                            </g>
                          </svg>
                        )}
                      </div>
                      <div className="gif-notation">
                        <div dir="ltr">
                          <span>GIF</span>
                        </div>
                      </div>
                    </div>
                    <video ref={gifRef} src={messageMedia} loop autoPlay muted preload="auto" playsInline type="video/mp4"></video>
                  </div>
                )}
              </div>
            )}
            {/* Message Text */}
            {messageText && <div className="message-text">{messageText}</div>}
          </div>
          {/* Message Interaction */}
          <div className="message-interaction">
            <div style={{ position: "relative" }}>
              <div
                className="giga-bglock"
                onClick={() => {
                  handleMsgToolsVisibilty()
                }}
                style={{ display: msgToolsVisibiltyStyle }}
              ></div>
              <MessageTools messageMedia={messageMedia} messageText={messageText} hideMsgTools={handleMsgToolsVisibilty} msgToolsPositionX={msgToolsPositionX} msgToolsPositionY={msgToolsPositionY} visibiltyStyle={msgToolsVisibiltyStyle} messageId={messageId} />
              <div
                className="message-more"
                title="More"
                onClick={() => {
                  handleMsgToolsVisibilty()
                }}
                ref={msgToolsRef}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {messageMeta && (
        <div className="message-meta" role="message-metadata">
          <span>{getMessageTime(messageMeta)}</span>
        </div>
      )}
    </div>
  )
}

export default Message
