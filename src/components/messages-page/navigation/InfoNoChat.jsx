import { Link } from "react-router-dom"

/**
 * InfoNoChat component displays a welcome message and an invitation to compose a new message
 * when there are no existing chats in the Messages page.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.handleComposeModalOpen - Function to open the compose modal
 * @returns {JSX.Element} JSX element representing the InfoNoChat component
 */
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
