import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { useState, cloneElement } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import FaceIcon from "@mui/icons-material/Face"
import CheckIcon from "@mui/icons-material/Check"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"

import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"

import "./message-compose.css"

const MessageCompose = () => {
  const [composeModalOpen, setComposeModalOpen] = useState(true)
  const handleComposeModalOpen = () => setComposeModalOpen(true)
  const handleComposeModalClose = () => setComposeModalOpen(false)

  const [contacts, setContacts] = useState([
    {
      avatrLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U74",
      name: "Khaled",
      id: 3,
      selected: false,
    },
    {
      avatrLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U66",
      name: "Moaz",
      id: 6,
      selected: false,
    },
    {
      avatrLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U55",
      name: "Ali",
      id: 5,
      selected: false,
    },
    {
      avatrLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U44",
      name: "Hamza",
      id: 4,
      selected: false,
    },
    {
      avatrLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U77",
      name: "Abd El-Rahman",
      id: 7,
      selected: false,
    },
  ])
  const handleContactSelection = (index) => {
    const nextContacts = contacts.map((contact, i) => {
      if (i === index) {
        // Increment the clicked counter
        contact["selected"] = !contact["selected"]
        return contact
      } else {
        // The rest haven't changed
        return contact
      }
    })
    setContacts(nextContacts)
  }

  const [searchIconColor, setSearchIconColor] = useState("")
  const handleSearchIcon = (focused) => {
    if (focused) setSearchIconColor("primary")
    else setSearchIconColor("")
  }

  return (
    <Modal open={composeModalOpen} onClose={handleComposeModalClose} aria-labelledby="compose message">
      <Box sx={modalStyle}>
        <div id="message-compose" className="message-compose">
          <div className="message-compose-header">
            <div onClick={handleComposeModalClose} className="message-compose-close" title="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </div>
            <div className="message-compose-title">New message</div>
            <div className="message-compose-next">Next</div>
          </div>
          <div className="message-compose-body">
            <div className="message-compose-search"></div>
            <div className="message-compose-list">
              <List dense={false}>
                {/* Search */}
                <ListItem sx={{ paddingLeft: "24px", borderBottom: "1px solid #eee" }}>
                  <SearchIcon sx={{ width: "20px", height: "20px" }} color={searchIconColor} />
                  <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search people" onFocus={() => handleSearchIcon(true)} onBlur={() => handleSearchIcon(false)} inputProps={{ "aria-label": "search people" }} />
                </ListItem>
                {/* Creat a group */}
                <ListItem disablePadding sx={{ borderBottom: "1px solid #eee" }}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "transparent", border: "1px solid #ddd" }}>
                        <GroupsOutlinedIcon sx={{ color: "#1976D2" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create a group" primaryTypographyProps={{ fontSize: 15, fontWeight: "600", color: "#1976D2" }} />
                  </ListItemButton>
                </ListItem>
                {/* Contacts */}
                {contacts.map((contact, index) => (
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
                        <Avatar alt={contact.name} src={contact.avatrLink} />
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
              </List>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  maxWidth: 600,
  maxHeight: "80vh",
  borderRadius: "16px",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
}

export default MessageCompose
