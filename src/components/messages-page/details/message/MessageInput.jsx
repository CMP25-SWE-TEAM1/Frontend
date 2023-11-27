const MessageInput = () => {
  return (
    <div className="keyboard">
      <div className="content" style={{ borderRadius: "16px", backgroundColor: "rgba(239,243,244,1.00)", padding: "4px", margin: "7px 12px 4px", display: "flex", alignItems: "center", flexDirection: "row" }}>
        <div className="icons" style={{ marginRight: "4px", display: "flex", flexDirection: "row" }}>
          <div className="media-icon" style={{ width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: "rgb(255, 0, 0)" }}>
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
          <div className="gif-icon" style={{ width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: "rgb(255, 0, 0)" }}>
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
          <div className="emoji-icon" style={{ width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: "rgb(255, 0, 0)" }}>
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="message-text" style={{ fontWeight: "300", fontSize: "15px", padding: "4px 12px", flex: "1" }}>
          <div placeholder="Start a new message" role="textbox" contentEditable style={{ maxWidth: "391px", minHeight: "24px", maxHeight: "160px", overflowY: "auto" }}></div>
        </div>
        <div className="send-message" style={{ marginLeft: "4px", borderBottomLeftRadius: "9999px", borderTopLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopRightRadius: "9999px" }}>
          <div className="send-icon" style={{ width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color: "rgb(255, 0, 0)" }}>
              <g>
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
              </g>
            </svg>
          </div>
        </div>
        {/* Left icons (Media - GIF - Emoji) */}
        {/* Message text */}
        {/* Send icon */}
      </div>
      {/* <form action="">
        <textarea name="" id="" placeholder="Start a new message"></textarea>
      </form> */}
    </div>
  )
}

export default MessageInput
