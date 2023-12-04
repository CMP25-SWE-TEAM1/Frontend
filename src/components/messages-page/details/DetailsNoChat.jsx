const DetailsNoChat = () => {
    return ( 
        <div className="details no-chat">
            <div className="content">
                <div className="info">
                    <div className="title">Select a message</div>
                    <div className="text">Choose from your existing conversations, start a new one, or just keep swimming.</div>
                    <a href="/messages/compose">New message</a>
                </div> 
            </div>
        </div>
     );
}
 
export default DetailsNoChat;