const MessageInput = () => {
  return (
    <div className="keyboard">
      <div className="content" style={{ borderRadius: "16px", backgroundColor: "rgba(239,243,244,1.00)", padding: "4px", margin: "7px 12px 4px", display: "flex", alignItems: "center", flexDirection: "row" }}>
        <div className="icons" style={{ marginRight: "4px", display: "flex", flexDirection: "row" }}>
          Icons
        </div>
        <div className="message-text" style={{ flex: "1", overflowY: "auto" }}>
          Start a new message Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem
          Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div className="send-icon" style={{ marginLeft: "4px", width: "32px", height: "32px", borderBottomLeftRadius: "9999px", borderTopLeftRadius: "9999px", borderBottomRightRadius: "9999px", borderTopRightRadius: "9999px" }}>
          Send
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
