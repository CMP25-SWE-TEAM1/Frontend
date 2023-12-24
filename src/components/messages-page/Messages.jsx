import MessageCompose from "./compose/MessageCompose"
import DetailsChat from "./details/DetailsChat"
import DetailsNoChat from "./details/DetailsNoChat"
import "./messages.css"
import InfoChat from "./navigation/InfoChat"
import InfoNoChat from "./navigation/InfoNoChat"

import { useState, useEffect } from "react"

import { BACKEND_ON, SOCKET_ON } from "./constants/MessagesConstants"
import useGetContacts from "./customHooks/get/useGetContacts"
import { selectSocket } from "../../store/SocketSlice"
import { useDispatch, useSelector } from "react-redux"
import { initializeSocket } from "./customHooks/socketService"
import { setSocket } from "../../store/SocketSlice"
import * as DataInit from "./constants/MessagesInit"

const Messages = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const userToken = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)

  const [contacts, setContacts] = useState(DataInit.Messages_contacts)
  useEffect(() => {
    const socket = initializeSocket(userToken)
    dispatch(setSocket(socket))
  }, [dispatch, userToken])

  const handleGetContacts = useGetContacts

  const handleNavNewMessage = (chatId, message) => {
    const chatContact = contacts.filter((contact) => contact.id === chatId)[0]
    if (chatContact) {
      setContacts(
        contacts.map((contact) =>
          contact.id === chatId
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

  // Compose message
  const composeModalOpen = props.composeModalOpen
  const handleComposeModalOpen = props.handleComposeModalOpen
  const handleComposeModalClose = props.handleComposeModalClose

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

  const [selectedContact, setSelectedContact] = useState()
  const handleSelectContact = (contacId) => {
    setSelectedContact(contacId)
    setContacts(
      contacts.map((contact) =>
        contact.id === contacId
          ? {
              ...contact,
              lastMessageSeen: true,
            }
          : contact
      )
    )
  }

  // Sockets
  useEffect(() => {
    if (SOCKET_ON && socket) {
      socket.on("receive_message", (data) => {
        // Update nav
        handleNavNewMessage(data.chat_ID, data.message)
      })
    }
  }, [socket])

  return (
    <>
      {/* <div className="sidebar">Sidebar</div> */}
      <div className={`messages-page ${darkMode ? "dark" : "light"}`}>
        <div className="navigation">
          <div className="header">
            <h2>Messages</h2>
            <div>
              <a
                href="/messages/compose"
                onClick={(event) => {
                  event.preventDefault()
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
              </a>
            </div>
          </div>
          {contacts.length === 0 && <InfoNoChat handleComposeModalOpen={handleComposeModalOpen} />}
          {contacts.length !== 0 && <InfoChat contacts={contacts} selectedContact={selectedContact} setSelectedContact={handleSelectContact} />}
        </div>
        {(!selectedContact || !contacts.filter((contact) => contact.id === selectedContact)[0]) && <DetailsNoChat handleComposeModalOpen={handleComposeModalOpen} />}
        {selectedContact && contacts.filter((contact) => contact.id === selectedContact)[0] && <DetailsChat contact={contacts.filter((contact) => contact.id === selectedContact)[0]} handleNavNewMessage={handleNavNewMessage} />}
      </div>

      <MessageCompose composeModalOpen={composeModalOpen} handleComposeModalClose={handleComposeModalClose} setSelectedContact={setSelectedContact} setContacts={setContacts} contacts={contacts} />
    </>
  )
}

export default Messages
