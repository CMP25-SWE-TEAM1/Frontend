import { useNavigate } from "react-router-dom"
import Message from "./message/Message"
import MessageInput from "./message/MessageInput"
import { useState, useEffect, useRef } from "react"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"

import useGetChat from "../customHooks/get/useGetChat"
import * as DataInit from "../constants/MessagesInit"

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
  const handleGetChat = useGetChat
  const [chatPage, setChatPage] = useState(1)

  const one = true
  const two = true
  const navigate = useNavigate()
  // Messages mapping
  // const [msgData, setMsgData] = useState(
  // )
  // scroll to bottom button
  const endOfChat = useRef(null)
  const endOfSeenChat = useRef(null)

  useEffect(() => {
    if (BACKEND_ON) {
      console.log("chatPage", chatPage)
      handleGetChat(contact.id, userToken, chatPage).then((response) => {
        console.log("response", response)
        if (!response.data) setMessagesData([])
        else {
          const newChat = response.data.map((message) => ({
            id: message._id,
            messageText: message.description,
            // Need some update
            messageMedia: message.media && message.media.link ? message.media.link : undefined,
            mediaType: message.media && message.media.type ? (message.media.type === "image" ? "Img" : "GIF") : undefined,
            direction: message.mine ? "R" : "L",
            // not handled yet! (in FE ): )
            seen: message.seen,
            time: message.sendTime,
          }))
          setMessagesData(newChat)
          // setChatPage((prevChatPage) => prevChatPage + 1)

          // // Fetch messages until the user sees all unread messages
          // if (response.data && response.data.length !== 0 && response.data[0].seen === false) {
          //   const currentChatPage = chatPage // Capture the current value
          //   handleGetChat(contact.id, userToken, currentChatPage).then((response) => {
          //     console.log(`response of chatPage(${currentChatPage})`, response)
          //     setChatPage((prevChatPage) => prevChatPage + 1) // Update chatPage using the latest value
          //   })
          // }
        }
      })
    }
    scrollToBottom()
  }, [contact.id, handleGetChat])
  const scrollToBottom = () => {
    // endOfChat?.current?.scrollIntoView({ behavior: "smooth" })
    endOfChat?.current?.scrollIntoView()
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
        // Update nav
        handleNavNewMessage(data.chat_ID, data.message)
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

  // Handle get chat of specific user

  return (
    <div className="details chat">
      <div className="content">
        <div className="head">
          <div>
            <a href="#/username">
              <img src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} alt="profile img" />
            </a>
            <h2>{contact.name || "Hamza"}</h2>
          </div>
          <a href="/info" title="Details" id="mahmoud_info">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
              </g>
            </svg>
          </a>
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
                      .map((msg) => (
                        <Message messageMeta={msg.time} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} deleteMessage={handleDeleteMsg} />
                      ))}
                    {messagesData.filter((msg) => msg.seen === false).length !== 0 && (
                      <Divider sx={{ marginBottom: "24px" }}>
                        <Chip label="unread messages" />
                      </Divider>
                    )}
                    <div ref={endOfSeenChat}></div>
                    {messagesData
                      .filter((msg) => msg.seen === false)
                      .map((msg) => (
                        <Message messageMeta={msg.time} messageMedia={msg.messageMedia} mediaType={msg.mediaType} direction={msg.direction} messageText={msg.messageText} key={msg.id} messageId={msg.id} deleteMessage={handleDeleteMsg} />
                      ))}
                  </div>
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
            <MessageInput handleSendMessage={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsChat
