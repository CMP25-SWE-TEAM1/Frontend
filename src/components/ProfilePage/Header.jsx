import React from "react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
function Header(props) {
  const darkMode = useSelector((state) => state.theme.darkMode)
  return (
    <div
      id="header"
      className={`sticky top-0 z-10 flex  h-fit  flex-row  
                  py-[8px] ${darkMode ? `bg-black` : `bg-white`} 
                 border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder`}
    >
      <div id="Arrowback" className="ml-[1%] mr-[2%] flex">
        <Link to={`/home`}>
          <ArrowBackIcon
            className="h-[100%] rounded-full
                             hover:bg-lightHover dark:hover:bg-darkHover  "
          ></ArrowBackIcon>
        </Link>
      </div>
      <div id="username" className={`flex flex-col   ${darkMode ? `text-white` : `text-black`}`}>
        <div>
          <h1 className={`mt-[-5px] whitespace-nowrap text-lg  font-bold`}>{props.profilename}</h1>
        </div>
        <div>
          <p className={`text-xs text-[gray] `}>
            {props.postsnum} posts
            {/*here the count should be updated by user posts number*/}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
