import { Link } from "react-router-dom"

const InfoNoChat = (props) => {
  const handleComposeModalOpen = props.handleComposeModalOpen
  return (
    <div className="info no-chat">
      <div className="title">Welcome to your inbox!</div>
      <div className="text">Drop a line, share posts and more with private conversations between you and others on X.</div>
      <Link
        to="/messages/compose"
        onClick={(event) => {
          handleComposeModalOpen()
        }}
      >
        Write a message
      </Link>
    </div>
  )
}

export default InfoNoChat
