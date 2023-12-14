import ListItem from "@mui/material/ListItem"
import EmailIcon from "@mui/icons-material/Email"

const SearchMessages = (props) => {
  const messages = props.messages
  const searchValue = props.searchValue
  const handleMessageSelect = props.handleMessageSelect
  const tabValue = props.tabValue
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
        </>
      )}
    </>
  )
}

export default SearchMessages
