import React, {useState, useEffect} from 'react'
import HorizontalNavbar from '../General/HorizontalNavbar'
import Widgets from '../Widgets/Widgets'
import WestIcon from '@mui/icons-material/West'
import { Link } from "react-router-dom"
import PersonsContainer from "./PersonsContainer"
import { useLocation } from "react-router-dom"
import { HashLink } from 'react-router-hash-link' 

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostEngagement() {
  const [navbarActiveLink, setNavbarActiveLink] = useState("Reposts");
  const location = useLocation();
  const postId = location.pathname.slice(location.pathname.match(/\/status\/.*\//).index+8,location.pathname.match(/\/retweets|\/likes/).index);
  const userTag = location.pathname.slice(1,location.pathname.match(/\/status\/.*\//).index);
 
   // console.log(location.pathname.slice(location.pathname.match(/\/status\/.*\//).index+8,location.pathname.match(/\/retweets|\/likes/).index));
  
  const repostsHandler = () =>{
    setNavbarActiveLink("Reposts");
  }
  const likesHandler = () =>{
    setNavbarActiveLink("Likes");
  }
  
  const engagementNavLinks = [{ title: "Reposts", location: "retweets" }, { title: "Likes", location: "likes" }];
  
  const user=useSelector((state)=>state.user.user)
   const navigate = useNavigate()
   useEffect(() => {
     if (!user) {
       navigate("/")
     }
   }, [])
 
  return (
    <div className="flex flex-1">
    <div className="ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
      <div className="sticky top-0 z-50 mb-3 border-0 border-b border-lightBorder dark:border-darkBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:bg-inherit dark:bg-opacity-[99%] ">
          <HashLink smooth to="#top">
        <div id="top" className="flex h-[53px] items-center">
          <Link to="/home">
        <div className="ml-2 mr-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-lightHover dark:hover:bg-darkHover">
        <WestIcon/> 
        </div>
        </Link>
        <div><b>Post engagements</b></div>
        </div>
        </HashLink>
        <div className="flex h-[53px] items-center">
        <HorizontalNavbar urls={engagementNavLinks} originalUrl={`/${userTag}/status/${postId}`} handlers={[repostsHandler,likesHandler]}/>
        </div>
      </div>
      <PersonsContainer postId={postId} userTag={userTag} navbarActiveLink={navbarActiveLink} />
      </div>
    <Widgets />
  </div>
  )
}

export default PostEngagement
