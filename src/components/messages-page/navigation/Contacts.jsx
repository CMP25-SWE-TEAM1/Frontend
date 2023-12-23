import ListItem from "@mui/material/ListItem"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import HighlightedMessage from "./HighlightedMessage"

import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"

const Contacts = (props) => {
  const contacts = props.contacts.sort((a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate))

  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  const getLastMessageTime = (lastMessageTime) => {
    const messageDate = new Date(lastMessageTime)
    const currentDate = new Date()

    const timeDiff = currentDate - messageDate
    const secondsDiff = Math.floor(timeDiff / 1000)
    const minutesDiff = Math.floor(timeDiff / (1000 * 60))
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

    if (secondsDiff < 5) {
      return "Now"
    } else if (secondsDiff < 60) {
      return `${secondsDiff} sec`
    } else if (minutesDiff < 60) {
      return `${minutesDiff} min`
    } else if (hoursDiff < 24) {
      const formattedHours = messageDate.toLocaleString("en-US", {
        hour: "numeric",
        // minute: "numeric",
        hour12: true,
      })
      return `${formattedHours}`
    } else {
      // If the difference is greater than or equal to 24 hours, display the date
      return messageDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <>
      {contacts.map((contact, index) => (
        <ListItem disablePadding key={index} sx={selectedContact === contact.id ? { backgroundColor: "#EFF3F4", borderRight: "2px solid #1D9BF0" } : contact.lastMessageSeen === false ? { backgroundColor: "#F7F9F9" } : {}}>
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
                <ListItemText primary={contact.name || "Hamza"} secondary={`@${contact.userName || "hamza_xyz"} . ${contact.lastMessageDate ? getLastMessageTime(contact.lastMessageDate) : ""}`} />
              </div>
              <div style={{ marginTop: "5px" }}>
                <HighlightedMessage mainText={contact.lastMessage || `${contact.lastMessageMediaType ? (contact.userName === contact.lastMessageSender ? "Sent a" : "You sent a") : ""} ${contact.lastMessageMediaType ? (contact.lastMessageMediaType === "GIF" ? "GIF" : "photo") : ""}`} subText={""} />
              </div>
            </div>

            {contact.lastMessageSeen === false && (
              <ListItemSecondaryAction>
                <MarkUnreadChatAltIcon color="primary" fontSize="small" />
              </ListItemSecondaryAction>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </>
  )
}

export default Contacts
