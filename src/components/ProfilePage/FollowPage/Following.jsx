import React from 'react'
import { Link } from "react-router-dom"
import BlockIcon from "@mui/icons-material/Block"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import FollowButton from '../FollowButton'
import {useParams} from 'react-router-dom'
import followPagerequests from './followPagerequests'
function Following() {
    const userd = useSelector((state)=>state.user.user)
    const {token} = useSelector((state)=>state.user)
    const {tag} = useParams()
    const [followings,setFollowings] =useState([])
    const darkMode = useSelector((state)=>(state.theme.darkMode))
    const APIs = {
      mock: { getProfileAPI: `https://localhost:3001/api/profile/` },
      actual: { getFollowings: `https://backend.gigachat.cloudns.org/api/user/profile/${tag}/followings` },
      followactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/` },
      unfollowactual: { postfollowProfileAPI: `https://backend.gigachat.cloudns.org/api/user/` },
    }
    useEffect(()=>{
      console.log(followPagerequests.getfollowings)
      followPagerequests.getfollowings(false,APIs,token,setFollowings)
    }
    ,[])
   function  HandleClick(e)
   {
    for(let i =0 ; i < followings.length;i++)
      {
        if(followings[i].username === e.currentTarget.id)
          {
             if(followings[i].Followstate ==="Follow")
             {
              followPagerequests.follow(false,APIs,token,setFollowings,followings,e.currentTarget.id)
             }
             else
             {
              followPagerequests.unfollow(false,APIs,token,setFollowings,followings,e.currentTarget.id)
             }
                    
          }
      }
   }
   
  return (
    <div>
    {followings.map((user) => (
      <div key={user.id} className="flex h-[85px] w-[100%] hover:bg-lightHover dark:hover:bg-darkHover">
        <div className="w-[10%] pl-2">
          <Link to={`/${user.username}`}>
            <img src={user.profile_image} alt="Profile" className="mt-1 h-10 w-10 rounded-3xl" />
          </Link>
        </div>
        <div className="w-[70%] text-ellipsis ">
          <Link to={`/${user.username}`}>
            <h1 className="font-bold hover:underline">{user.nickname}</h1>
            <h2 className="text-sm text-secondary">{`@${user.username}`}</h2>
            <p className="text-sm truncate   ">{user.bio}</p>
          </Link>
        </div>
        <div className="m-auto">
        <button
        id={user.username}
        data-Followstate={user.Followstate}
        onClick={(e) => {
          HandleClick(e)
        }}
        className={` ${user.username === userd.username? `hidden`:`block`}
              ${
                darkMode
                  ? user.Followstate === "Follow"
                      ? `bg-white text-black
                        hover:bg-darkHover dark:hover:bg-lightHover w-[80px]`
                      :
                       `ml-[-5px] bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)] w-[120px] `
                  : user.Followstate === "Follow"
                      ? `bg-black text-white hover:bg-darkHover dark:hover:bg-lightHover  w-[80px]`
                      :
                       `ml-[-5px] bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover
                        bt hover:border-[rgb(244,33,46)]  hover:text-[rgb(244,33,46)] w-[120px]`
                } 
                relative h-[40px]  
                rounded-full border border-lightBorder text-center  font-[500]
                dark:border-darkBorder`}
      >
        <span id={`${user.username}s`}>{user.Followstate}</span>
      </button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Following