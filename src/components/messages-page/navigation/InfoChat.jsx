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

import SearchPeople from "./SearchPeople"
import SearchMessages from "./SearchMessages"
import NoResultFound from "./NoResultFound"
import Contacts from "./Contacts"
import useGetChatSearch from "../customHooks/get/useGetChatSearch"
import { useSelector } from "react-redux"
import { BACKEND_ON } from "../MessagesConstants"

const InfoChat = (props) => {
  const contacts = props.contacts
  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  const userToken = useSelector((state) => state.user.token)
  const handleGetChatSearch = useGetChatSearch

  const [messages, setMessages] = useState([
    {
      text: "A message",
      date: "date",

      contactName: "Khaled",
      contactAvatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      contactId: 103,
    },
    {
      text: "New message",
      date: "date",

      contactName: "Khaled",
      contactAvatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      contactId: 103,
    },
    {
      text: "Old message",
      date: "date",

      contactName: "Hamza",
      contactAvatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      contactId: 104,
    },
    {
      text: "Gold message",
      date: "date",

      contactName: "Hamza",
      contactAvatarLink: "https://64.media.tumblr.com/avatar_f71055191601_128.pnj",
      contactId: 104,
    },
  ])

  const [searchValue, setSearchValue] = useState("")
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
    if (BACKEND_ON && event.target.value !== "") {
      handleGetChatSearch(event.target.value, userToken).then((response) => {
        console.log("GetMessagesSearch response", response)
        if (!response.data) setMessages([])
        else {
          const newMessages = response.data.map((message) => ({
            text: message.lastMessage.description,
            date: message.lastMessage.sendTime,

            contactName: message.chat_members[0].nickname,
            contactAvatarLink: message.chat_members[0].profile_image,
            contactId: message.chat_members[0].id,
          }))
          setMessages(newMessages)
        }
      })
    } else {
      setMessages([])
    }
  }

  const [tabValue, setTabValue] = useState("all")

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const [searchActive, setSearchActive] = useState(false)

  return (
    <div className="info chat">
      <List dense={false} sx={{ maxWidth: "450px" }}>
        {/* Search */}
        <ListItem sx={{ paddingLeft: "24px" }}>
          <Search searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} setSearchValue={setSearchValue} searchActive={searchActive} setSearchActive={setSearchActive} />
        </ListItem>

        {/* Tabs (All, people, messages) */}
        {searchValue.length !== 0 && (
          <ListItem>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="primary">
                <Tab value="all" label="All" id="simple-tab-0" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
                <Tab value="people" label="People" id="simple-tab-1" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
                <Tab value="messages" label="Messages" id="simple-tab-2" sx={{ flex: 1, textTransform: "none", fontWeight: 600 }} />
              </Tabs>
            </Box>
          </ListItem>
        )}

        {searchActive && searchValue.length === 0 && <div style={{ fontSize: "15px", color: "rgb(83, 100, 113)", textAlign: "center", marginTop: "32px" }}>Try searching for people, or messages</div>}

        {searchActive && searchValue.length !== 0 && tabValue === "all" && (
          <>
            {messages.filter((message) => message.text.toUpperCase().includes(searchValue.toUpperCase())).length === 0 && contacts.filter((contact) => contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.userName.toUpperCase().includes(searchValue.toUpperCase())).length === 0 && <NoResultFound searchValue={searchValue} />}
            <SearchPeople contacts={contacts} searchValue={searchValue} tabValue={tabValue} setSelectedContact={setSelectedContact} selectedContact={selectedContact} />
            <SearchMessages messages={messages} searchValue={searchValue} tabValue={tabValue} setSelectedContact={setSelectedContact} selectedContact={selectedContact} />
          </>
        )}
        {searchActive && searchValue.length !== 0 && tabValue === "people" && (
          <>
            {contacts.filter((contact) => contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.userName.toUpperCase().includes(searchValue.toUpperCase())).length === 0 && <NoResultFound searchValue={searchValue} />}
            <SearchPeople contacts={contacts} searchValue={searchValue} tabValue={tabValue} setSelectedContact={setSelectedContact} selectedContact={selectedContact} />
          </>
        )}
        {searchActive && searchValue.length !== 0 && tabValue === "messages" && (
          <>
            {messages.filter((message) => message.text.toUpperCase().includes(searchValue.toUpperCase())).length === 0 && <NoResultFound searchValue={searchValue} />}
            <SearchMessages messages={messages} searchValue={searchValue} tabValue={tabValue} setSelectedContact={setSelectedContact} selectedContact={selectedContact} />
          </>
        )}
        {/* Contacts */}
        {!searchActive && <Contacts contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />}
      </List>
    </div>
  )
}

export default InfoChat
