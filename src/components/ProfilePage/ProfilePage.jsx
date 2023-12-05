import { useSelector } from "react-redux";
import axios from "axios";
import React from "react";
import FollowButton from "./FollowButton";
import ProfileMediabuttons from "./ProfileMediabuttons";
import ProfileICons from "./ProfileICons";
import ProfileBio from "./ProfileBio";
import ProfileImage from "./ProfileImage";
import CoverImage from "./CoverImage";
import ProfileName from "./ProfileName";
import Followers from "./Followers";
import { useEffect } from "react";
import { useState } from "react";
import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"
import Header from "./Header";
import ProfilePageEdit from "./ProfilePageEdit";
import { useParams } from "react-router-dom";
const ProfilePage=(handleOpenProfileEditModal,openModal,handleCloseModal) => {
    
    const user = useSelector((state)=> state.user.user)
    const userToken = useSelector((state) => state.user.token)
    const [profileres, setProfile] = useState([])
    const mock = true;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth) //todo: for responsiveness
    const [profilePic, setProfilePic] = useState(profileres ? profileres.profile_image : defaultProfilePic)
    const [profilePicURL, setProfilePicURL] = useState(profileres ? profileres.profile_image : defaultProfilePic)
    let {tag} = useParams();
    const APIs = {
      
        mock: { getProfileAPI:   `http://localhost:3001/api/profile/` },
        actual: { getProfileAPI: `http://backend.gigachat.cloudns.org/api/profile/` },
      }
      let usertag=undefined;
     const Fetch =()=>{
   setTimeout(()=>{
    if(usertag){
        axios.get(

            mock? APIs.mock.getProfileAPI+`${usertag}` : APIs.actual.getProfileAPI+`${usertag}`,
            {
                headers:{
                    authorization: "Bearer"+ userToken,
                }
            }
        ).then(res =>{
            if(res.status=== 200)
            {  
                setProfile((res.data.user));
                console.log(profileres.is_curr_user)
            }
        }).catch((err)=>
        {
            console.log(usertag)
            console.log(err)
        })}
    else{
       usertag=tag;
    Fetch();
    }
    },500
   )
}
    useEffect(Fetch,[])
    
    return (
        <div id ="Profile" className="flex flex-col md:w-[100%] lg:w-[42%] h-[100%] 
        border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder">
            <div id="Upperhalf" className="md:w-[100%] lg:w-[100%] h-[50%] mb-[10%]">
                <Header profilename={profileres.nickname} postsnum={profileres.followers_num}></Header>
               <CoverImage coverimage = {profileres.banner_image}></CoverImage>
            <div className="flex flex-row">
                <ProfileImage profileimage = {profilePic} profileimageURL ={profilePicURL}></ProfileImage>
               <FollowButton handleOpenProfileEditModal={handleOpenProfileEditModal} openModal={openModal} handleCloseModal={handleCloseModal} buttonName = {profileres.is_curr_user? `Edit Profile` : profileres.is_wanted_user_followed? `Following` : `Follow`}></FollowButton>
            </div>
           <ProfileName profilename={profileres.nickname} profiletag={profileres.username}></ProfileName>
        </div>
        <ProfileBio profilebio={profileres.bio}></ProfileBio>
        <ProfileICons profilelocation={profileres.location} profilewebsite={profileres.website} profilejoindate= {profileres.joined_date}></ProfileICons>
        <Followers followers={profileres.followers_num} following ={profileres.following_num}></Followers>
        <ProfileMediabuttons ></ProfileMediabuttons>
        <ProfilePageEdit openModal={false} handleCloseModal={handleCloseModal} ></ProfilePageEdit>
        </div>
    )
}
export default ProfilePage