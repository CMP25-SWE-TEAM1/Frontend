import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import DisplayMedia from "../DisplayMedia"
import axios from "axios"
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import VerifiedIcon from "@mui/icons-material/Verified"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import Button from "@mui/material/Button"
import GeneralButton from "../../Sidebar/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Popup from "../Popup"
import ComposePostFooter from "./ComposePostFooter"
import { getColor } from "../../../constants"

function ComposePost({ buttonName, handleNewPost, postType, referredTweetId, handleClosePopup }) {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [description, setDescription] = useState("")
  const [replyPermissionIndex, setReplyPermissionIndex] = useState(0)
  const [runningMock, setRunningMock] = useState(false)
  const [charsCount, setCharsCount] = useState(0)
  const [charsProgressColor, setCharsProgressColor] = useState("#1D9BF0")
  const [progressCircleSize, setProgressCircleSize] = useState(24)
  const [progressCircleValue, setProgressCircleValue] = useState(null)
  const [media, setMedia] = useState([])
  const [mediaUrls, setMediaUrls] = useState([])
  const [mediaDisabled, setMediaDisabled] = useState(false)
  const [GIF, setGIF] = useState(null)
  const [GIFDisabled, setGIFDisabled] = useState(false)
  const [poll, setPoll] = useState(null)
  const [pollDisabled, setpollDisabled] = useState(false)
  const [postDisabled, setPostDisabled] = useState(true)
  const hiddenUploadMediaInput = useRef()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

  useEffect(() => {
    setPostDisabled(((description.length === 0 || (description.match(/\s/g) && description.match(/\s/g).length === description.length)) && media.length === 0) || description.length > 280)
  }, [description, media])

  const APIs = {
    mock: { postTweetAPI: "httpss://aa80e208-6b14-409e-8ca1-1155aaa93e81.mock.pstmn.io/post/addPost" },
    actual: { postTweetAPI: "https://backend.gigachat.cloudns.org/api/tweets/", uploadMedia: "https://backend.gigachat.cloudns.org/api/media", deleteMedia: "https://backend.gigachat.cloudns.org/api/media" },
  }
  const getComposeTweet = () => {
    return {
      referredTweetId: referredTweetId,
      description: `${runningMock ? "ismail ramadan" : description}`,
      media: media.map((item, index) => {
        return { data: mediaUrls[index], type: item.type.match(/mp4/) ? "mp4" : "jpg" }
      }),
      type: postType,
    }
  }
  const getMediaTypes = () => media.map((item) => (item.type.match(/image/) ? "jpg" : "mp4"))
  const openMenu = Boolean(anchorPostMenu)

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget)
  }
  const handleMenuClose = (event) => {
    setAnchorPostMenu(null)
  }
  const handleMenuItemClick = (event, index) => {
    setReplyPermissionIndex(index)
    setAnchorPostMenu(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("handleSubmit")
    console.log("description ", description)
    console.log("userToken ", userToken)
    setDescription("")
    setCharsCount(0)
    setCharsProgressColor("#1D9BF0")
    setProgressCircleSize(24)
    setProgressCircleValue(null)
    setMedia([])
    setMediaUrls([])
    setMediaDisabled(false)
    setGIFDisabled(false)
    setpollDisabled(false)
    console.log("getComposeTweet ", getComposeTweet(postType))
    axios
      .post(APIs.actual.postTweetAPI, getComposeTweet(), {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("success in handleSubmit")
        console.log("response.data ", response.data)
        const post = { ...response.data }
        if (runningMock) {
          post.data.description = description
          post.data.media = media.map((item, index) => {
            return { type: item.type.match(/mp4/) ? "mp4" : "jpg", data: mediaUrls[index] }
          })
          console.log("running mock")
          console.log(post)
        }
        handleNewPost && handleNewPost(post)
        handleClosePopup && handleClosePopup()
      })
      .catch((error) => {
        console.log("error in handleSubmit")
        console.log(error)
      })
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
    setCharsCount((e.target.value.length * 100) / 280)
    setCharsProgressColor(e.target.value.length < 260 ? "#1D9BF0" : e.target.value.length < 280 ? "#fdd81f" : "#f4212e")
    setProgressCircleSize(e.target.value.length < 260 ? 24 : 32)
    setProgressCircleValue(e.target.value.length >= 260 ? 280 - e.target.value.length : null)
  }
  const handleUploadMediaClick = (e) => {
    e.preventDefault()
    hiddenUploadMediaInput.current.click()
  }
  const handleUploadMedia = (uploadedMedia) => {
    //console.log(uploadedMedia.target.files[0]);
    // setMedia([uploadedMedia.target.files[0],...media]);
    if (uploadedMedia.target.files[0]) {
      const mediaFormData = new FormData()
      mediaFormData.append("media", uploadedMedia.target.files[0])
      axios
        .post(APIs.actual.uploadMedia, mediaFormData, {
          headers: {
            authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          console.log("in upload media")
          console.log(response.data)
          console.log("media", uploadedMedia.target.files[0])
          setMedia([...media, uploadedMedia.target.files[0]])
          if (media.length > 2) setMediaDisabled(true)
          else setMediaDisabled(false)
          setGIFDisabled(true)
          setpollDisabled(true)
          setMediaUrls([...mediaUrls, ...response.data.data.usls])
          //console.log(response.data.data.usls);
        })
        .catch((error) => {
          console.log(error)
        })
    } else console.log("uploading media error")
  }
  const handleDeleteMedia = (mediaUrl, index) => {
    console.log("inside delete media")
    console.log(mediaUrl, index)
    axios
      .delete(APIs.actual.deleteMedia, {
        params: {
          url: mediaUrl,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("in delete media")
        console.log(response.data)
        setMediaUrls(mediaUrls.filter((i) => i !== mediaUrl))
        setMedia(media.filter((i, ind) => ind !== index))
        setMediaDisabled(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const permissionOptions = [
    {
      name: "Everyone",
      icon1: <PublicOutlinedIcon fontSize="small" />,
      icon2: <PublicOutlinedIcon fontSize="small" />,
    },
    {
      name: "Accounts you follow",
      icon1: <HowToRegOutlinedIcon fontSize="small" />,
      icon2: <HowToRegIcon fontSize="small" />,
    },
    {
      name: "Verified accounts",
      icon1: <VerifiedOutlinedIcon fontSize="small" />,
      icon2: <VerifiedIcon fontSize="small" />,
    },
    {
      name: "Only accounts you mention",
      icon1: <AlternateEmailIcon fontSize="small" />,
      icon2: <AlternateEmailIcon fontSize="small" />,
    },
  ]

  const htmlElement = document.getElementById("htmlid")

  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div className={`ComposePost flex h-fit border-b ${buttonName === "Post" ? "border-t" : ""} border-lightBorder p-3 text-black dark:border-darkBorder dark:text-white`} data-testid="postId">
      <div className=" h-10 w-10 sm:mr-3">
        <Link className="hover:underline" to={`/${user.username}`}>
          <Avatar alt={user.username} src={user.profileImage} sx={{ width: 40, height: 40 }} />
        </Link>
      </div>
      <div className="mt-1.5 w-full">
        <TextField
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={`${buttonName === "Post" ? "What is happening?!" : "Post your reply"}`}
          onChange={(e) => handleDescriptionChange(e)}
          multiline
          fullWidth
          maxRows={23}
          sx={{
            border: "0px",
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "#000000",
            },
          }}
        >
          <span className="bg-[#f4212e]">{description.slice(0, 280)}</span>
          <span className="text-[#f4212e]">{description.slice(280, description.length)}</span>
        </TextField>
        <DisplayMedia mediaUrls={mediaUrls} mediaTypes={getMediaTypes()} margin={1.5} handleDeleteMedia={handleDeleteMedia} showCancelButton={true} />
        <div className={`replyPermission ${buttonName === "Post" ? "" : "hidden"}`}>
          <Button target={"_blank"} color={"text-secondColor"} size="sm" variant="plain" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="my-3 rounded-full bg-transparent py-0 hover:bg-[#e7f5fd] dark:bg-transparent dark:hover:bg-[#031018]">
            <GeneralButton name={permissionOptions[replyPermissionIndex].icon2} color={"text-" + getColor(themeColor)} backgroundColor="bg-transparent" height="h-6" width="w-6"></GeneralButton>
            <div className={`ml-0.5 text-[14px] normal-case ${"text-" + getColor(themeColor)}`}>{permissionOptions[replyPermissionIndex].name} can reply</div>
          </Button>
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
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="ml-3 flex items-center">
              <span className="text-[15px] dark:text-white">
                <p>
                  <b>Who can reply?</b>
                </p>
                <div className="text-sm text-secondary">
                  <p>Choose who can reply to this post.</p>
                  <p>Anyone mentioned can always reply.</p>
                </div>
              </span>
            </div>
            {permissionOptions.map((option, index) => (
              <MenuItem key={option.name} onClick={(event) => handleMenuItemClick(event, index)}>
                <GeneralButton name={option.icon1} color="text-white" backgroundColor="bg-primary" height="h-10" width="w-10"></GeneralButton>
                <span className="ml-3 text-[15px] dark:text-white">
                  <b>{option.name}</b>{" "}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <hr className={`h-px border-0 bg-lightBorder dark:bg-darkBorder ${buttonName === "Post" ? "" : "hidden"}`} />
        <ComposePostFooter buttonName={buttonName} handleUploadMediaClick={handleUploadMediaClick} handleUploadMedia={handleUploadMedia} hiddenUploadMediaInput={hiddenUploadMediaInput} mediaDisabled={mediaDisabled} GIFDisabled={GIFDisabled} pollDisabled={pollDisabled} postDisabled={postDisabled} progressCircleSize={progressCircleSize} charsCount={charsCount} charsProgressColor={charsProgressColor} progressCircleValue={progressCircleValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default ComposePost
