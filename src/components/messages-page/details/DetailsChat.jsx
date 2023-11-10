import { useNavigate } from "react-router-dom"
import Message from "./message/Message"

const DetailsChat = () => {
  const one = true;
  const two = true;
  const navigate = useNavigate()
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
            <div className="chatbox">
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
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                  </div>
                </div>
              )}
            </div>
            <div className="keyboard">Start a new message</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsChat
