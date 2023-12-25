// Style
import "./messages.css"
import InfoChat from "./navigation/InfoChat"
import InfoNoChat from "./navigation/InfoNoChat"
// Components
import MessageCompose from "./compose/MessageCompose"
import DetailsChat from "./details/DetailsChat"
import DetailsNoChat from "./details/DetailsNoChat"
// MUI
// Const
import { BACKEND_ON, SOCKET_ON } from "./constants/MessagesConstants"
// Hooks
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useGetContacts from "./customHooks/get/useGetContacts"
// Functions
import { initializeSocket } from "./customHooks/socketService"
// Redux
import { selectSocket } from "../../store/SocketSlice"
import { useDispatch, useSelector } from "react-redux"
import { setSocket } from "../../store/SocketSlice"
import { Link } from "react-router-dom"

const Messages = (props) => {
  // ==============  Props   ==============
  const { contactId: paramContactId } = useParams()
  // Compose message
  const composeModalOpen = props.composeModalOpen
  const handleComposeModalOpen = props.handleComposeModalOpen
  const handleComposeModalClose = props.handleComposeModalClose

  // ==============  Redux   ==============
  const dispatch = useDispatch()
  // Color Theme
  const darkMode = useSelector((state) => state.theme.darkMode)
  // User
  const userToken = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user)
  // Socket
  const socket = useSelector(selectSocket)

  // ==============  Data   ==============
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(paramContactId)

  // ==============  Hooks   ==============
  const navigate = useNavigate()
  // -------- useEffect --------
  // Initialize socket and store it
  useEffect(() => {
    const socket = initializeSocket(userToken)
    dispatch(setSocket(socket))
  }, [dispatch, userToken])
  // Sockets listen events
  useEffect(() => {
    if (SOCKET_ON && socket) {
      const receiveMessageHandler = (data) => {
        // Update nav
        handleNavNewMessage(data.chat_ID, data.message)
      }

      socket.on("receive_message", receiveMessageHandler)

      return () => {
        socket.off("receive_message", receiveMessageHandler)
      }
    }
  }, [socket])

  // Fetch data
  useEffect(() => {
    if (BACKEND_ON) {
      handleGetContacts(userToken).then((response) => {
        // console.log("userToken",userToken)
        console.log("GetContacts response", response)
        if (response && response.data) {
          const newChats = response.data.map((chat) => ({
            id: chat.chat_members[0].id,
            userName: chat.chat_members[0].username,
            name: chat.chat_members[0].nickname,
            avatarLink: chat.chat_members[0].profile_image,

            isBlocked: chat.isBlocked,
            isFollowed: chat.isFollowed,

            lastMessage: chat.lastMessage.description,
            lastMessageMediaType: chat.lastMessage.media ? (chat.lastMessage.media.type === "image" ? "Img" : "GIF") : undefined,
            lastMessageDate: chat.lastMessage.sendTime,
            lastMessageSeen: chat.lastMessage.seen,
            lastMessageSender: chat.lastMessage.sender,
          }))
          setContacts(newChats)
        }
      })
    }
  }, [])
  // -------- Custom --------
  const handleGetContacts = useGetContacts

  // ==============  Functions   ==============
  const handleNavNewMessage = (chatId, message) => {
    const chatContact = contacts.filter((contact) => contact.id == chatId)[0]
    if (chatContact) {
      console.log("test 96")
      setContacts(
        contacts.map((contact) =>
          contact.id == chatId
            ? {
                ...contact,
                lastMessage: message.description,
                lastMessageMediaType: message.media ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
                lastMessageDate: message.sendTime,
                lastMessageSeen: message.mine ? true : false,
                lastMessageSender: message.mine ? user.user.username : contact.userName,
              }
            : contact
        )
      )
    } else {
      console.log("test 112")
      handleGetContacts(userToken).then((response) => {
        console.log("GetContacts response", response)
        const newChats = response.data.map((chat) => ({
          id: chat.chat_members[0].id,

          userName: chat.chat_members[0].username,
          name: chat.chat_members[0].nickname,
          avatarLink: chat.chat_members[0].profile_image,

          isBlocked: chat.isBlocked,
          isFollowed: chat.isFollowed,

          lastMessage: chat.lastMessage.description,
          lastMessageMediaType: chat.lastMessage.media ? (chat.lastMessage.media.type === "image" ? "Img" : "GIF") : undefined,
          lastMessageDate: chat.lastMessage.sendTime,
          lastMessageSeen: chat.lastMessage.seen,
          lastMessageSender: chat.lastMessage.sender,
        }))
        setContacts(newChats)
      })
    }
  }
  const handleSelectContact = (contactId) => {
    setSelectedContact(contactId)
    navigate(`/messages/${contactId}`)
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastMessageSeen: true,
            }
          : contact
      )
    )
  }
  const changeContactBlock = (contactId) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              isBlocked: !contact.isBlocked,
            }
          : contact
      )
    )
  }

  return (
    <>
      {/* <div className="sidebar">Sidebar</div> */}
      <div className={`messages-page ${darkMode ? "dark" : "light"}`}>
        <div className="navigation">
          <div className="header">
            <h2>Messages</h2>
            <div>
              <Link
                to="/messages/compose"
                onClick={(event) => {
                  handleComposeModalOpen()
                }}
                title="New message"
              >
                {/* Compose icon */}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
                  </g>
                </svg>
              </Link>
            </div>
          </div>
          {contacts.length === 0 && <InfoNoChat handleComposeModalOpen={handleComposeModalOpen} />}
          {contacts.length !== 0 && <InfoChat contacts={contacts} selectedContact={selectedContact} setSelectedContact={handleSelectContact} />}
        </div>
        {(!selectedContact || !contacts.filter((contact) => contact.id === selectedContact)[0]) && <DetailsNoChat handleComposeModalOpen={handleComposeModalOpen} />}
        {selectedContact && contacts.filter((contact) => contact.id === selectedContact)[0] && <DetailsChat contact={contacts.filter((contact) => contact.id === selectedContact)[0]} handleNavNewMessage={handleNavNewMessage} changeContactBlock={changeContactBlock} />}
      </div>

      <MessageCompose composeModalOpen={composeModalOpen} handleComposeModalClose={handleComposeModalClose} setSelectedContact={setSelectedContact} setContacts={setContacts} contacts={contacts} />
    </>
  )
}

export default Messages
