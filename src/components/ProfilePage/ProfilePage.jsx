import { useSelector } from "react-redux"
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
import { Link } from "react-router-dom"
import Header from "./ProfileHeader"
import ProfilePageEdit from "./ProfilePageEdit/ProfilePageEdit"
import { useParams } from "react-router-dom"
import Details from "./Details"
import Widgets from "../Widgets/Widgets"

import ProfileRequests from "./profilerequests"
import BlockButton from "./BlockButton"
import EditProfileButton from "./EditProfileButton"
import BlockedBy from "./BlockedBy"
import Blocked from "./Blocked"

import { useNavigate } from "react-router-dom"

const ProfilePage = (props) => {
  const { user } = useSelector((state) => state.user)
  const { token } = useSelector((state) => state.user)
  const [profileres, setProfile] = useState([])
  const mock = false
  const [buttonstate, setButtonstate] = useState()
  const [profilePicURL, setProfilePicURL] = useState()
  const [bannerPicURL, setCoverPicURL] = useState()
  const [detailspos, setDetailsPos] = useState()
  const [viewpoststate, setViewPost] = useState()
  const [followingnum, setFollowingnum] = useState()
  const [followersnum, setFollowersnum] = useState()
  const { tag } = useParams()
  const APIs = {
    mock: { getProfileAPI: `https://localhost:3001/api/profile/` },
    actual: { getProfileAPI: `https://backend.gigachat.cloudns.org/api/user/profile/` },
    unmuteactual: { unmute: `https://backend.gigachat.cloudns.org/api/user` },
  }

  useEffect(() => {
    if (tag) {
      if (user) {
        if (user.username !== tag) {
          ProfileRequests.getOtherprofile(false, APIs, tag, setProfile, token, setProfilePicURL, setCoverPicURL, setDetailsPos, setButtonstate, setViewPost, setFollowersnum, setFollowingnum)
        } else {
          ProfileRequests.getMyprofile(false, APIs, token, setProfile, setProfilePicURL, setCoverPicURL, setFollowersnum, setFollowingnum)
        }
      }
    }
  }, [tag])

  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/")
    }
  }, [])

  // console.log(profilePicURL)
  // console.log(profileres.is_curr_user)
  return (
    <div className=" flex flex-1 flex-grow-[8] ">
      {user && (
        <div className="home ml-0 mr-1 w-full max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder  max-xs:border-l-0 max-xs:border-r-0 sm:w-[600px]">
          {profileres && (
            <div
              id="Profile"
              className="flex h-[100%] flex-col border border-b-0 
        border-t-0 border-lightBorder dark:border-darkBorder md:w-[100%]"
            >
              <Header profilename={profileres.nickname} postsnum={profileres.num_of_posts} likenum={profileres.num_of_likes}></Header>
              <div id="Upperhalf" className="relative m-0 h-[35vh] w-[100%]">
                <CoverImage height={"h-[25vh]"} coverimage={bannerPicURL}></CoverImage>
                <div className="relative top-[-75px] flex h-[25%]  flex-row ">
                  <ProfileImage profileimage={profilePicURL} profileimageURL={profilePicURL}></ProfileImage>
                  {profileres.is_curr_user === false && <Details position={detailspos} ismuted={profileres.is_wanted_user_muted} isblocked={profileres.is_wanted_user_blocked} tag={tag} display={`${profileres.is_curr_user ? `hidden` : `block`}`}></Details>}
                  <div id="Button-div" className={`absolute ${profileres.is_curr_user ? `right-[0px]` : `right-[10px]`} top-[90px] m-0  `}>
                    {profileres.is_wanted_user_blocked && !profileres.is_curr_user && !profileres.is_curr_user_blocked && <BlockButton isblocked={profileres.is_wanted_user_blocked && !profileres.is_curr_user} tag={tag}></BlockButton>}
                    {!profileres.is_curr_user && profileres.is_wanted_user_blocked === false && profileres.is_curr_user_blocked === false && <FollowButton setButtonstate={setButtonstate} setDetailsPos={setDetailsPos} setFollowersnum={setFollowersnum} followersnum={followersnum} display={profileres.is_wanted_user_blocked || profileres.is_curr_user ? "hidden" : "block"} tag={tag} buttonName={buttonstate}></FollowButton>}
                    <EditProfileButton handleOpenProfileEditModal={props.handleOpenProfileEditModal} display={profileres.is_curr_user ? `display` : `hidden`}></EditProfileButton>
                  </div>
                </div>
              </div>
              {(profileres.is_curr_user_blocked === false || profileres.is_curr_user) && (
                <>
                  <ProfileName profilename={profileres.nickname} profiletag={profileres.username}></ProfileName>

                  <ProfileBio profilebio={profileres.bio}></ProfileBio>
                  <ProfileICons profilelocation={profileres.location} profilewebsite={profileres.website} profilejoindate={profileres.joined_date} profilebirthdate={profileres.birth_date}></ProfileICons>
                  {profileres.is_wanted_user_muted && (
                    <div id="muted" className={`relative mb-[2.5%] ml-[2.5%] w-[100%] `}>
                      <span id="muted" className={`mt-[5px] whitespace-nowrap text-[13px]  font-light text-[rgb(150,150,150)] `}>
                        You have muted posts from this account.
                      </span>
                      <button
                        className="whitespace-nowrap bg-transparent  text-sm
            font-light text-[rgb(23,129,200)] before:text-white hover:underline"
                        onClick={() => {
                          ProfileRequests.unmute(false, APIs, token, tag)
                        }}
                      >
                        {" "}
                        unmute
                      </button>
                    </div>
                  )}
                  <Followers followers={followersnum} following={followingnum}></Followers>
                  <ProfilePageEdit openModal={props.openModal} handleCloseModal={props.handleCloseModal}></ProfilePageEdit>
                  {(viewpoststate === true || profileres.is_curr_user) && <ProfileMediabuttons root={tag}></ProfileMediabuttons>}
                </>
              )}
              {profileres.is_curr_user_blocked && <BlockedBy tag={tag}></BlockedBy>}
              {profileres.is_curr_user_blocked === false && viewpoststate === false && <Blocked tag={tag} setViewPost={setViewPost}></Blocked>}
            </div>
          )}
        </div>
      )}
      {!user && (
        <div
          className="dark-text-[black] absolute left-[45%] top-[45%] h-[100px] w-[100px] rounded-full bg-[black]
      text-white dark:bg-[white]"
        >
          <Link to="/signup">
            <button className="h-[100%] w-[100%] ">Sign up pls</button>
          </Link>
        </div>
      )}
      {user && <Widgets parent={"profile"} />}
    </div>
  )
}
export default ProfilePage
