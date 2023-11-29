import { useNavigate } from "react-router-dom"
import Message from "./message/Message"
import MessageInput from "./message/MessageInput"
import { useState, useRef } from "react"
import { useEffect } from "react"

const DetailsChat = () => {
  const one = true
  const two = true
  const navigate = useNavigate()
  // scroll to bottom button
  const endOfChat = useRef(null)
  useEffect(() => {
    scrollToBottom()
  }, [])
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
  const [messages, setMessages] = useState([])
  const handleSendMessage = (message) => {
    // TODO:send message
    console.log("Sent message:", message)
    // Add message to the chat
    setMessages([...messages, message])
    scrollToBottom()
    // Send message in BackEnd
  }

  return (
    <div className="details chat">
      <div className="content">
        <div className="head">
          <div>
            <a href="#/username">
              <img src={require("../../../assets/imgs/profile-pic-2.jpg")} alt="profile img" />
            </a>
            <h2>Mickey Mouse</h2>
          </div>
          <a href="/info" title="Details">
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
                  <div className="contact-info" onClick={() => navigate("#/username")}>
                    {/* Image */}
                    <div className="image">
                      <img src={require("../../../assets/imgs/profile-pic-2.jpg")} alt="profile img" />
                    </div>
                    {/* Name + contact name */}
                    <div className="contact-data">
                      <a href="#/username">Mickey Mouse</a>
                      <a href="#/username">@MickeyMouseEG</a>
                    </div>
                    {/* Bio */}
                    <div className="contact-bio">The Official Mickey Mouse - Egypt Account</div>
                    {/* Info 1 (Joined + No. of followers) */}
                    <div className="contact-xdata-1">Joined January 2011 · 268.8K Followers</div>
                    {/* Info 2 (common followers) */}
                    <div className="contact-xdata-2">Not followed by anyone you're following</div>
                  </div>
                  {/* Messages */}
                  <div className="messages">
                    <Message direction="R" messageMedia="https://www.harrisburgu.edu/wp-content/uploads/189dce017fb19e3ca1b94b2095d519cc514df22c.jpg" messageText="First message for me 👋" />
                    <Message direction="L" messageMedia="https://assetsio.reedpopcdn.com/Rocket-League-(header-suggestion).jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp" messageText="Me too 😄" />
                    <Message direction="L" messageMedia="https://assetsio.reedpopcdn.com/Rocket-League-(header-suggestion).jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp" />
                    <Message direction="L" messageText="Another one 😄" />
                    <Message direction="R" messageText="Read next carefully 😈😈" />
                    <Message
                      direction="R"
                      messageMedia="https://m.media-amazon.com/images/M/MV5BMTQ2NDg4MDA2MV5BMl5BanBnXkFtZTgwNzQxOTQ1MjE@._V1_.jpg"
                      messageText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <Message direction="L" messageText="No.. no.. no.. nooooooooo" messageMedia="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZdiKSL5gDE0kpxefsDYrhJ8_9vSlcLxymvtq2L8iQkdiLhSh0f9gVvwAqYVIhHfAN90&usqp=CAU" />
                    {messages.map((msg) => (
                      <Message direction="R" messageText={msg} />
                    ))}
                  </div>
                  <div ref={endOfChat}></div>
                </div>
              )}
              <div className={`chat-scroll-down ${chatBtnDwnAppear ? "" : "hide"}`}>
                {/* Note: onClick console error */}
                <div onClick={() => handleBackToBottom}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
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
