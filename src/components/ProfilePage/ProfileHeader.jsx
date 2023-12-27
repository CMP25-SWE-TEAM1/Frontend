import React from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import WestIcon from "@mui/icons-material/West"
function Header(props) {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const navigate = useNavigate()
  const location = useLocation()
  const {user} = useSelector((state)=>state.user)
  return (
    <div
      id="Profile-header"
      className={`sticky top-0 z-10 flex  h-fit  flex-row  
                  py-[8px] ${darkMode ? `bg-black` : `bg-white`} 
                 border border-b-0 border-t-0 backdrop-blur-md border-lightBorder dark:border-darkBorder`}
    >
      <div id="Arrowback" className="ml-2 mr-5 cursor-pointer flex h-8 w-8 items-center justify-center rounded-full hover:bg-lightHover dark:hover:bg-darkHover " onClick={()=>{navigate(-1)}}>
          <WestIcon/>

      </div>
      <div id="username" className={`flex flex-col   ${darkMode ? `text-white` : `text-black`}`}>
        <div>
          <h1 className={`mt-[-5px] whitespace-nowrap text-lg  font-bold`}>{props.profilename}</h1>
        </div>
        <div>
          {(!location.pathname.split('/')[2]  || location.pathname.split('/')[2] === 'with_replies')  &&
          <p className={`text-xs text-[gray] `}>
            {props.postsnum} posts
            {/*here the count should be updated by user posts number*/}
          </p>}
          {location.pathname.split('/')[2] === 'Likes' &&
          <p className={`text-xs text-[gray] `}>
            {props.likenum} Likes
            {/*here the count should be updated by user posts number*/}
          </p>}
          {location.pathname.split('/')[2] && (location.pathname.split('/')[2].toLowerCase() === 'following'||location.pathname.split('/')[2].toLowerCase() === 'followers')  &&
          <p className={`text-xs text-[gray] `}>
            @{props.profiletag} 
            {/*here the count should be updated by user posts number*/}
          </p>}
        </div>
      </div>
    </div>
  )
}

export default Header
