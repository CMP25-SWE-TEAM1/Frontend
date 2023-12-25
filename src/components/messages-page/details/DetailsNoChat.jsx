import { Link } from "react-router-dom"

const DetailsNoChat = (props) => {
  const handleComposeModalOpen = props.handleComposeModalOpen
  return (
    <div className="details no-chat">
      <div className="content">
        <div className="info">
          <div className="title">Select a message</div>
          <div className="text">Choose from your existing conversations, start a new one, or just keep swimming.</div>
          <Link
            to="/messages/compose"
            onClick={(event) => {
              handleComposeModalOpen()
            }}
          >
            New message
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DetailsNoChat
