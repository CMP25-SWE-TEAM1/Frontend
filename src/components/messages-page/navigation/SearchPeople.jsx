import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"

import PersonIcon from "@mui/icons-material/Person"

/**
 * SearchPeople component displays filtered contacts based on the search value.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.contacts - Array of contacts to be filtered
 * @param {string} props.searchValue - The search value used for filtering contacts
 * @param {string} props.tabValue - The active tab value (e.g., "all", "people", "messages")
 * @param {string} props.selectedContact - The ID of the selected contact
 * @param {Function} props.setSelectedContact - Function to set the selected contact
 * @returns {JSX.Element} JSX element representing the SearchPeople component
 */
const SearchPeople = (props) => {
  const contacts = props.contacts
  const searchValue = props.searchValue
  const tabValue = props.tabValue
  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  return (
    <>
      {contacts.filter((contact) => contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.userName.toUpperCase().includes(searchValue.toUpperCase())).length !== 0 && (
        <>
          {tabValue === "all" && (
            <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div style={{ fontSize: "20px", fontWeight: "600" }}>
                <PersonIcon /> People
              </div>
            </ListItem>
          )}
          {contacts
            .filter((contact) => contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.userName.toUpperCase().includes(searchValue.toUpperCase()))
            .map((contact, index) => (
              <ListItem disablePadding key={index} sx={selectedContact === contact.id ? { backgroundColor: "#EFF3F4" } : {}}>
                <ListItemButton
                  onClick={() => {
                    setSelectedContact(contact.id)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={contact.name} src={contact.avatarLink || "https://64.media.tumblr.com/avatar_f71055191601_128.pnj"} />
                  </ListItemAvatar>
                  <ListItemText primary={contact.name} secondary={`@${contact.userName}`} />
                </ListItemButton>
              </ListItem>
            ))}
        </>
      )}
    </>
  )
}

export default SearchPeople
