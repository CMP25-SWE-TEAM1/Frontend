import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import SearchIcon from "@mui/icons-material/Search"
import InputBase from "@mui/material/InputBase"
import { alpha, styled } from "@mui/material/styles"
import InputAdornment from "@mui/material/InputAdornment"

import IconButton from "@mui/material/IconButton"

/**
 * Search component renders a search input for filtering direct messages, Contants.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.searchValue - The current value of the search input
 * @param {Function} props.handleSearchValueChange - Function to handle changes in the search input value
 * @param {Function} props.setSearchValue - Function to set the search input value
 * @param {boolean} props.searchActive - Flag indicating whether the search is currently active
 * @param {Function} props.setSearchActive - Function to set the search active state
 * @returns {JSX.Element} JSX element representing the Search component
 */
const Search = (props) => {
  const searchValue = props.searchValue
  const handleSearchValueChange = props.handleSearchValueChange
  const setSearchValue = props.setSearchValue

  const searchActive = props.searchActive
  const setSearchActive = props.setSearchActive

  return (
    <>
      {searchActive && (
        <IconButton
          sx={{ marginRight: "5px" }}
          aria-label="return"
          onClick={() => {
            setSearchActive(false)
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
          setSearchActive(true)
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
