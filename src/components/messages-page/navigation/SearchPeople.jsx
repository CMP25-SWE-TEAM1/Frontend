import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
// More tools
// import ListItemIcon from "@mui/material/ListItemIcon"
// import CheckIcon from "@mui/icons-material/Check"

import PersonIcon from "@mui/icons-material/Person"

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
