import { Link } from "react-router-dom"

/**
 * Renders a DetailsNoChat component with the given props when user has no chat opened.
 * @param {Object} props - the props passed to the component
 * @param {Function} props.handleComposeModalOpen - a function to handle opening the compose modal
 * @return {JSX.Element} the rendered component
 */
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
