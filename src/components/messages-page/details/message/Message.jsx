import { useState, useRef } from "react"
import MessageTools from "./MessageTools"

const Message = (props) => {
  const msgToolsRef = useRef(null)
  const [msgToolsPosition, setMsgToolsPosition] = useState("T")
  const [msgToolsVisibile, setMsgToolsVisibile] = useState(false)
  const [msgToolsVisibiltyStyle, setMsgToolsVisibiltyStyle] = useState("none")
  const handleMsgToolsVisibilty = () => {
    setMsgToolsVisibile(!msgToolsVisibile)
    const rectMsgTools = msgToolsRef.current.getBoundingClientRect()
    if (rectMsgTools.bottom >= window.innerHeight - rectMsgTools.bottom) setMsgToolsPosition("T")
    else setMsgToolsPosition("B")
    msgToolsVisibile ? setMsgToolsVisibiltyStyle("block") : setMsgToolsVisibiltyStyle("none")
  }
  const messageText = props.messageText
  const messageMedia = props.messageMedia
  const mediaType = props.mediaType
  const deleteMessage = props.deleteMessage
  const messageId = props.messageId
  const messageMeta = props.messageMeta

  const formattedDate = new Date(messageMeta).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  const [gifPaused, setGifPaused] = useState(false)
  const gifRef = useRef(null)
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
    <div className={`message ${props.direction === "R" ? "right" : "left"}`}>
      {/* Message-content */}
      <div className="message-content">
        {/* Message-text + Message-interact */}
        <div className="message-box">
          <div className="message-data">
            {/* Message image OR GIF */}
            {messageMedia && (
              <div className="message-media">
                {mediaType === "Img" && <img src={messageMedia} alt="attachment" />}
                {/* {mediaType === "GIF" && <video src="{messageMedia}" alt="attachment" type="video/mp4" preload="auto"></video>} */}
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
            {/* <div className="message-react" title="React">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M17 12v3h-2.998v2h3v3h2v-3h3v-2h-3.001v-3H17zm-5 6.839c-3.871-2.34-6.053-4.639-7.127-6.609-1.112-2.04-1.031-3.7-.479-4.82.561-1.13 1.667-1.84 2.91-1.91 1.222-.06 2.68.51 3.892 2.16l.806 1.09.805-1.09c1.211-1.65 2.668-2.22 3.89-2.16 1.242.07 2.347.78 2.908 1.91.334.677.49 1.554.321 2.59h2.011c.153-1.283-.039-2.469-.539-3.48-.887-1.79-2.647-2.91-4.601-3.01-1.65-.09-3.367.56-4.796 2.01-1.43-1.45-3.147-2.1-4.798-2.01-1.954.1-3.714 1.22-4.601 3.01-.896 1.81-.846 4.17.514 6.67 1.353 2.48 4.003 5.12 8.382 7.67l.502.299v-2.32z"></path>
                </g>
              </svg>
            </div> */}
            <div style={{ position: "relative" }}>
              <div
                className="giga-bglock"
                onClick={() => {
                  handleMsgToolsVisibilty()
                }}
                style={{ display: msgToolsVisibiltyStyle }}
              ></div>
              <MessageTools messageMedia={messageMedia} messageText={messageText} hideMsgTools={handleMsgToolsVisibilty} msgToolsPosition={msgToolsPosition} visibiltyStyle={msgToolsVisibiltyStyle} deleteMessage={deleteMessage} messageId={messageId} />
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
      <div className="message-meta">
        <span>{formattedDate}</span>
      </div>
    </div>
  )
}

export default Message
