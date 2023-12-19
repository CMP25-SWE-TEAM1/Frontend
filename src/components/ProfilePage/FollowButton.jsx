import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ProfileRequests from "./profilerequests"

const FollowButton = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { token } = useSelector((state) => state.user)
  const mock = false
  const [buttonstate, setbuttonstate] = useState(props.buttonName)

  const navigate = useNavigate();
  // there should be a conditional rendering by back
  useEffect(() => {
    setbuttonstate(props.buttonName)
  }, [props.buttonName])
  
  const APIs = {
    followmock: { postfollowProfileAPI: `http://localhost:3001/api/user/${props.tag}/follow` },
    followactual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
    unfollowmock: { postfollowProfileAPI: `http://localhost:3001/api/user/${props.tag}/unfollow` },
    unfollowactual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
    unblockmock: { unBlock:   `http://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
  }
  function HandleClick() {
    if (buttonstate === "Edit Profile") {
      props.handleOpenProfileEditModal()
       navigate('/settings/profile')
    } else if (buttonstate === "Follow") {
     ProfileRequests.follow(false,APIs,token,setbuttonstate)
    } else if(buttonstate === "Following") {
    ProfileRequests.unfollow(false,APIs,token,setbuttonstate)
    }
    else {
      ProfileRequests.unblock(false,APIs,token)
    }
  }
  return (
    <>
      <button
        id="follow-button"
        onClick={() => {
          HandleClick()
        }}
        className={` 
              ${
                darkMode
                  ? buttonstate === "Follow"
                      ? `bg-white text-black
                        hover:bg-darkHover dark:hover:bg-lightHover`
                      : `bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover `
                  : buttonstate === "Follow"
                      ? `bg-black text-white hover:bg-darkHover dark:hover:bg-lightHover`
                      : `bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover`
                } 
                h-[35px] w-[110px] 
                rounded-full border border-lightBorder text-center font-semibold
                dark:border-darkBorder
                ${
                  buttonstate === "Following"
                    ? `bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)]
                `
                    : ``
                }
                ${
                  buttonstate === "Blocked"
                  ?
                  `blockedbt  text-white  hover:text-white`
                    : ``
                }`}
      >
        <span>{buttonstate}</span>
      </button>
     
    </>
  )
}

export default FollowButton
