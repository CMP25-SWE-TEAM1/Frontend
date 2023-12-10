import { useSelector } from "react-redux"
import Widgets from "../Widgets"

import { useState } from "react"

import CustomTabPanel from "./CustomTabPanel"
import CustomTabs from "./CustomTabs"
import WithConditionalDataFetching from "./WithDataFetching"

import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Autocomplete from "@mui/material/Autocomplete"

import UserSearchComponent from "./UserSearchOption"
import axios from "axios"
import { APIs } from "../../constants/signupConstants"

const Explore = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

  const [tabValue, setTabValue] = useState(0)

  const [userSearch, setUserSearch] = useState("")

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  const [searchUsers, setSearchUsers] = useState([])

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

  const handleSearchUsers = (word) => {
    if (word !== "")
      axios
        .get(APIs.actual.searchUsers, {
          params: {
            word: word,
            type: "user",
            page: 1,
            count: 5,
          },
          headers: {
            authorization: "Bearer " + userToken,
          },
        })
        .then((res) => {
          // console.log(res.data.users)
          setSearchUsers(res.data.users)
        })
        .catch((err) => {
          console.log(err)
        })
    else setSearchUsers([])
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed", userSearch)
    }
  }

  return (
    <div className="flex flex-1 flex-grow-[8] max-xs:max-w-[475]">
      <div className="no-scrollbar ml-0 mr-1 max-w-[620px] flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-fit md:shrink-0">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%]">
          <div className="mt-2 flex w-full items-center justify-center">
            <div className="w-[90%]">
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Autocomplete
                  freeSolo
                  disableClearable
                  getOptionLabel={(option) => option?.username || userSearch}
                  options={searchUsers}
                  noOptionsText={"No options found"}
                  renderOption={(props, option) => <UserSearchComponent {...props} option={option} />}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Try searching for people with username"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                        onKeyDown: handleEnterKeyPress,
                      }}
                      onChange={(e) => {
                        const value = e.target.value
                        setUserSearch(value)
                        handleSearchUsers(value)
                      }}
                      sx={{
                        "& .MuiInputLabel-root": { color: darkMode ? "#71767b" : "black" },
                        "& .MuiInputBase-root": { border: "1px solid gray !important" },
                        "& .MuiInputBase-input": {
                          color: darkMode ? "#71767b" : "black",
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
          </div>
          <CustomTabs tabValue={tabValue} handleChangeTabValue={handleChangeTabValue} />
        </div>
        <CustomTabPanel value={tabValue} index={0}>
          {WithConditionalDataFetching("trending")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {WithConditionalDataFetching("trending")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {WithConditionalDataFetching("news")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          {WithConditionalDataFetching("sports")}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={4}>
          {WithConditionalDataFetching("entertainment")}
        </CustomTabPanel>
      </div>

      {user && <Widgets />}
    </div>
  )
}

export default Explore
