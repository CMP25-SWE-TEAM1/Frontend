import ListItem from "@mui/material/ListItem"
import EmailIcon from "@mui/icons-material/Email"

import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import HighlightedMessage from "./HighlightedMessage"

/**
 * SearchMessages component displays filtered messages based on the search value.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of messages to be filtered
 * @param {string} props.searchValue - The search value used for filtering messages
 * @param {string} props.tabValue - The active tab value (e.g., "all", "people", "messages")
 * @param {string} props.selectedContact - The ID of the selected contact
 * @param {Function} props.setSelectedContact - Function to set the selected contact
 * @returns {JSX.Element} JSX element representing the SearchMessages component
 */
const SearchMessages = (props) => {
  const messages = props.messages
  const searchValue = props.searchValue
  const tabValue = props.tabValue
  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  const getMessageTime = (lastMessageTime) => {
    const messageDate = new Date(lastMessageTime)
    const currentDate = new Date()

    const timeDiff = currentDate - messageDate
    const minutesDiff = Math.floor(timeDiff / (1000 * 60))
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

    if (minutesDiff < 60) {
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
              <ListItem disablePadding key={index} sx={selectedContact === message.contactId ? { backgroundColor: "#EFF3F4" } : {}}>
                <ListItemButton
                  onClick={() => {
                    setSelectedContact(message.contactId)
                  }}
                >
                  <div
                    style={{
                      maxWidth: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ListItemAvatar>
                        <Avatar alt={message.contactName} src={message.contactAvatarLink} />
                      </ListItemAvatar>
                      <ListItemText primary={message.contactName} secondary={message.date ? getMessageTime(message.date) : ""} />
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
