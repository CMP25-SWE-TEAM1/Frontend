import { useSelector } from "react-redux"
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
import { useParams } from "react-router-dom"
import Details from "./Details"
const ProfilePage = (handleOpenProfileEditModal, openModal, handleCloseModal) => {
  const { user } = useSelector((state) => state.user)
  const { token } = useSelector((state) => state.user)
  const [profileres, setProfile] = useState([])

  const mock = false

  const [windowWidth, setWindowWidth] = useState(window.innerWidth) //todo: for responsiveness
  const [profilePicURL, setProfilePicURL] = useState()
  const [bannerPicURL, setCoverPicURL] = useState()
  let { tag } = useParams()
  const APIs = {
    mock: { getProfileAPI: `http://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `http://backend.gigachat.cloudns.org/api/user/profile/` },
  }
  const Fetch = () => {
    setTimeout(() => {
      if (tag) {
        if (user.username !== tag) {
          axios
            .get(mock ? APIs.mock.getProfileAPI + `${tag}` : APIs.actual.getProfileAPI + `${tag}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log(`Bearer ${token}`)
                setProfilePicURL(res.data.user.profile_image)
                setCoverPicURL(res.data.user.banner_image)
                setProfile(res.data.user)
              }
            })
            .catch((err) => {
              console.log(tag)
              console.log(err)
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
                console.log(`Bearer ${token}`)
                setProfilePicURL(res.data.user.profile_image)
                setCoverPicURL(res.data.user.banner_image)
                res.data.user.is_curr_user = true
                setProfile(res.data.user)
              }
            })
            .catch((err) => {
              console.log(tag)
              console.log(err)
            })
        }
      } else {
        Fetch()
      }
    }, 100)
  }
  useEffect(Fetch, [])
 
  // console.log(profileres.is_curr_user)
  return (
    <div
      id="Profile"
      className="flex h-[100%] flex-col border border-b-0 
        border-t-0 border-lightBorder dark:border-darkBorder md:w-[100%] lg:w-[42%]"
    >
      <div id="Upperhalf" className="mb-[10%] h-[50%] md:w-[100%] lg:w-[100%]">
        <Header profilename={profileres.nickname} postsnum={profileres.followers_num}></Header>
        <CoverImage coverimage={bannerPicURL}></CoverImage>
        <div className="flex flex-row">
          <ProfileImage profileimage={profilePicURL} profileimageURL={profilePicURL}></ProfileImage>
          <Details display={profileres.is_curr_user === "Edit Profile" ? `hidden` : `inline-block`}></Details>
          <FollowButton tag={tag} buttonName={profileres.is_curr_user ? `Edit Profile` : profileres.is_wanted_user_followed ? `Following` : `Follow`}></FollowButton>
        </div>
        <ProfileName profilename={profileres.nickname} profiletag={profileres.username}></ProfileName>
      </div>
      <ProfileBio profilebio={profileres.bio}></ProfileBio>
      <ProfileICons profilelocation={profileres.location} profilewebsite={profileres.website} profilejoindate={profileres.joined_date}></ProfileICons>
      <Followers followers={profileres.followers_num} following={profileres.following_num}></Followers>
      <ProfileMediabuttons></ProfileMediabuttons>
      <ProfilePageEdit openModal={false} handleCloseModal={handleCloseModal}></ProfilePageEdit>
    </div>
  )
}
export default ProfilePage
