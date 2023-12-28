import ListItem from "@mui/material/ListItem"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import HighlightedMessage from "./HighlightedMessage"

import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt"
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import { useSelector } from "react-redux"

/**
 * Contacts component displays a list of contacts in the messages page. It maps through
 * the contacts and renders each contact as a list item with relevant information.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object[]} props.contacts - An array of contact objects to be displayed
 * @param {string} props.contacts[].id - The unique identifier for the contact
 * @param {string} props.contacts[].name - The name of the contact
 * @param {string} props.contacts[].userName - The username of the contact
 * @param {string} props.contacts[].avatarLink - The URL of the contact's avatar
 * @param {string} props.contacts[].lastMessage - The last message sent or received from the contact
 * @param {string} props.contacts[].lastMessageMediaType - The media type of the last message (e.g., "Img", "GIF")
 * @param {string} props.contacts[].lastMessageDate - The timestamp of the last message
 * @param {boolean} props.contacts[].lastMessageSeen - Flag indicating whether the last message is seen
 * @param {string} props.contacts[].lastMessageSender - The sender of the last message
 * @param {string} props.selectedContact - The ID of the currently selected contact
 * @param {Function} props.setSelectedContact - Function to set the selected contact
 * @returns {JSX.Element} JSX element representing the Contacts component
 */
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
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    if (secondsDiff < 5) {
      return "Now"
    } else if (secondsDiff < 60) {
      return `${secondsDiff} sec`
    } else if (minutesDiff < 60) {
      return `${minutesDiff} min`
    } else if (hoursDiff < 24) {
      const formattedHours = messageDate.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      })
      return `${formattedHours}`
    } else if (daysDiff < 365) {
      return messageDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      })
    } else {
      return messageDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }
  }
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <>
      {contacts.map((contact, index) => (
        <ListItem disablePadding key={index} sx={selectedContact === contact.id ? { backgroundColor: darkMode ? "#202327" : "#EFF3F4", borderRight: "2px solid #1D9BF0" } : contact.lastMessageSeen === false ? { backgroundColor: darkMode ? "#16181C" : "#F7F9F9" } : {}}>
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
