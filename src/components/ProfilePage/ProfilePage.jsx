import {  useSelector } from "react-redux"
import React from "react"
import FollowButton from "./FollowButton"
import ProfileMediabuttons from "./ProfileMediabuttons"
import ProfileICons from "./ProfileICons"
import ProfileBio from "./ProfileBio"
import ProfileImage from "./ProfileImage"
import CoverImage from "./CoverImage"
import ProfileName from "./ProfileName"
import Followers from "./Followers"
import { useEffect } from "react"
import { useState } from "react"

import Header from "./Header"
import ProfilePageEdit from "./ProfilePageEdit/ProfilePageEdit"
import { useParams } from "react-router-dom"
import Details from "./Details"
import Widgets from "../Widgets/Widgets"

import ProfileRequests from "./profilerequests"
import BlockButton from "./BlockButton"
import EditProfileButton from "./EditProfileButton"
import BlockedBy from "./BlockedBy"
import Blocked from "./Blocked"

const ProfilePage = (props) => {
  const { user } = useSelector((state) => state.user)
  const { token } = useSelector((state) => state.user)
  const [profileres, setProfile] = useState([])
  const mock = false
  const [buttonstate,setButtonstate]= useState()
  const [profilePicURL, setProfilePicURL] = useState()
  const [bannerPicURL, setCoverPicURL] = useState()
  const [detailspos, setDetailsPos] = useState()
  const [viewpoststate,setViewPost] = useState()
  const { tag } = useParams()
  const APIs = {
    mock: { getProfileAPI: `https://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `https://backend.gigachat.cloudns.org/api/user/profile/` },
  }

 
  useEffect(() => {
    if (tag) {
      if (user.username !== tag) {
        ProfileRequests.getOtherprofile(false,APIs,tag,setProfile,token,setProfilePicURL,setCoverPicURL,setDetailsPos,setButtonstate,setViewPost)
       } else {
        ProfileRequests.getMyprofile(false,APIs,token,setProfile,setProfilePicURL,setCoverPicURL)
       }
    }
  }, [tag])

  console.log(profilePicURL)
  // //console.log(profileres.is_curr_user)
  return (
    <div className=" flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div
        className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow 
      overflow-y-scroll border border-b-0 border-t-0 border-lightBorder 
      dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-[600px]"
      >
        <div
          id="Profile"
          className="flex h-[100%] flex-col border border-b-0 
        border-t-0 border-lightBorder dark:border-darkBorder md:w-[100%]"
        >
          <Header profilename={profileres.nickname} text={profileres.num_of_posts} likenum={profileres.num_of_likes}></Header>
          <div id="Upperhalf" className="relative m-0 h-[35vh] w-[100%]">
            <CoverImage height={"h-[25vh]"} coverimage={bannerPicURL}></CoverImage>
            <div className="relative top-[-75px] flex h-[25%]  flex-row ">
              <ProfileImage profileimage={profilePicURL} profileimageURL={profilePicURL}></ProfileImage>
             {profileres.is_curr_user === false && <Details position={detailspos} ismuted={profileres.is_wanted_user_muted} isblocked={profileres.is_wanted_user_blocked}  tag={tag} display={`${tag=== user.username ? `hidden`: `block`}`}></Details> }
             <div id="Button-div" className={`absolute ${tag===user.username? `right-[0px]`:`right-[10px]`} top-[90px] m-0  `}>
             {profileres.is_wanted_user_blocked && !(tag === user.username) && !profileres.is_curr_user_blocked && <BlockButton isblocked={profileres.is_wanted_user_blocked && !(tag===user.username) } tag = {tag}></BlockButton>}
              {tag !== user.username && profileres.is_wanted_user_blocked === false && profileres.is_curr_user_blocked === false && <FollowButton  setButtonstate={setButtonstate} setDetailsPos={setDetailsPos} display={profileres.is_wanted_user_blocked || tag===user.username? 'hidden':'block'}  tag={tag} buttonName={ buttonstate}></FollowButton>}
              <EditProfileButton handleOpenProfileEditModal={props.handleOpenProfileEditModal} display={tag===user.username ? `display`:`hidden` }></EditProfileButton>
              </div>
            </div>
          </div>
          {(profileres.is_curr_user_blocked === false || tag === user.username) && <>
          <ProfileName profilename={profileres.nickname} profiletag={profileres.username}></ProfileName>
          <ProfileBio profilebio={profileres.bio}></ProfileBio>
          <ProfileICons profilelocation={profileres.location} profilewebsite={profileres.website} profilejoindate={profileres.joined_date} profilebirthdate={profileres.birth_date}></ProfileICons>
          <Followers followers={profileres.followers_num} following={profileres.followings_num}></Followers>
          <ProfilePageEdit openModal={props.openModal} handleCloseModal={props.handleCloseModal}></ProfilePageEdit>
          {(viewpoststate === true || tag === user.username)  && <ProfileMediabuttons></ProfileMediabuttons>}
          </>}
          {profileres.is_curr_user_blocked&& <BlockedBy tag={tag}></BlockedBy>}
      {profileres.is_curr_user_blocked === false && viewpoststate === false &&
      <Blocked tag={tag} setViewPost={setViewPost}></Blocked>
      }
         
        </div>
      </div>
   
      {user && <Widgets parent={"profile"} />}
    </div>
  )
}
export default ProfilePage
