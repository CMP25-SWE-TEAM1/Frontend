import Widgets from "../Widgets/Widgets"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import axios from "axios"
import PostsContainer from "../Home/Posts/PostsContainer"
import SearchComponent from "../Explore/SearchComponent"
import CustomTabPanel from "../General/CustomTabs/CustomTabPanel"
import CustomTabs from "../General/CustomTabs/CustomTabs"
import ScrollToBottom from "../General/ScrollToBottom"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined"
import Checkbox from "@mui/material/Checkbox"
import { toggleBlockedMutedMode } from "../../store/PreferencesSlice"
import Person from "../PostEngagement/Person"
import { getColor } from "../../constants"

import { useNavigate } from "react-router-dom"

const SearchResults = () => {
  const { user, token } = useSelector((state) => state.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  const preferences = useSelector((state) => state.preferences)
  const dispatch = useDispatch()

  const [trendResults, setTrendResults] = useState([])
  const [tweetResults, setTweetResults] = useState([])
  const [userResults, setUserResults] = useState([])
  const [tabValue, setTabValue] = useState(0)
  let pageNumber = 1
  let noMoreUsers = false
  let noMoreTweets = false
  let noMoreTrends = false

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get("q")

  const APIs = {
    mock: {},
    actual: { searchUsers: "https://backend.gigachat.cloudns.org/api/user/search", searchTweets: "https://backend.gigachat.cloudns.org/api/tweets/search", searchTrends: "https://backend.gigachat.cloudns.org/api/trends/" },
  }

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue)
  }

  const toPeopleTab = () => {
    setTabValue(2)
  }

  const fetchData = () => {
    if (searchQuery) {
      if (!noMoreUsers)
        axios
          .get(APIs.actual.searchUsers, {
            params: {
              word: searchQuery,
              type: "user",
              page: pageNumber,
              count: 10,
            },
            headers: {
              authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            let us = res.data.results

            if (!preferences.showBlockedandMuted) {
              us = us.filter((r) => r.isBlocked === false)
            }
            setUserResults((prevResults) => [...prevResults, ...us])
            if (res.data.results.length < 10) noMoreUsers = true
          })
          .catch((err) => {
            console.log(err)
          })

      if (searchQuery[0] !== "#" && !noMoreTweets) {
        axios
          .get(APIs.actual.searchTweets, {
            params: {
              word: searchQuery,
              type: "tweet",
              page: pageNumber,
              count: 10,
            },
            headers: {
              authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setTweetResults((prevResults) => [
              ...prevResults,
              ...res.data.results.map((post) => ({
                isLiked: post.isLiked,
                isRtweeted: post.isRtweeted,
                id: post.referredReplyId,
                tweetDetails: post,
                type: post.type,
              })),
            ])
            if (res.data.results.length < 10) noMoreTweets = true
          })
          .catch((err) => {
            console.log(err)
          })
      }

      if (searchQuery[0] === "#" && !noMoreTrends) {
        axios
          .get(APIs.actual.searchTrends + searchQuery.slice(1), {
            params: {
              type: "hashtag",
              page: pageNumber,
              count: 10,
            },
            headers: {
              authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            const nn = res.data.data.map((d) => {
              const n = { ...d, type: "tweet" }
              return n
            })
            console.log(nn)
            setTrendResults((prevResults) => [...prevResults, ...nn])
            if (res.data.data.length < 10) noMoreTrends = true
          })
          .catch((err) => {
            console.log(err)
          })
      }

      pageNumber = pageNumber + 1
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const tabNames = ["Top", "Latest", "People"]

  const htmlElement = document.getElementById("htmlid")

  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)
  const handleClickMenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorMenu(null)
  }

  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div className="flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div id="scrolledElement" className="no-scrollbar ml-0 mr-1 max-w-[620px] flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit  sm:w-fit md:shrink-0">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:border-darkBorder dark:bg-inherit dark:bg-opacity-[99%] dark:backdrop-brightness-[20%] dark:max-xs:bg-black dark:max-xs:bg-opacity-50 dark:max-xs:backdrop-blur-sm dark:max-xs:backdrop-brightness-[30%]">
          <div className="flex w-full items-center justify-around pr-2">
            <SearchComponent query={searchQuery} />
            <div className="w-[10%]">
              <MoreHorizOutlinedIcon className="cursor-pointer" id="demo-positioned-button" aria-controls={openMenu ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClickMenu} />

              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={
                  htmlElement.classList.contains("dark")
                    ? {
                        "& .MuiMenu-paper": {
                          background: "black",
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                          border: "solid 1px #333435",
                        },
                      }
                    : {
                        "& .MuiMenu-paper": {
                          borderRadius: "20px",
                          boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                        },
                      }
                }
              >
                <MenuItem className="cursor-pointer text-base dark:text-white">
                  <div>
                    {/* <SettingsIcon className="mr-2" /> */}
                    Show blocked & muted accounts
                    <Checkbox
                      defaultChecked={preferences.showBlockedandMuted}
                      onChange={(e) => {
                        dispatch(toggleBlockedMutedMode())
                      }}
                    />
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <CustomTabs tabValue={tabValue} handleChangeTabValue={handleChangeTabValue} tabsNames={tabNames} />
        </div>
        <CustomTabPanel value={tabValue} index={0} className="w-full">
          {userResults[0] && (
            <div className="flex flex-col">
              <h1 className="p-5 text-2xl font-bold">People</h1>
              {userResults.slice(0, 3).map((person) => (
                <Person nickname={person.nickname} username={person.username} profile_image={person.profile_image} bio={person.bio ? person.bio : null} isFollowed={person.isFollowed} key={person._id} />
              ))}
              <div className={`p-5 ${"text-" + getColor(themeColor)} hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover`} onClick={toPeopleTab}>
                View all
              </div>
            </div>
          )}
          {trendResults[0] && <PostsContainer posts={trendResults} setPosts={setTrendResults} />}
          {tweetResults[0] && <PostsContainer posts={tweetResults} setPosts={setTweetResults} />}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1} className="w-full">
          {trendResults[0] && <PostsContainer posts={trendResults} setPosts={setTrendResults} />}
          {tweetResults[0] && <PostsContainer posts={tweetResults} setPosts={setTweetResults} />}{" "}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2} className="w-full">
          {userResults[0] && userResults.map((person) => <Person nickname={person.nickname} username={person.username} profile_image={person.profile_image} bio={person.bio ? person.bio : null} isFollowed={person.isFollowed} key={person._id} />)}{" "}
        </CustomTabPanel>
      </div>
      {user && <Widgets />}
      <ScrollToBottom onScrollToBottom={fetchData} />
    </div>
  )
}

export default SearchResults
