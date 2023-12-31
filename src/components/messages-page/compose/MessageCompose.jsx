// Style
import "./message-compose.css"
// MUI
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import CheckIcon from "@mui/icons-material/Check"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import Chip from "@mui/material/Chip"
// Const
import { BACKEND_ON } from "../constants/MessagesConstants"
// Hooks
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useGetUsersSearch from "../customHooks/get/useGetUsersSearch"
// Redux
import { useSelector } from "react-redux"

/**
 * Component for composing a new message.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setSelectedContact - Function to set the selected contact in the chat.
 * @param {Function} props.setContacts - Function to set the chat contacts.
 * @param {Array} props.contacts - List of chat contacts.
 * @param {boolean} props.composeModalOpen - Indicates whether the compose modal is open.
 * @param {Function} props.handleComposeModalClose - Function to close the compose modal.
 * @returns {JSX.Element} - Rendered component.
 */
const MessageCompose = (props) => {
  // ==============  Props   ==============
  // Contacts
  const setChatSelectedContact = props.setSelectedContact
  const setChatContacts = props.setContacts
  const chatContacts = props.contacts
  // Modla
  const composeModalOpen = props.composeModalOpen
  const handleComposeModalClose = props.handleComposeModalClose
  // ==============  Redux   ==============
  // User
  const userToken = useSelector((state) => state.user.token)

  // ==============  Data   ==============
  const [contacts, setContacts] = useState(chatContacts)
  const [selectedContacts, setSelectedContacts] = useState([])
  const [searchIconColor, setSearchIconColor] = useState("")
  const [activeNextBtn, setActiveNextBtn] = useState("")
  const [searchValue, setSearchValue] = useState("")

  // ==============  Hooks   ==============
  const navigate = useNavigate()
  // -------- useEffect --------
  useEffect(() => {
    setContacts(chatContacts)
  }, [chatContacts])

  // -------- Custom --------
  const handleUsersSearch = useGetUsersSearch

  // ==============  Functions   ==============
  const handleContactSelection = (choosenContact) => {
    const nextContacts = contacts.map((contact) => {
      if (choosenContact.id === contact.id) {
        if (contact["selected"]) {
          // deselect -> remove from selectedContacts
          setSelectedContacts((chips) => chips.filter((chip) => chip.id !== contact.id))
          setActiveNextBtn("")
        } else {
          // select -> add to selectedContacts
          setSelectedContacts([contact])
          setActiveNextBtn("active")
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
  const handleDelete = (chipToDelete) => () => {
    setSelectedContacts((chips) => chips.filter((chip) => chip.id !== chipToDelete.id))
    if (selectedContacts.length === 0) setActiveNextBtn("")
    else setActiveNextBtn("active")
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
  const handleSearchIcon = (focused) => {
    if (focused) setSearchIconColor("primary")
    else setSearchIconColor("")
  }
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)

    if (BACKEND_ON && event.target.value !== "") {
      handleUsersSearch(event.target.value, userToken).then((response) => {
        console.log("GetUsersSearch response", response)
        if (!response.results) setContacts([])
        else {
          const newUsers = response.results.map((user) => ({
            avatarLink: user.profile_image,
            userName: user.username,
            name: user.nickname,
            id: user._id,
            selected: selectedContacts.id === user._id ? true : false,
          }))
          setContacts(newUsers)
        }
      })
    } else {
      if (event.target.value === "") setContacts([])
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle = {
    position: "absolute",

    backgroundColor: "background.paper",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }

  return (
    <Modal
      open={composeModalOpen}
      onClose={() => {
        navigate(-1)
        handleComposeModalClose()
      }}
      aria-labelledby="compose message"
      data-testid="compose-message-modal"
    >
      <Box sx={modalStyle}>
        <div id="message-compose" className="message-compose">
          <div className="message-compose-header">
            <div
              onClick={() => {
                navigate(-1)
                handleComposeModalClose()
              }}
              className="message-compose-close"
              title="Close"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </div>
            <div className="message-compose-title">New message</div>
            <div
              className={`message-compose-next ${activeNextBtn}`}
              onClick={() => {
                if (activeNextBtn === "active") {
                  handleComposeModalClose()
                  if (chatContacts.filter((contact) => contact.id === selectedContacts[0].id).length === 0) {
                    console.log([...chatContacts, selectedContacts[0]])
                    setChatContacts([
                      ...chatContacts,
                      {
                        avatarLink: selectedContacts[0].avatarLink,
                        userName: selectedContacts[0].userName,
                        name: selectedContacts[0].name,
                        id: selectedContacts[0].id,
                      },
                    ])
                  }
                  setChatSelectedContact(selectedContacts[0].id)
                }
              }}
            >
              Next
            </div>
          </div>
          <div className="message-compose-body">
            <div className="message-compose-search"></div>
            <div className="message-compose-list">
              <List dense={false}>
                {/* Search */}
                <ListItem sx={{ paddingLeft: "24px", borderBottom: "1px solid #eee" }}>
                  <SearchIcon sx={{ width: "20px", height: "20px" }} color={searchIconColor} value={searchValue} onChange={handleSearchValueChange} />
                  <InputBase sx={{ ml: 1, flex: 1 }} value={searchValue} onChange={handleSearchValueChange} placeholder="Search people" onFocus={() => handleSearchIcon(true)} onBlur={() => handleSearchIcon(false)} inputProps={{ "aria-label": "search people" }} />
                </ListItem>
                {/* Selected Contacts */}
                {selectedContacts.length > 0 && (
                  <ListItem sx={{ paddingLeft: "24px", borderBottom: "1px solid #eee" }}>
                    <List
                      dense={false}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {selectedContacts.map((contact, index) => {
                        return (
                          <ListItem key={index} sx={{ paddingTop: "4px", paddingBottom: "4px", paddingLeft: "4px", paddingRight: "4px", width: "fit-content" }}>
                            <Chip variant="outlined" color="primary" onClick={handleDelete(contact)} onDelete={handleDelete(contact)} label={contact.name} avatar={<Avatar src={contact.avatarLink} />} />
                          </ListItem>
                        )
                      })}
                    </List>
                  </ListItem>
                )}
                {/* Contacts */}
                {contacts
                  .filter((contact) => contact.name.toUpperCase().includes(searchValue.toUpperCase()) || contact.userName.toUpperCase().includes(searchValue.toUpperCase()))
                  .map((contact, index) => (
                    <ListItem disablePadding key={index}>
                      <ListItemButton
                        onClick={() => {
                          handleContactSelection(contact)
                        }}
                      >
                        <ListItemAvatar>
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
              </List>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default MessageCompose
