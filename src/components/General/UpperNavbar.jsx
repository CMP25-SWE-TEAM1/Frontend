import React from "react"
import { Link } from "react-router-dom"
import WestIcon from "@mui/icons-material/West"

function UpperNavbar({name}){
    return(
            <Link to="#top">
        <div className="flex h-[53px] items-center">
          <Link to="/home">
        <div className="ml-2 mr-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-lightHover dark:hover:bg-darkHover">
        <WestIcon/> 
        </div>
        </Link>
        <div><b>{name}</b></div>
        </div>
        </Link>
    )
}
export default UpperNavbar