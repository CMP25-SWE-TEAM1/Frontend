import React from "react"
import Button from "../../Sidebar/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material"
import FollowButton from "./SmallComponents/FollowButton"
import Selector from "./Selector"
const FollowPage = (props) =>{
  const DarkMode = useSelector((state) => state.theme.darkMode)
  const User     = useSelector((state) => state.user.user)
  let type  = props;
  type = true;

    return (
        <div className="flex justify-normal flex-col ">
            
            <div  className={`sticky top-0 z-50 mb-0 border-[1px] border-lightBorder dark:border-darkBorder bg-white bg-opacity-[87%] 
            backdrop-blur-sm dark:bg-inherit dark:bg-opacity-[99%] w-[40vw] h-[100px] min-w-full    `}>
                <div id="Arrow-Button" className="  ">
                <Link to={`/${User.name}`}>
                <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-[20px] w-[20px] opacity-80 rounded-[50%] 
                mt-[3%] ml-[2%] z-100  " ></ArrowBackIcon>
                </Link>
                </div>
                <div className="flex flex-col mt-[-30px] ml-[70px] min-w-full  ">
                    <div id="UserName">
                        <p className={`text-xl opacity-100 font-bold `}>
                            {User.name}
                        </p>
                    </div>
                    <div id="UserTag">
                        <p className="text-[rgba(150,150,150,50)] text-[80%] ">
                           {`@` + User.name}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-center min-w-[100%] " >
                <Link to={``}>
                    <div className="flex ">
                        <FollowButton name="Followers" classname={'mt-[2%] w-[20vw] h-[40px] hover:bg-lightHover dark:hover:bg-darkHover'}>
                        </FollowButton>
                        
                    </div>
                </Link>
                    <div className="flex ">
                    <FollowButton name="Following" classname={'mt-[2%] w-[20vw] h-[40px]  hover:bg-lightHover dark:hover:bg-darkHover'}>
                        </FollowButton>
                    </div>
                </div>
            </div>
            <Selector type></Selector>
        </div>
    )
}
export default FollowPage