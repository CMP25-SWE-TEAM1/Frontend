import React from "react"
import { Link } from "react-router-dom"
import WestIcon from "@mui/icons-material/West"
import { useNavigate } from "react-router-dom"

function UpperNavbar({name}){
    const navigate = useNavigate();
    return(
            <Link to="#top">
        <div className="flex h-[53px] items-center">
        <div data-testid="backArrow" onClick={()=>navigate(-1)} className="ml-2 mr-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-lightHover dark:hover:bg-darkHover">
        <WestIcon/> 
        </div>
        <div><b>{name}</b></div>
        </div>
      </div>
    </Link>
  )
}
export default UpperNavbar
