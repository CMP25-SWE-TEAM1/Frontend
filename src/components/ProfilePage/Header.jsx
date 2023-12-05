import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
function Header(props) {
    const darkMode = useSelector((state)=> state.theme.darkMode);
  return (
    <div id="header" className={`fixed top-0 flex flex-row  lg:h-[7.8%]  lg:w-[42%] md:w-[100%] 
                md:min-w-[100%] py-[8px] z-10 ${darkMode? `bg-black`: `bg-white`} 
                border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder`}>
                    <div id="Arrowback" className="flex ml-[1%] mr-[2%]">
                        <Link to={`/home`}>
                            <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover
                             h-[100%] rounded-full  " ></ArrowBackIcon>
                        </Link>
                    </div>
                    <div id="username" className={`flex flex-col   ${darkMode ? `text-white` : `text-black` }`}>
                        <div>
                            <h1 className={`font-bold text-lg mt-[-5px]  whitespace-nowrap`}>
                                {props.profilename}
                            </h1>
                        </div>
                        <div>
                            <p className={`text-xs text-[gray] `}>
                                {props.postsnum} posts
                                {/*here the count should be updated by user posts number*/ }
                            </p>
                        </div>
                    </div>
                </div>
  )
}

export default Header