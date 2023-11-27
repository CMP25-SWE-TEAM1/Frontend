import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import TextField from '@mui/material/TextField'
import { Avatar } from "@mui/material"
import profilePicTest from "../../assets/profilePicTest.JPG"
import GeneralButton from "../Sidebar/Button"

import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import axios from "axios"

import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VerifiedIcon from "@mui/icons-material/Verified";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


function ComposePost() {
    const [anchorPostMenu, setAnchorPostMenu] = useState(null)
    const [description, setDescription] = useState("")
    const [replyPermissionIndex,setReplyPermissionIndex] = useState(0)

    const APIs = {
      mock: { postTweetAPI: "https://bad9e0a6-fe2e-4d82-b68f-51c141e126d9.mock.pstmn.io/tweet/addTweet2" },
      actual: { postTweetAPI: "http://13.48.45.126:3000/api/tweets/" },
    }
    const getComposeTweet = (()=>{
      return {
      referredTweetId: "",
      description: document.querySelector("#description").value,
      media: [
        {
          type: "jpg",
          data: "www.photo.png"
        }
      ],
      type: "tweet"
    }
    })
  const openMenu = Boolean(anchorPostMenu)

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget)
  }
  const handleMenuClose = (event) => {
    setAnchorPostMenu(null)
  }
  const handleMenuItemClick = (event, index) => {
    setReplyPermissionIndex(index);
    setAnchorPostMenu(null);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(document.querySelector("#description").value)
      const composeTweet = getComposeTweet();
      axios.post(APIs.mock.postTweetAPI,JSON.stringify(composeTweet)).then(response=>{
        console.log(response.data);
      }).catch(error=>{
        console.log(error);
      });
  }
  const permissionOptions = [
    {
      name:"Everyone",
      icon:<PublicOutlinedIcon />
    },
    {
      name:"Accounts you follow",
      icon:<HowToRegOutlinedIcon />
    },
    {
      name:"Verified accounts",
      icon:<VerifiedOutlinedIcon />
    },
    {
      name:"Only accounts you mention",
      icon:<AlternateEmailIcon />
    }
  ]

  const htmlElement = document.getElementById("htmlid")

  return (
    <form onSubmit={handleSubmit} className="ComposePost border-lightBorder dark:border-darkBorder flex h-fit border border-l-0 border-r-0 p-3" data-testid="postId">
    <div className=" h-10 w-10 sm:mr-3">
      <Avatar alt="Remy Sharp" src={profilePicTest} sx={{ width: 40, height: 40 }} />
    </div>
    <div className="w-full mt-1.5">
    <TextField
          id="description"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder="What is happening?!"
          value={description}
          onChange={e=>setDescription(e.target.value)}
          multiline
          fullWidth 
          maxRows={23}
          sx={{border: "0px"}}
        />
        <div >
            <Button target={"_blank"} color="text-[#1D9BF0]" size="sm" variant="plain" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="bg-transparent rounded-full py-0 my-3">
              <GeneralButton name={permissionOptions[replyPermissionIndex].icon} color="text-[#1D9BF0]" backgroundColor="" height="h-6" width="w-6s"></GeneralButton>
              <span className="ml-0.5 normal-case text-[12px] text-[#1D9BF0]"><b>{permissionOptions[replyPermissionIndex].name} can reply</b> </span>
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
                <span className="text-[15px]">
                <b>Who can reply?</b><br/>
                Choose who can reply to this post.<br/>
                Anyone mentioned can always reply.</span>
              </div>
              {permissionOptions.map((option,index)=><MenuItem 
              key={option.name}
              onClick={(event) => handleMenuItemClick(event, index)}
              >
              <GeneralButton name={option.icon} color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-10" width="w-10"></GeneralButton>
              <span className="ml-3 text-[15px] dark:text-white"><b>{option.name}</b> </span>
              </MenuItem>)}
            </Menu>
        </div>
        <hr/>
        <div className="pt-3 flex justify-between">
        <div className="flex">
          <GeneralButton name={<InsertPhotoOutlinedIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" />
        <GeneralButton name={<GifBoxOutlinedIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" />
        <GeneralButton name={<BallotOutlinedIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" />
        <GeneralButton name={<SentimentSatisfiedOutlinedIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" />
        <GeneralButton name={<EditCalendarIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" disabled={true} disabledColor="text-[#b0dbf9]"/>
        <GeneralButton name={<LocationOnOutlinedIcon/>} color="text-[#1D9BF0]" backgroundColor="" height="h-8" width="w-8" link="/compose/tweet" disabled={true} disabledColor="text-[#b0dbf9]"/>
        </div>
        <button type="submit" className="bg-[#1D9BF0] p-0 rounded-full"><GeneralButton name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-8" width="w-16" /></button>
        </div>
   </div>
   </form>
  )
}

export default ComposePost
