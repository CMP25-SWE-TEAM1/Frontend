// Components
import Search from "./Search"
import SearchPeople from "./SearchPeople"
import SearchMessages from "./SearchMessages"
import NoResultFound from "./NoResultFound"
import Contacts from "./Contacts"
// MUI
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
// Const
import { BACKEND_ON } from "../constants/MessagesConstants"
import * as DataInit from "../constants/MessagesInit"
// Hooks
import { useState } from "react"
import useGetChatSearch from "../customHooks/get/useGetChatSearch"
// Redux
import { useSelector } from "react-redux"

/**
 * Generates InfoChat component which displays contacts information and search results for chats in the Messages page.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object[]} props.contacts - List of contacts
 * @param {number} props.selectedContact - ID of the selected contact
 * @param {Function} props.setSelectedContact - Function to set the selected contact
 * @returns {JSX.Element} JSX element representing the InfoChat component
 */
const InfoChat = (props) => {
  // ==============  Props   ==============
  const contacts = props.contacts
  const selectedContact = props.selectedContact
  const setSelectedContact = props.setSelectedContact

  // ==============  Redux   ==============
  // User
  const userToken = useSelector((state) => state.user.token)

  // ==============  Data   ==============
  const [messages, setMessages] = useState(DataInit.InfoChat_messages)
  const [searchValue, setSearchValue] = useState("")
  const [tabValue, setTabValue] = useState("all")
  const [searchActive, setSearchActive] = useState(false)

  // ==============  Hooks   ==============
  // -------- Custom --------
  const handleGetChatSearch = useGetChatSearch

  // ==============  Functions   ==============
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
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className="info chat">
      <List dense={false} sx={{ width: "100%" }}>
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
