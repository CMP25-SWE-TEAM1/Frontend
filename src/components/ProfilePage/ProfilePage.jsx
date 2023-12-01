import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
const ProfilePage=() => {
    //name, color, backgroundColor, height, width, link,disabled,disabledColor,hoverBgColor ,darkHoverBgColor
    const darkMode = useSelector((state) => state.theme.darkMode)
    const user     = useSelector((state) => state.user.user)
    function coverpagehandle()
    {
        
    }
    function profilepagehandler()
    {

    }
    return (
        <div className="flex flex-col w-[40vw] h-[100vh] 
        border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder">
        <div >
            <div id="header " className={`fixed top-0 flex flex-row h-[9vh] w-[40vw] py-[1vh] 
             z-10 ${darkMode? `bg-black`: `bg-white`}`}>
                <div id="Arrowback" className="flex ">
                    <Link to={`/home`}>
                        <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover text-[1.5vw] 
                        w-[1.5vw] h-[1.5vw] rounded-full mt-[1vh] mx-[1vw]" ></ArrowBackIcon>
                    </Link>
                </div>

            <div id="username" className={`flex flex-col ${darkMode ? `text-white` : `text-black` }`}>
                <div>
                    <h1 className={`font-bold text-lg mt-[-0.6vh] mx-[1.6vw]`}>
                        {`AbdulRahman Ahmed`}
                    </h1>
                </div>
                <div>
                    <p className={`text-xs text-[gray] mx-[1.6vw] py-[0.3vh]`}>
                        0 posts
                        {/*here the count should be updated by user posts number*/ }
                    </p>
                </div>
            </div>
            </div>
            
            <div id="cover-page" className={ `w-[39.9vw] h-[40vh]   ` }>
                <img className="w-[100%] h-[100%] object-fill" 
                src={require("../../assets/pexels-aphiwat-chuangchoem-358904.jpg")} alt="cover-page" onClick={()=>{coverpagehandle()}}></img>
            </div>
            <div className="flex flex-row">
                <div id="profile-page"> 
                <Avatar className={`w-[140px] h-[140px] mx-[20px] my-[-70px] mb-[10px] ${darkMode? `border-black` : `border-white`} border-[5px] `} onClick={()=>{profilepagehandler()}}></Avatar>
                </div>
                <div id="follow-button" className={`ml-[calc(100%/2)] mt-[2%]`}>
                    <button className={` ${darkMode? `bg-white text-black` : `bg-black text-white`} 
                    text-center font-bold rounded-full w-[80px] h-[35px] `}>
                        Follow
                    </button> {/*todo: conditional rendering white for follow black for unfollow*/}                    
                </div>

            </div>

            <div id="name" className="flex flex-col ml-[-1.5%]">
                <div className="">
                    <h1 className={`font-bold text-lg mt-[-0.6vh] mx-[1.6vw]`}>
                        {"Abdulrahman Mohamed"}
                    </h1>
                </div>
                <div className="">
                    <p className={`text-xs text-[gray] mx-[1.6vw] py-[0.3vh]`}>
                    {`@Abdelrahman`}
                    </p>
                </div>
            </div>
        </div>
        <div id="bio" className="ml-[2.5%] w-[100%] h-[15%]">
            <p className="text-[15px] font-[300] leading-[20px] w-[95%] h-[100%] break-words">
            dsadasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdasdasdasd
            </p>
        </div>
        <div>
            h
        </div>
            <div className={`flex flex-row w-[100%] h-[7%] justify-center 
             border border-b-1 border-t-0 border-lightBorder dark:border-darkBorder`}>
                <div className="w-[calc(100%/4)] justify-center" >
                <button className={` hover:bg-lightHover dark:hover:bg-darkHover
                    text-center font-bold  w-[100%] h-[100%] `}>
                        Posts
                    </button> 
                </div>
                <div className="w-[calc(100%/4)]" >
                <button className={` hover:bg-lightHover dark:hover:bg-darkHover
                    text-center font-bold  w-[100%] h-[100%] `}>
                        Replies
                    </button> 
                </div>
                <div className="w-[calc(100%/4)]" >
                <button className={` hover:bg-lightHover dark:hover:bg-darkHover
                    text-center font-bold  w-[100%] h-[100%] `}>
                        Media
                    </button> 
                </div>
                <div className="w-[calc(100%/4)]" >
                <button className={` hover:bg-lightHover dark:hover:bg-darkHover
                    text-center font-bold w-[100%] h-[100%] `}>
                        Likes
                    </button> 
                </div>
            </div>
        </div>
    )
}
export default ProfilePage