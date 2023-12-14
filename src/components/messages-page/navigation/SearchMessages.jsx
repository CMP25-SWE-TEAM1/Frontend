import ListItem from "@mui/material/ListItem"
import EmailIcon from "@mui/icons-material/Email"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import HighlightedMessage from "./HighlightedMessage"

const SearchMessages = (props) => {
  const messages = props.messages
  const searchValue = props.searchValue
  const handleMessageSelect = props.handleMessageSelect
  const tabValue = props.tabValue
  return (
    <>
      {messages.filter((message) => message.text.toUpperCase().includes(searchValue.toUpperCase())).length !== 0 && (
        <>
          {tabValue === "all" && (
            <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div style={{ fontSize: "20px", fontWeight: "600" }}>
                <EmailIcon /> Messages
              </div>
            </ListItem>
          )}
          {messages
            .filter((message) => message.text.toUpperCase().includes(searchValue.toUpperCase()))
            .map((message, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton
                  onClick={() => {
                    handleMessageSelect(index)
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ListItemAvatar>
                        <Avatar alt={message.contactName} src={message.contactAvatarLink} />
                      </ListItemAvatar>
                      <ListItemText primary={message.contactName} secondary={message.date} />
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <HighlightedMessage mainText={message.text} subText={searchValue} />
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
        </>
      )}
    </>
  )
}

export default SearchMessages
