import { useState } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import FaceIcon from "@mui/icons-material/Face"
import CheckIcon from "@mui/icons-material/Check"

import Search from "./Search"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"

const InfoChat = (props) => {
  const [contacts, setContacts] = useState([
    {
      avatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U74",
      name: "Khaled",
      id: 103,
      lastMessage: "last message",
      lastMessageDate: "date",
    },
    {
      avatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U66",
      name: "Moaz",
      id: 106,
      lastMessage: "last message",
      lastMessageDate: "date",
    },
    {
      avatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U55",
      name: "Ali",
      id: 105,
      lastMessage: "last message",
      lastMessageDate: "date",
    },
    {
      avatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U44",
      name: "Hamza",
      id: 104,
      lastMessage: "last message",
      lastMessageDate: "date",
    },
    {
      avatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      userName: "U77",
      name: "Abd El-Rahman",
      id: 107,
      lastMessage: "last message",
      lastMessageDate: "date",
    },
  ])

  const [messages, setMessages] = useState([
    {
      message: "A message",
      messageDate: "date",
      contactId: 0,
      sender: 0, // i or him?
    },
  ])

  const handleContactSelection = (index) => {
    const nextContacts = contacts.map((contact, i) => {
      if (i === index) {
        if (contact["selected"]) {
          // deselect -> remove from selectedContacts
          setSelectedContact((chips) => chips.filter((chip) => chip.id !== contact.id))
        } else {
          // select -> add to selectedContacts
          setSelectedContact([contact])
        }
        contact["selected"] = !contact["selected"]
        return contact
      } else {
        // The rest is not selected
        contact["selected"] = false
        return contact
      }
    })
    setContacts(nextContacts)
  }

  const setSelectedContact = props.setSelectedContact

  const handleDelete = (chipToDelete) => () => {
    setSelectedContact((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
    // Updated boolean "selection" in contacts
    const nextContacts = contacts.map((contact) => {
      if (contact.id === chipToDelete.id) {
        contact["selected"] = false
        return contact
      } else {
        // The rest haven't changed
        return contact
      }
    })
    setContacts(nextContacts)
  }

  const [searchValue, setSearchValue] = useState("")
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  const [value, setValue] = useState("all")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [searchActive, setSearchActive] = useState(false)

  return (
    <div className="info chat">
      <List dense={false}>
        {/* Search */}
        <ListItem sx={{ paddingLeft: "24px" }}>
          <Search searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} setSearchValue={setSearchValue} searchActive={searchActive} setSearchActive={setSearchActive} />
        </ListItem>

        {/* Tabs (All, people, messages) */}
        {searchValue.length !== 0 && (
          <ListItem>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="primary">
                <Tab value="all" label="All" id="simple-tab-0" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
                <Tab value="people" label="People" id="simple-tab-1" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
                <Tab value="messages" label="Messages" id="simple-tab-2" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
              </Tabs>
            </Box>
          </ListItem>
        )}

        {searchActive && searchValue.length === 0 && <div style={{ fontSize: "15px", color: "rgb(83, 100, 113)", textAlign: "center", marginTop: "32px" }}>Try searching for people, or messages</div>}
        {/* {searchActive && searchValue.length !== 0 && 
        <div>
          Try searching for people, or messages
        </div>
        } */}

        {/* Contacts */}
        {!searchActive &&
          contacts
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
                  <ListItemText primary={`${contact.name} [id=${contact.id}]`} secondary={`@${contact.userName}`} />
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
  )
}

export default InfoChat
