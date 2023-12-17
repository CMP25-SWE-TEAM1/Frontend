const InfoNoChat = (props) => {
  const handleComposeModalOpen = props.handleComposeModalOpen
  return (
    <div className="info no-chat">
      <div className="title">Welcome to your inbox!</div>
      <div className="text">Drop a line, share posts and more with private conversations between you and others on X.</div>
      <a
        href="/messages/compose"
        onClick={(event) => {
          event.preventDefault()
          handleComposeModalOpen()
        }}
      >
        Write a message
      </a>
    </div>
  )
}

export default InfoNoChat
