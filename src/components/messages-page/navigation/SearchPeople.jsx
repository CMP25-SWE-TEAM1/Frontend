import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import FaceIcon from "@mui/icons-material/Face"
import CheckIcon from "@mui/icons-material/Check"

import PersonIcon from "@mui/icons-material/Person"

const SearchPeople = (props) => {
  const contacts = props.contacts
  const searchValue = props.searchValue
  const handleContactSelection = props.handleContactSelection
  const tabValue = props.tabValue

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
              <ListItem disablePadding key={index}>
                <ListItemButton
                  onClick={() => {
                    handleContactSelection(index)
                  }}
                >
                  <ListItemAvatar>
                    {/* <Avatar>
                        <FaceIcon color="secondary" />
                      </Avatar> */}
                    <Avatar alt={contact.name} src={contact.avatarLink} />
                  </ListItemAvatar>
                  <ListItemText primary={contact.name} secondary={`@${contact.userName}`} />
                  {contact.selected && (
                    <ListItemIcon>
                      <CheckIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
        </>
      )}
    </>
  )
}

export default SearchPeople
