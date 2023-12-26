// Components
import Message from "./message/Message"
import MessageInput from "./message/MessageInput"
// MUI
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
// Const
import * as DataInit from "../constants/MessagesInit"
import { SOCKET_ON, BACKEND_ON } from "../constants/MessagesConstants"
// Hooks
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import useGetChat from "../customHooks/get/useGetChat"
import debounce from "lodash.debounce"
// Redux
import { useDispatch, useSelector } from "react-redux"
import { selectSocket } from "../../../store/SocketSlice"

const DetailsChat = (props) => {
  // ==============  Props   ==============
  const handleNavNewMessage = props.handleNavNewMessage
  const contact = props.contact
  const changeContactBlock = props.changeContactBlock

  // ==============  Redux   ==============
  // User
  const userToken = useSelector((state) => state.user.token)
  // Socket
  const socket = useSelector(selectSocket)

  // ==============  Data   ==============
  let chatPage = 1
  const one = true
  const two = true

  const [messagesData, setMessagesData] = useState(DataInit.DetailsChat_messages)
  const [chatBtnDwnAppear, setChatBtnDwnAppear] = useState(false)
  const [scrollToBottomFlag, setScrollToBottomFlag] = useState(false)
  // Message not sent!
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertVTimeOut, setAlertVTimeOut] = useState(null)
  const [alertTxt, setAlertTxt] = useState("")
  // unseen
  const [myLastMessageTime, setMyLastMessageTime] = useState(0)
  // Ref
  const endOfChat = useRef(null)
  const startOfUnseenChat = useRef(null)
  const componentRef = useRef()

  // ==============  Hooks   ==============
  // -------- Custom --------
  const handleGetChat = useGetChat
  const navigate = useNavigate()
  // -------- useEffect --------
  // fetch chat messages
  useEffect(() => {
    if (BACKEND_ON) {
      setMessagesData([])
      function fetchChatMessages() {
        console.log("fetching page", chatPage)
        handleGetChat(contact.id, userToken, chatPage).then((response) => {
          if (response && response.data) {
            const newChat = response.data.map((message) => ({
              id: message._id,
              messageText: message.description,
              messageMedia: message.media && message.media.link ? message.media.link : undefined,
              mediaType: message.media && message.media.type ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
              direction: message.mine ? "R" : "L",
              seen: message.seen,
              time: message.sendTime,
            }))
            setMessagesData((prevChat) => [...newChat, ...prevChat])
            if (response.data.length !== 0) chatPage++
            console.log("fetch another chat page? ", response.data && response.data.length !== 0 && response.data[0].seen === false)
            if (response.data && response.data.length !== 0 && response.data[0].seen === false) {
              // 5-second - Plz no infinite again :(
              // setTimeout(() => {
              fetchChatMessages()
              // }, 5000)
            }
          }
        })
      }

      // initial fetch
      fetchChatMessages()
    }
    messagesData.filter((msg) => msg.seen === false && msg.time > myLastMessageTime).length !== 0 ? scrollToLastSeen() : scrollToBottom()
  }, [chatPage, contact.id, handleGetChat, userToken])
  // Scroll to bottom (with new messages)
  useEffect(() => {
    if (scrollToBottomFlag) scrollToBottom()
  }, [messagesData, scrollToBottomFlag])
  // Connect to Socket.io
  useEffect(() => {
    if (SOCKET_ON) {
      const receiveMessageHandler = (data) => {
        // Update chat
        if (data.chat_ID === contact.id) {
          console.log("received_message:", data)
          // setScrollToBottomFlag(true)

          const message = data.message

          setMessagesData((prevMessagesData) => [
            ...prevMessagesData,
            {
              id: message._id,
              messageText: message.description,
              messageMedia: message.media && message.media.link ? message.media.link : undefined,
              mediaType: message.media && message.media.type ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
              direction: message.mine ? "R" : "L",
              seen: message.seen,
              time: message.sendTime,
            },
          ])
        }
      }

      const failedToSendMessageHandler = (response) => {
        setAlertTxt(response.error)
        handleFailedMessage()
        changeContactBlock(contact.id)
      }

      socket.on("receive_message", receiveMessageHandler)
      socket.on("failed_to_send_message", failedToSendMessageHandler)

      return () => {
        socket.off("receive_message", receiveMessageHandler)
        socket.off("failed_to_send_message", failedToSendMessageHandler)
      }
    }
  }, [socket, messagesData, contact.id])
  // Unseen messages
  useEffect(() => {
    const reversedMessages = [...messagesData].reverse()
    const myLastMessage = reversedMessages.find((message) => message.direction === "R")
    if (myLastMessage) {
      setMyLastMessageTime(myLastMessage.time)
    }
  }, [messagesData])
  // Fetch on scroll
  useEffect(() => {
    const component = componentRef.current

    const handleScrollFetch = debounce(() => {
      const scrolledHeight = component.scrollTop

      if (scrolledHeight <= 50) {
        if (BACKEND_ON) {
          console.log("fetching page", chatPage)
          handleGetChat(contact.id, userToken, chatPage).then((response) => {
            if (response && response.data) {
              const newChat = response.data.map((message) => ({
                id: message._id,
                messageText: message.description,
                messageMedia: message.media && message.media.link ? message.media.link : undefined,
                mediaType: message.media && message.media.type ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
                direction: message.mine ? "R" : "L",
                seen: message.seen,
                time: message.sendTime,
              }))
              setMessagesData((prevChat) => [...newChat, ...prevChat])
              if (response.data.length !== 0) chatPage++
            }
          })
        }
      }
    }, 300)

    component.addEventListener("scroll", handleScrollFetch)

    return () => {
      component.removeEventListener("scroll", handleScrollFetch)
      handleScrollFetch.cancel()
    }
  }, [chatPage, contact.id, handleGetChat, userToken])

  // ==============  Functions   ==============
  // scroll to bottom button
  const scrollToBottom = () => {
    console.log("Bottom Scrolling")
    // endOfChat?.current?.scrollIntoView({ behavior: "smooth" })
    endOfChat?.current?.scrollIntoView()
  }
  const scrollToLastSeen = () => {
    console.log("LastSeen Scrolling")
    if (startOfUnseenChat?.current) {
      const windowHeight = window.innerHeight
      const elementHeight = startOfUnseenChat.current.offsetHeight

      // Calculate the offset to position the element at the mid height of the window
      const offset = Math.max(0, (elementHeight - windowHeight) / 2)

      // Use scrollIntoView with options
      startOfUnseenChat.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // Scroll the element to the center of the view
        inline: "nearest", // Keep the element aligned to the nearest edge
        offset: { top: offset },
      })
    }
  }
  const handleBackToBottom = () => {
    if (chatBtnDwnAppear) scrollToBottom()
  }
  const handleChatScrlBtn = (event) => {
    event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= event.currentTarget.clientHeight + 44 ? setChatBtnDwnAppear(false) : setChatBtnDwnAppear(true)
  }
  const handleSendMessage = (messageText, messageMedia, messageMediaType) => {
    setScrollToBottomFlag(true)
    const message = { messageText, messageMedia, messageMediaType }
    if (SOCKET_ON) sendMessage_toServer(message)
  }

  // Send message to socket sercer
  const sendMessage_toServer = (message) => {
    console.log("message sending...", message)
    console.log("sending to...", contact.id)
    socket.emit("send_message", {
      reciever_ID: contact.id,
      data: {
        ...(message.messageText && { text: message.messageText }),
        ...(message.messageMedia && {
          media: {
            link: message.messageMedia,
            type: message.messageMediaType === "GIF" ? "video" : "image",
          },
        }),
      },
    })
  }
  const handleMessageMetaCheck = (message, nextMessage) => {
    if (!nextMessage || message.direction !== nextMessage.direction) return true
    else {
      const messageDate = new Date(message.time)
      const nextMessageDate = new Date(nextMessage.time)

      const timeDiff = (nextMessageDate - messageDate) / 1000
      return timeDiff >= 60
    }
  }
  const handleFailedMessage = () => {
    clearTimeout(alertVTimeOut)
    setIsAlertVisible(true)
    setAlertVTimeOut(
      setTimeout(() => {
        setIsAlertVisible(false)
      }, 2250)
    )
  }

  return (
    <div className="details chat">
      <div className="content">
        <div className="head">
          <div>
            <Link to={`/${contact.userName}`}>
              <img src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} alt="profile img" />
            </Link>
            <h2>{contact.name || "Hamza"}</h2>
          </div>
        </div>
        {!one && (
          <div className="body not-allowed">
            <div>You cannot message this user because you are not verified.</div>
          </div>
        )}
        {one && (
          // User info + Messages + Keyboard
          <div className="body allowed">
            {/* User info + Messages */}
            <>
              <div className="chatbox" onScroll={handleChatScrlBtn} ref={componentRef}>
                {/* (Only If there is messages, show it) User info + Messages */}
                {two && (
                  <div className="chatbox-content">
                    {/* User info */}
                    <div className="contact-info" onClick={() => navigate(`/${contact.userName || "username"}`)}>
                      {/* Image */}
                      <div className="image">
                        <img src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} alt="profile img" />
                      </div>
                      {/* Name + contact name */}
                      <div className="contact-data">
                        <Link to={`/${contact.userName}`}>{contact.name || "Hamza"}</Link>
                        <Link to={`/${contact.userName}`}>@{contact.userName || "hamza_xyz"}</Link>
                      </div>
                    </div>
                    {/* Messages */}
                    <div className="messages">
                      {messagesData
                        .filter((msg) => msg.seen === true || msg.time <= myLastMessageTime)
                        .map((msg, index, array) => {
                          const nextMsg = index < array.length - 1 ? array[index + 1] : null
                          const withMeta = handleMessageMetaCheck(msg, nextMsg)
                          return <Message messageMeta={withMeta ? msg.time : undefined} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} />
                        })}
                      {messagesData.filter((msg) => msg.seen === false && msg.time > myLastMessageTime).length !== 0 && (
                        <Divider sx={{ marginBottom: "24px" }} ref={startOfUnseenChat}>
                          <Chip label="unread messages" />
                        </Divider>
                      )}
                      {messagesData
                        .filter((msg) => msg.seen === false && msg.time > myLastMessageTime)
                        .map((msg, index, array) => {
                          const nextMsg = index < array.length - 1 ? array[index + 1] : null
                          const withMeta = handleMessageMetaCheck(msg, nextMsg)
                          return <Message messageMeta={withMeta ? msg.time : undefined} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} />
                        })}
                    </div>
                    {contact.isBlocked && <div className="blocked-text">You can no longer send messages to this person.</div>}
                    <div ref={endOfChat}></div>
                  </div>
                )}
                <div className={`chat-scroll-down ${chatBtnDwnAppear ? "" : "hide"}`}>
                  {/* Note: onClick console error */}
                  <div onClick={() => handleBackToBottom()}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: "#1D9BF0" }}>
                      <g>
                        <path d="M13 3v13.59l5.043-5.05 1.414 1.42L12 20.41l-7.457-7.45 1.414-1.42L11 16.59V3h2z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {!contact.isBlocked && <MessageInput handleSendMessage={handleSendMessage} />}
            </>
          </div>
        )}
      </div>
      {isAlertVisible && <div className="send-msg-fail-pop">{alertTxt}</div>}
    </div>
  )
}

export default DetailsChat
