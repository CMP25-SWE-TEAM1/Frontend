import { useNavigate } from "react-router-dom"
import Message from "./message/Message"
import MessageInput from "./message/MessageInput"
import { useState, useEffect, useRef } from "react"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"

import IconButton from "@mui/material/IconButton"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"

import useGetChat from "../customHooks/get/useGetChat"
import * as DataInit from "../constants/MessagesInit"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import CheckIcon from "@mui/icons-material/Check"

// Socket.io
import { SOCKET_ON, BACKEND_ON } from "../constants/MessagesConstants"
import { useDispatch, useSelector } from "react-redux"
import { selectSocket } from "../../../store/SocketSlice"

const DetailsChat = (props) => {
  const userToken = useSelector((state) => state.user.token)
  const [messagesData, setMessagesData] = useState(DataInit.DetailsChat_messages)
  const handleNavNewMessage = props.handleNavNewMessage

  const dispatch = useDispatch()
  const socket = useSelector(selectSocket)

  const contact = props.contact
  const changeContactBlock = props.changeContactBlock
  const handleGetChat = useGetChat

  const one = true
  const two = true
  const navigate = useNavigate()
  // Messages mapping
  // const [msgData, setMsgData] = useState(
  // )
  // scroll to bottom button
  const endOfChat = useRef(null)
  const startOfUnseenChat = useRef(null)

  let chatPage = 1
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

            chatPage++
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
    scrollToBottom()
    // scrollToLastSeen()
    // setScrollToBottomFlag(true)
  }, [chatPage, contact.id, handleGetChat, userToken])
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
  const [chatBtnDwnAppear, setChatBtnDwnAppear] = useState(false)
  const handleChatScrlBtn = (event) => {
    event.currentTarget.scrollHeight - event.currentTarget.scrollTop <= event.currentTarget.clientHeight + 44 ? setChatBtnDwnAppear(false) : setChatBtnDwnAppear(true)
  }
  const handleSendMessage = (messageText, messageMedia, messageMediaType) => {
    setScrollToBottomFlag(true)
    // TODO:send message
    // console.log("Sent message:", messageText)
    // Add message to the chat
    // setMessagesData([...messagesData, { id: msgIdCounterS, direction: "R", messageText, messageMedia, mediaType: messageMediaType }])
    // setMsgIdCounterS(msgIdCounterS + 1)
    // scrollToBottom()
    // Send message in BackEnd
    const message = { messageText, messageMedia, messageMediaType }
    // console.log("message will be sent", message)
    if (SOCKET_ON) sendMessage_toServer(message)
  }
  const handleDeleteMsg = (msgId) => {
    setScrollToBottomFlag(false)
    let newMessagesData = messagesData.filter((msg) => msg.id !== msgId)
    setMessagesData(newMessagesData)
  }

  // Scroll to bottom (with new messages)
  const [scrollToBottomFlag, setScrollToBottomFlag] = useState(true)
  useEffect(() => {
    if (scrollToBottomFlag) scrollToBottom()
  }, [messagesData, scrollToBottomFlag])

  // Connect to Socket.io
  useEffect(() => {
    if (SOCKET_ON) {
      socket.on("receive_message", (data) => {
        // Update chat
        if (data.chat_ID == contact.id) {
          console.log("received_message:", data)
          setScrollToBottomFlag(true)
          // console.log(data)
          const message = data.message

          setMessagesData([
            ...messagesData,
            {
              id: message._id,
              messageText: message.description,
              // Need some update
              messageMedia: message.media && message.media.link ? message.media.link : undefined,
              mediaType: message.media && message.media.type ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
              direction: message.mine ? "R" : "L",
              // not handled yet! (in FE ): )
              seen: message.seen,
              time: message.sendTime,
            },
          ])
          // setMessagesData([...messagesData, { id: msgIdCounterS, messageText: message.messageText, messageMedia: message.messageMedia, mediaType: message.messageMediaType }])
          // setMsgIdCounterS(msgIdCounterS + 1)
          // scrollToBottom()
        }
      })
      socket.on("failed_to_send_message", (response) => {
        // console.log(response.error)
        setAlertTxt(response.error)
        handleFailedMessage()
        changeContactBlock(contact.id)
      })
    }
  }, [socket, messagesData, contact.id])
  // Send message to socket sercer
  const sendMessage_toServer = (message) => {
    console.log("message sending...", message)
    console.log("sending to...", contact.id)
    // console.log(contact.id)
    // console.log(typeof contact.id)
    socket.emit("send_message", {
      //  sender_ID:
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
  // Handle get chat of specific user
  const [infoVisible, setInfoVisible] = useState(false)
  const [isFollowBtnHovered, setIsFollowBtnHovered] = useState(false)

  // Message not sent!
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertVTimeOut, setAlertVTimeOut] = useState(null)
  const [alertTxt, setAlertTxt] = useState("")

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
            {!infoVisible && (
              <>
                <a href="#/username">
                  <img src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} alt="profile img" />
                </a>
                <h2>{contact.name || "Hamza"}</h2>
              </>
            )}
            {infoVisible && (
              <>
                <IconButton
                  sx={{ marginRight: "15px" }}
                  aria-label="back"
                  onClick={() => {
                    setInfoVisible(!infoVisible)
                  }}
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
                <h2>Conversation info</h2>
              </>
            )}
          </div>
          {!infoVisible && (
            <a
              href="/info"
              title="Details"
              id="mahmoud_info"
              onClick={(event) => {
                event.preventDefault()
                setInfoVisible(!infoVisible)
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
                </g>
              </svg>
            </a>
          )}
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
            {!infoVisible && (
              <>
                <div className="chatbox" onScroll={handleChatScrlBtn}>
                  {/* (Only If there is messages, show it) User info + Messages */}
                  {two && (
                    <div className="chatbox-content">
                      {/* User info */}
                      <div className="contact-info" onClick={() => navigate(`#/${contact.userName || "username"}`)}>
                        {/* Image */}
                        <div className="image">
                          <img src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} alt="profile img" />
                        </div>
                        {/* Name + contact name */}
                        <div className="contact-data">
                          <a href="#/username">{contact.name || "Hamza"}</a>
                          <a href="#/username">@{contact.userName || "hamza_xyz"}</a>
                        </div>
                        {/* Bio */}
                        <div className="contact-bio">{contact.bio || "I am the real batman"}</div>
                        {/* Info 1 (Joined + No. of followers) */}
                        <div className="contact-xdata-1">Joined January 2011 · {contact.followers_num || "268.8K"} Followers</div>
                        {/* Info 2 (common followers) */}
                        <div className="contact-xdata-2">Not followed by anyone you're following</div>
                      </div>
                      {/* Messages */}
                      <div className="messages">
                        {messagesData
                          .filter((msg) => msg.seen === true)
                          .map((msg, index, array) => {
                            const nextMsg = index < array.length - 1 ? array[index + 1] : null
                            const withMeta = handleMessageMetaCheck(msg, nextMsg)
                            return <Message messageMeta={withMeta ? msg.time : undefined} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} deleteMessage={handleDeleteMsg} />
                          })}
                        {messagesData.filter((msg) => msg.seen === false).length !== 0 && (
                          <Divider sx={{ marginBottom: "24px" }} ref={startOfUnseenChat}>
                            <Chip label="unread messages" />
                          </Divider>
                        )}
                        {messagesData
                          .filter((msg) => msg.seen === false)
                          .map((msg, index, array) => {
                            const nextMsg = index < array.length - 1 ? array[index + 1] : null
                            const withMeta = handleMessageMetaCheck(msg, nextMsg)
                            return <Message messageMeta={withMeta ? msg.time : undefined} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} deleteMessage={handleDeleteMsg} />
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
            )}
            {infoVisible && (
              <List dense={false}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // go to contact profile page
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={contact.name} src={contact.avatarLink} />
                    </ListItemAvatar>
                    <ListItemText primary={contact.name} secondary={`@${contact.userName}`} />

                    <ListItemIcon>
                      <button
                        className={`change-follow${contact.isBlocked ? " blocked" : contact.isFollowed ? " followed" : ""}`}
                        onMouseEnter={() => {
                          setIsFollowBtnHovered(true)
                        }}
                        onMouseLeave={() => {
                          setIsFollowBtnHovered(false)
                        }}
                        onClick={() => {
                          // follow or unfollow
                          console.log("isFollowed? ", contact.isFollowed)
                        }}
                      >
                        {contact.isBlocked ? (isFollowBtnHovered ? "Unblock" : "Blocked") : contact.isFollowed ? (isFollowBtnHovered ? "Unfollow" : "Following") : "Follow"}
                      </button>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // block / unblock user
                    }}
                    style={{
                      fontSize: "15px",
                      justifyContent: "center",
                      minHeight: "70px",
                    }}
                  >
                    {contact.isBlocked ? "Unblock" : "Block"} @{contact.userName}
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </div>
        )}
      </div>
      {isAlertVisible && <div className="send-msg-fail-pop">{alertTxt}</div>}
    </div>
  )
}

export default DetailsChat
