import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
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
import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"
import Header from "./Header"
import ProfilePageEdit from "./ProfilePageEdit"
import { useLocation, useParams } from "react-router-dom"
import Details from "./Details"
import Widgets from "../Widgets/Widgets"
import { changeUser } from "../../store/UserSlice"
import { DefaultCoverPage } from "../../constants"

const ProfilePage = (props) => {
  const { user } = useSelector((state) => state.user)
  const { token } = useSelector((state) => state.user)
  const [profileres, setProfile] = useState([])
  const mock = false

  const [windowWidth, setWindowWidth] = useState(window.innerWidth) //todo: for responsiveness
  const [profilePicURL, setProfilePicURL] = useState()
  const [bannerPicURL, setCoverPicURL] = useState()
  const { tag } = useParams()
  const dispatch = useDispatch()
  const APIs = {
    mock: { getProfileAPI: `http://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/` },
  }

  const Fetch = () => {
        if (user.username !== tag) {
          axios
            .get(mock ? APIs.mock.getProfileAPI + `${tag}` : APIs.actual.getProfileAPI + `${tag}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                //console.log(res)
                //console.log(`Bearer ${token}`)
                setProfilePicURL(res.data.user.profile_image)
                setCoverPicURL(res.data.user.banner_image? res.data.user.banner_image : DefaultCoverPage)
                
                setProfile(res.data.user)
              }
            })
            .catch((err) => {
              //console.log(tag)
              //console.log(err)
            })
        } else {
          axios
            .get(mock ? APIs.mock.getProfileAPI : APIs.actual.getProfileAPI, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                // //console.log(`Bearer ${token}`)
               // //console.log(res)
                setProfilePicURL(res.data.user.profile_image)
                const banner_image = res.data.user.banner_image ? res.data.user.banner_image : DefaultCoverPage
                setCoverPicURL(banner_image)
                const newUser = {...res.data.user, banner_image:banner_image }   
                setProfile(newUser)
              
                dispatch(changeUser(newUser))
              }
            })
            .catch((err) => {
              //console.log(tag)
              //console.log(err)
            })
        }
  }
  useEffect(() => {
    if (tag) {
      Fetch()
    }
  }, [tag])

  // //console.log(profileres.is_curr_user)
  return (
    <div className=" flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow 
      overflow-y-scroll border border-b-0 border-t-0 border-lightBorder 
      dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-[600px]">
        <div
          id="Profile"
          className="flex h-[100%] flex-col border border-b-0 
        border-t-0 border-lightBorder dark:border-darkBorder md:w-[100%]"
        >
          <div id="Upperhalf" className="relative m-0 h-[42vh] w-[100%]">
            <Header profilename={profileres.nickname} postsnum={profileres.num_of_posts}></Header>
            <CoverImage height={"h-[25vh]"} coverimage={bannerPicURL}></CoverImage>
            <div className="flex flex-row relative h-[25%]  top-[-75px] ">
              <ProfileImage profileimage={profilePicURL} profileimageURL={profilePicURL}></ProfileImage>
              <Details ismuted={profileres.is_wanted_user_muted} isblocked={profileres.is_wanted_user_blocked} tag={tag} display={`${tag=== user.username ? `hidden`: `block`}`}></Details>
             <div id="follow-button-div" className={`relative ${tag===user.username? `left-[25vw]`:`left-[21vw]`} top-[75px] mx-0 mt-[2%] `}>
              <FollowButton  handleOpenProfileEditModal={props.handleOpenProfileEditModal} tag={tag} buttonName={tag=== user.username ? `Edit Profile` : profileres.is_wanted_user_followed ? `Following` : `Follow`}></FollowButton>
              </div>
            </div>
          </div>
          <ProfileName profilename={profileres.nickname} profiletag={profileres.username}></ProfileName>
          <ProfileBio profilebio={profileres.bio}></ProfileBio>
          <ProfileICons profilelocation={profileres.location} profilewebsite={profileres.website} profilejoindate={profileres.joined_date}></ProfileICons>
          <Followers followers={profileres.followers_num} following={profileres.followings_num}></Followers>
          <ProfilePageEdit openModal={props.openModal} handleCloseModal={props.handleCloseModal}></ProfilePageEdit>
          <ProfileMediabuttons></ProfileMediabuttons>
        </div>
      </div>

      {user && <Widgets parent={"profile"} />}
    </div>
  )
}
export default ProfilePage
