import ListItem from "@mui/material/ListItem"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import HighlightedMessage from "./HighlightedMessage"

const Contacts = (props) => {
  const contacts = props.contacts.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate))

  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  return (
    <>
      {contacts.map((contact, index) => (
        <ListItem disablePadding key={index} sx={selectedContact === contact.id ? { backgroundColor: "#EFF3F4", borderRight: "4px solid #1D9BF0" } : {}}>
          <ListItemButton
            onClick={() => {
              console.log("selectedContact", contact.id)
              setSelectedContact(contact.id)
            }}
          >
            <div
              style={{
                maxWidth: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar alt={contact.name || "Hamza"} src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name || "Hamza"}
                  secondary={`@${contact.userName || "hamza_xyz"} . ${
                    contact.lastMessageDate
                      ? new Date(contact.lastMessageDate).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : ""
                  }`}
                />
              </div>
              <div style={{ marginTop: "5px" }}>
                <HighlightedMessage mainText={contact.lastMessage || `${contact.lastMessageMediaType ? (contact.userName === contact.lastMessageSender ? "Sent a" : "You sent a") : ""} ${contact.lastMessageMediaType ? (contact.lastMessageMediaType === "GIF" ? "photo" : "GIF") : ""}`} subText={""} />
              </div>
            </div>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  )
}

export default Contacts
