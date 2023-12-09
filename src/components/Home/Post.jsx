import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import VerifiedIcon from "@mui/icons-material/Verified"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import DisplayMedia from "./DisplayMedia"

const Post = ({ userProfilePicture, userName, userTag, date, replyCount, repostCount, likeCount, viewCount, description, media }) => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaTypes, setMediaTypes] = useState([])
  const descriptionLines = description.split("\n") //need check for writing \n in description
  useEffect(() => {
    const urls = media.map((item) => item.data)
    const types = media.map((item) => item.type)
    // console.log("urls from post comp",urls);
    // console.log("types from post comp",types);
    setMediaUrls(urls)
    setMediaTypes(types)
  }, [media])

  const openMenu = Boolean(anchorPostMenu)

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorPostMenu(null)
  }

  //"Thu Oct 26 2023 23:18:01 GMT+0200 (Eastern European Standard Time)" we need date in this format

  const htmlElement = document.getElementById("htmlid")

  const time1 = Date.parse(date)
  const time2 = new Date().getTime()

  const differenceInMilliseconds = time2 - time1

  const differenceInSeconds = differenceInMilliseconds / 1000
  const differenceInMinutes = differenceInSeconds / 60
  const differenceInHours = differenceInMinutes / 60

  const intDifferenceInSeconds = Math.floor(differenceInSeconds)
  const intDifferenceInMinutes = Math.floor(differenceInMinutes)
  const intDifferenceInHours = Math.floor(differenceInHours)

  const finalDate = intDifferenceInHours > 24 ? Math.floor(intDifferenceInHours / 24) + "d" : intDifferenceInHours ? intDifferenceInHours + "h" : intDifferenceInMinutes ? intDifferenceInMinutes + "m" : intDifferenceInSeconds + "s"

  return (
    // <Link className="w-full" to={`/${userTag}/status/tweetId`}>
    <div className=" flex h-fit border border-l-0 border-r-0 border-lightBorder p-3 dark:border-darkBorder" data-testid="postId">
      <div className=" h-fit w-10 sm:mr-3">
        <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 40, height: 40 }} />
      </div>
      <div className=" w-full sm:mr-2">
        <div className="post-header flex items-center justify-between">
          <div className="flex items-center">
            <Link className="hover:underline" to="/mohamedsamir">
              {userName}
              <VerifiedIcon className="pl-1 text-primary" sx={{ fontSize: "22px" }} />
            </Link>
            <Link className="ml-1 text-sm text-ternairy dark:text-secondary">@{userTag}</Link>
            <div className="m-1 h-[2px] w-[2px] rounded-full bg-ternairy dark:bg-secondary"></div>
            <Link className="text-sm text-ternairy dark:text-secondary" to="/postid">
              {finalDate}
            </Link>
          </div>
          <div>
            <MoreHorizIcon target={"_blank"} variant="text" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="bg-transparent text-secondary" />
            <Menu
              id="basic-menu"
              anchorEl={anchorPostMenu}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleMenuClose} className="flex items-center">
                <SentimentVeryDissatisfiedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Not interested in this post</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <PersonAddAltIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Follow @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <VolumeOffOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Mute @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <BlockOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">Block @{userTag}</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <QueryStatsOutlinedIcon className="mr-3 text-base dark:text-white" />
                <span className="text-[15px] dark:text-white">View post engagements</span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="post-text">
          <div className="max-h-[100px] overflow-hidden text-start dark:text-gray-300" data-testid="post-text-id">
            {descriptionLines.map((line) => (
              <p>
                {line}
                <br />
              </p>
            ))}
          </div>
          {/* <div>show more</div> */}
        </div>
        <div className="post-media mt-3">
          <DisplayMedia mediaUrls={mediaUrls} mediaTypes={mediaTypes} margin={1} />
        </div>
        <div className="post-footer mt-3 flex max-w-full justify-between text-ternairy dark:text-secondary">
          <div className="group -ml-2 flex cursor-pointer items-center transition-colors  duration-300 hover:text-primary" title="Reply">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900 ">
              <ChatBubbleOutlineOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{replyCount}</span>
          </div>
          <div className="  group flex cursor-pointer items-center transition-colors duration-300 hover:text-green-500" title="Repost">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900 ">
              <CachedOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{repostCount}</span>
          </div>
          <div className="  group flex cursor-pointer items-center transition-colors duration-300 hover:text-pink-600" title="Like">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900">
              <FavoriteBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="  group flex cursor-pointer  items-center transition-colors duration-300 hover:text-primary" title="Views">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900 ">
              <QueryStatsOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{viewCount}</span>
          </div>
          <div className="bookmarkUpload flex">
            <div className={`group flex cursor-pointer items-center transition-colors duration-300 hover:text-primary`} title="Bookmark">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900">
                <BookmarkBorderOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
              </div>
            </div>
            <div className="  group flex cursor-pointer items-center transition-colors duration-300 hover:text-primary" title="Share">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-gray-100 dark:group-hover:bg-gray-900">
                <FileUploadOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  )
}

export default Post
