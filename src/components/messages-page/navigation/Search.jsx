import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { alpha, styled } from "@mui/material/styles"
import InputAdornment from "@mui/material/InputAdornment"

import IconButton from "@mui/material/IconButton"

import { useState } from "react"

const Search = (props) => {
  const searchValue = props.searchValue
  const handleSearchValueChange = props.handleSearchValueChange
  const setSearchValue = props.setSearchValue

  const [returnBtnActive, setReturnBtnActive] = useState(false)

  return (
    <>
      {returnBtnActive && (
        <IconButton
          sx={{ marginRight: "5px" }}
          aria-label="return"
          onClick={() => {
            setReturnBtnActive(false)
            setSearchValue("")
          }}
        >
          <KeyboardBackspaceIcon sx={{ color: "#000" }} />
        </IconButton>
      )}
      <BootstrapInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{ width: "100%" }}
        value={searchValue}
        onChange={handleSearchValueChange}
        placeholder="Search Direct Messages"
        inputProps={{ "aria-label": "search messages" }}
        onFocus={() => {
          setReturnBtnActive(true)
        }}
      />
    </>
  )
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "&": {
    borderRadius: 9999,
    position: "relative",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 15,
    width: "100%",
    padding: "6px 10px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
  },
  "&:focus-within": {
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}))

export default Search
