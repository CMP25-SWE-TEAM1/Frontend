import React, { useState } from "react"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import { Avatar } from "@mui/material"
import profilePicTest from "../../assets/profilePicTest.JPG"
import GeneralButton from "../Sidebar/Button"

import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import axios from "axios"

import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import VerifiedIcon from "@mui/icons-material/Verified"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"

import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined"
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined"
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import CircularProgress from '@mui/material/CircularProgress';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function ComposePost({ handleNewTweet }) {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null)
  const [description, setDescription] = useState("")
  const [replyPermissionIndex, setReplyPermissionIndex] = useState(0)
  const [runningMock,setRunningMock] = useState(false);
  const [charsCount,setCharsCount] = useState(0);
  const [charsProgressColor,setCharsProgressColor] = useState("#1D9BF0");
  const [progressCircleSize,setProgressCircleSize] = useState(24);
  const [progressCircleValue,setProgressCircleValue] = useState(null);

  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

    const APIs = {
      mock: { postTweetAPI: "https://aa80e208-6b14-409e-8ca1-1155aaa93e81.mock.pstmn.io/post/addPost" },
      actual: { postTweetAPI: "http://backend.gigachat.cloudns.org/api/tweets/" },
    }
    const getTweetDescription = ()=>{
      return document.querySelector("#description").value;
    } 
    const getComposeTweet = (()=>{
      return {
      description:`${runningMock?"ismail ramadan":getTweetDescription()}`,
      media: [
        {
          type: "jpg",
          data: "www.photo.png"
        },
      ],
      type: "tweet"
    }
  });
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
    console.log(getTweetDescription())
    console.log(userToken)
    axios
      .post(APIs.actual.postTweetAPI,getComposeTweet(), {
        headers: {
          authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA4ZDJhNGZkNGQ4MmE3OTcwZDgxZSIsImlhdCI6MTcwMTQ1NDQxMiwiZXhwIjoxNzA5MjMwNDEyfQ.AXj2UJzw8YGxajhtFrywNKWDvZmIF7yo1WSe3hXoUdY",
        }
      })
      .then((response) => {
        console.log(response.data)
        const post = {...response.data};
        if(runningMock){
          post.data.description = getTweetDescription();
          console.log(post);
        }
        handleNewTweet(post)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
    setCharsCount(e.target.value.length*100/280);
    setCharsProgressColor(e.target.value.length*100/280 <=80 ? "#1D9BF0" : e.target.value.length*100/280 <=100 ? "#fdd81f" : "#f4212e");
    setProgressCircleSize(e.target.value.length*100/280 <=80 ? 24 : 32);
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

  return (
    <form onSubmit={handleSubmit} className="ComposePost flex h-fit border border-l-0 border-r-0 border-lightBorder p-3 text-black dark:border-darkBorder dark:text-white" data-testid="postId">
      <div className=" h-10 w-10 sm:mr-3">
        <Avatar alt="Remy Sharp" src={user.profileImage} sx={{ width: 40, height: 40 }} />
      </div>
      <div className="mt-1.5 w-full">
        <TextField
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="What is happening?!"
          value={description}
          onChange={(e)=>handleDescriptionChange(e)}
          multiline
          fullWidth
          maxRows={23}
          sx={{
            border: "0px",
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "#000000",
            },
          }}
        />
        <div>
          <Button target={"_blank"} color="text-[#1D9BF0]" size="sm" variant="plain" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="my-3 rounded-full bg-transparent py-0 hover:bg-[#e7f5fd] dark:bg-transparent dark:hover:bg-[#031018]">
            <GeneralButton name={permissionOptions[replyPermissionIndex].icon2} color="text-[#1D9BF0]" backgroundColor="bg-transparent" height="h-6" width="w-6s"></GeneralButton>
            <div className="ml-0.5 text-[14px] normal-case text-[#1D9BF0]">{permissionOptions[replyPermissionIndex].name} can reply</div>
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
                <b>Who can reply?</b>
                <br />
                Choose who can reply to this post.
                <br />
                Anyone mentioned can always reply.
              </span>
            </div>
            {permissionOptions.map((option, index) => (
              <MenuItem key={option.name} onClick={(event) => handleMenuItemClick(event, index)}>
                <GeneralButton name={option.icon1} color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-10" width="w-10"></GeneralButton>
                <span className="ml-3 text-[15px] dark:text-white">
                  <b>{option.name}</b>{" "}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <hr className="h-px border-0 bg-lightBorder dark:bg-darkBorder" />
        <div className="flex justify-between pt-3">
          <div className="flex bg-transparent">
            <GeneralButton name={<InsertPhotoOutlinedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" />
            <GeneralButton name={<GifBoxOutlinedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" />
            <GeneralButton name={<BallotOutlinedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" />
            <GeneralButton name={<SentimentSatisfiedOutlinedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" />
            <GeneralButton name={<EditCalendarIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={true} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
            <GeneralButton name={<LocationOnOutlinedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={true} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
          </div>
          <div className="flex items-center">
          <Box sx={{ position: 'relative',top: '4px',border:'1.5px'}}>
          <CircularProgress variant="determinate" sx={{ color:"grey.200"}} size={progressCircleSize} value={100} />
          <CircularProgress variant="determinate" sx={{ position: 'absolute',
          left: 0, color: charsProgressColor}} size={progressCircleSize} value={charsCount} />
          <Box 
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // display: {progressCircleValue ? 'none' }
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {progressCircleValue}
        </Typography>
      </Box>
          </Box>
          <div className="px-3 py-1 border-l ml-3 border-gray-300">
          <GeneralButton name={<AddRoundedIcon fontSize="small" />} color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-6" width="w-6 border-[1.5px] border-gray-300 rounded-full" link="/compose/tweet" />
          </div>
          <button type="submit" className="rounded-full bg-[#1D9BF0] p-0">
            <GeneralButton name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-8" width="w-16" />
          </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ComposePost
