import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"

import UserSearchComponent from "./UserSearchOption"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { InputBase } from "@mui/material"

import axios from "axios"
import { APIs } from "../../constants/signupConstants"
import TrendSearchOption from "./TrendSearchOption"

import React from "react"

/**
 * Renders a search bar for finding users and trends, displaying results as the user types.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.query - Initial search query to display in the input field
 * @returns {JSX.Element} JSX element representing the search component
 */
const SearchComponent = ({ query }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const userToken = useSelector((state) => state.user.token)

  const preferences = useSelector((state) => state.preferences)

  const [searchQuery, setSearchQuery] = useState("")

  const [searchUsers, setSearchUsers] = useState([])
  const [searchTrends, setSearchTrends] = useState([])
  const [searchAll, setSearchAll] = useState([])
  const users = [
    {
      id: "652c16b01e15482dcdd5c361",
      username: "loca22_eng",
      nickname: "malek hossam",
      bio: "I'm the Real Batman",
      profile_image:
        "https://storage.googleapis.com/gigachat-img.appspot.com/640ed2cb-dbaf-4abd-b28a-782a2f20acce-blob?GoogleAccessId=firebase-adminsdk-5avio%40gigachat-img.iam.gserviceaccount.com&Expires=253399795200&Signature=j23JRnrC9GnDp7hna4onwf57HmTWuhI5SPCi7g7EvI%2Fi0CNcoBtw8w1MHmvA7OgeK241Czqaz1GrE7xG3J6UVkQBTpWh%2FgdUw3aW9xdF7YtYu7dMjCvXkEy3pKTkFb5xQ%2F3ic8vlYmtDKH1K6%2FM2l1ZXVpJCeFZ%2F9ngOC8oCmueJZmqncn2RPf2UGPN%2FlNaGKvz%2BN%2Fb0Buln1XbjHQQO%2BeP6pdDCjNKeXxqa7TEIiPv6pytK3o05gzV%2B4LG2VYkNH3AaX57JPFxoPnyom%2FNYlhEPH%2B19XqJPG9Zq85ayVtqZ26Ucd8HRcbePKnIrXXjlflwoSMciwjmO1hQXf2LQSw%3D%3D",
      followers_num: 36,
      following_num: 36,
      isFollowedbyMe: true,
      isFollowingMe: true,
    },
    {
      id: "652c16b01e15482dcdd5c361",
      username: "loca22_eng",
      nickname: "malek hossam",
      bio: "I'm the Real Batman",
      profile_image:
        "https://storage.googleapis.com/gigachat-img.appspot.com/640ed2cb-dbaf-4abd-b28a-782a2f20acce-blob?GoogleAccessId=firebase-adminsdk-5avio%40gigachat-img.iam.gserviceaccount.com&Expires=253399795200&Signature=j23JRnrC9GnDp7hna4onwf57HmTWuhI5SPCi7g7EvI%2Fi0CNcoBtw8w1MHmvA7OgeK241Czqaz1GrE7xG3J6UVkQBTpWh%2FgdUw3aW9xdF7YtYu7dMjCvXkEy3pKTkFb5xQ%2F3ic8vlYmtDKH1K6%2FM2l1ZXVpJCeFZ%2F9ngOC8oCmueJZmqncn2RPf2UGPN%2FlNaGKvz%2BN%2Fb0Buln1XbjHQQO%2BeP6pdDCjNKeXxqa7TEIiPv6pytK3o05gzV%2B4LG2VYkNH3AaX57JPFxoPnyom%2FNYlhEPH%2B19XqJPG9Zq85ayVtqZ26Ucd8HRcbePKnIrXXjlflwoSMciwjmO1hQXf2LQSw%3D%3D",
      followers_num: 36,
      following_num: 36,
      isFollowedbyMe: true,
      isFollowingMe: true,
    },
    {
      id: "652c16b01e15482dcdd5c361",
      username: "loca22_eng",
      nickname: "malek hossam",
      bio: "I'm the Real Batman",
      profile_image:
        "https://storage.googleapis.com/gigachat-img.appspot.com/640ed2cb-dbaf-4abd-b28a-782a2f20acce-blob?GoogleAccessId=firebase-adminsdk-5avio%40gigachat-img.iam.gserviceaccount.com&Expires=253399795200&Signature=j23JRnrC9GnDp7hna4onwf57HmTWuhI5SPCi7g7EvI%2Fi0CNcoBtw8w1MHmvA7OgeK241Czqaz1GrE7xG3J6UVkQBTpWh%2FgdUw3aW9xdF7YtYu7dMjCvXkEy3pKTkFb5xQ%2F3ic8vlYmtDKH1K6%2FM2l1ZXVpJCeFZ%2F9ngOC8oCmueJZmqncn2RPf2UGPN%2FlNaGKvz%2BN%2Fb0Buln1XbjHQQO%2BeP6pdDCjNKeXxqa7TEIiPv6pytK3o05gzV%2B4LG2VYkNH3AaX57JPFxoPnyom%2FNYlhEPH%2B19XqJPG9Zq85ayVtqZ26Ucd8HRcbePKnIrXXjlflwoSMciwjmO1hQXf2LQSw%3D%3D",
      followers_num: 36,
      following_num: 36,
      isFollowedbyMe: true,
      isFollowingMe: true,
    },
    {
      id: "652c16b01e15482dcdd5c361",
      username: "loca22_eng",
      nickname: "malek hossam",
      bio: "I'm the Real Batman",
      profile_image:
        "https://storage.googleapis.com/gigachat-img.appspot.com/640ed2cb-dbaf-4abd-b28a-782a2f20acce-blob?GoogleAccessId=firebase-adminsdk-5avio%40gigachat-img.iam.gserviceaccount.com&Expires=253399795200&Signature=j23JRnrC9GnDp7hna4onwf57HmTWuhI5SPCi7g7EvI%2Fi0CNcoBtw8w1MHmvA7OgeK241Czqaz1GrE7xG3J6UVkQBTpWh%2FgdUw3aW9xdF7YtYu7dMjCvXkEy3pKTkFb5xQ%2F3ic8vlYmtDKH1K6%2FM2l1ZXVpJCeFZ%2F9ngOC8oCmueJZmqncn2RPf2UGPN%2FlNaGKvz%2BN%2Fb0Buln1XbjHQQO%2BeP6pdDCjNKeXxqa7TEIiPv6pytK3o05gzV%2B4LG2VYkNH3AaX57JPFxoPnyom%2FNYlhEPH%2B19XqJPG9Zq85ayVtqZ26Ucd8HRcbePKnIrXXjlflwoSMciwjmO1hQXf2LQSw%3D%3D",
      followers_num: 36,
      following_num: 36,
      isFollowedbyMe: true,
      isFollowingMe: true,
    },
  ]

  useEffect(() => {
    if (query !== "") setSearchQuery(query)
  }, [query])

  useEffect(() => {
    setSearchAll([...searchTrends, ...searchUsers])
  }, [searchTrends, searchUsers])

  const handleSearchTrends = (word) => {
    axios
      .get(APIs.actual.searchTrends, {
        params: {
          word: word,
          type: "hashtag",
          page: 1,
          count: 3,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.results)
        setSearchTrends(res.data.results)
      })
      .catch((error) => {
        setSearchTrends([])
        if (error.response && error.response.status !== 404) {
          console.error(error)
        }
      })
  }

  const handleSearchUsers = (word) => {
    axios
      .get(APIs.actual.searchUsers, {
        params: {
          word: word,
          type: "user",
          page: 1,
          count: 10,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.results)
        let us = res.data.results

        if (!preferences.showBlockedandMuted) {
          us = us.filter((r) => r.isBlocked === false)
        }

        setSearchUsers(us)
      })
      .catch((error) => {
        setSearchUsers([])
        if (error.response && error.response.status !== 404) {
          console.error(error)
        }
      })
  }

  const handleSearchChange = (word) => {
    if (word !== "") {
      handleSearchTrends(word)
      handleSearchUsers(word)
    } else {
      setSearchUsers([])
      setSearchTrends([])
    }
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed", searchQuery)
      window.location.href = `/search?q=${searchQuery.replace(/#/g, "%23")}`
    }
  }

  return (
    <div className="mt-2 flex w-full items-center justify-center">
      <div className="w-[90%]">
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Autocomplete
            freeSolo
            blurOnSelect={false}
            renderGroup={(group) => {
              return (
                <div key={group.key}>
                  <span className="p-2 text-sm">{group.group}</span>
                  <div>{group.children}</div>
                </div>
              )
            }}
            groupBy={(option) => {
              if (option.username) {
                return "Users"
              } else {
                return "Trends"
              }
            }}
            disableClearable
            getOptionLabel={(option) => option?.username || searchQuery}
            options={searchAll}
            noOptionsText={"No options found"}
            renderOption={(props, option) => {
              return <li key={props.id}>{option.username ? <UserSearchComponent {...props} option={option} /> : <TrendSearchOption {...props} option={option} />}</li>
            }}
            renderInput={(params) => {
              // const tmp = params
              // tmp.fullwidth = tmp.fullWidth
              // delete tmp.fullWidth
              // console.log(params)

              return (
                <div key={params.id} className="input-container" ref={params.InputProps.ref}>
                  <input
                    onKeyDown={handleEnterKeyPress}
                    {...params.inputProps}
                    className={searchQuery === "" ? "form-input" : "form-input filled-input"}
                    type="search"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value
                      setSearchQuery(value)
                      handleSearchChange(value)
                    }}
                  />
                  <label className="input-label" htmlFor="name">
                    Search for people, hashtags or tweets
                  </label>
                </div>
              )
            }}
          />
        </Stack>
      </div>
    </div>
  )
}

// SearchComponent.propTypes = {
//   /**
//    * The initial search query to be displayed in the input field
//    */
//   query: React.PropTypes.string,
// }
export default SearchComponent
