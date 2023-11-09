const DetailsChat = () => {
  return (
    <div className="details chat">
      <div className="content">
        <div className="head" style={{ backgroundColor: "green", zIndex: "2" }}>
          <div>
            <a href="#/username">
              <img src={require("../../../assets/imgs/profile-pic.jpg")} alt="profile img" />
            </a>
            <h2>Mickey</h2>
          </div>
          <a href="/info" title="Details">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
              </g>
            </svg>
          </a>
        </div>
        {false && (
          <div className="body not-allowed">
            <div>You cannot message this user because you are not verified.</div>
          </div>
        )}
        {true && (
          // User info + Messages + Keyboard
          <div className="body allowed" style={{ height: "calc(100vh - 53px)", backgroundColor: "blue" }}>
            {/* User info + Messages */}
            <div className="info" style={{ paddingTop: "53px", marginTop: "-53px", height: "calc(100vh - 55px)", overflowY: "auto", scrollBehavior: "smooth" }}>
              {/* User info + Messages */}
              <div style={{ height: "1200px", paddingLeft: "16px", paddingRight: "16px" }}>
                {/* User info */}
                <div style={{ cursor: "pointer", borderBottom: "1px solid #eee", textAlign: "center", color: "yellow", backgroundColor: "black", height: "340px", padding: "20px 16px", marginBottom: "16px", display: "flex", flexDirection: "column" }}></div>
                {/* Messages */}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
            </div>
            <div className="keyboard" style={{ height: "55px", backgroundColor: "red", textAlign: "center" }}>
              Start a new message
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsChat
