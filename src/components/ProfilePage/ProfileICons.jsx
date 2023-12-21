import React, { useEffect, useState } from 'react'
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { LocationOnSharp } from "@mui/icons-material";
import {months,DefaultCoverPage} from "../../constants/index"
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import { useSelector } from 'react-redux';
const ProfileICons = ({profilelocation,profilewebsite,profilejoindate,profilebirthdate}) => {
  const {user} = useSelector((state)=>state.user)
  const [joinedhtmldate, setJoinedhtmldate] = useState()
  const [birthhtmldate, setBirthhtmldate] = useState()
  useEffect(()=>{
    if(profilebirthdate && profilebirthdate)
    {
    setJoinedhtmldate(`${months[(profilejoindate).slice(0,10).split('-')[1]-1]} ${(profilejoindate).slice(0,10).split('-')[0]}`)
    setBirthhtmldate(`${months[(profilebirthdate).slice(0,10).split('-')[1]-1]} ${(profilebirthdate).slice(0,10).split('-')[2]}, ${(profilebirthdate).slice(0,10).split('-')[0]}`)
    }
  },[profilebirthdate, profilebirthdate])
  return (
    <div id="icons" className={`flex flex-row w-[100%] h-[10%] flex-wrap space-x-[10px] mb-[5%] `}>
            <div id="PlaceDiv" className={`flex flex-row ml-[10px] mr-[3px] ${!profilelocation? `hidden`:`block`}`}>
                <LocationOnSharp className="fill-[#808080] mt-[2px] w-[16px] p-0 mr-[3.3%]"></LocationOnSharp>
                <p id="LocationP" className="text-[13px] mt-[5px] whitespace-nowrap  text-[rgb(150,150,150)] font-light">{profilelocation}</p>
            </div>
            <div id="JoinDateDiv" className={`flex flex-row mr-[3px]  ${!profilejoindate? `hidden`:`block`}`}>
            <CalendarMonth className="fill-[#808080] mt-[2px] w-[16px] p-0 mr-[3.3%]  "/>
            <p id="JoinDateP" className="text-[13px] mt-[5px] text-[rgb(150,150,150)] whitespace-nowrap font-light ">
                {/*date of join*/}
                Joined {joinedhtmldate}
            </p>
            </div>
            <div id="BirthDateeDiv" className={`flex flex-row mr-[3px] ${!profilebirthdate? `hidden`:`block`}`}>
            <CakeOutlinedIcon className="fill-[#808080] mt-[2px] w-[16px] p-0 mr-[3.3%] " />
            <p id="JoinDateP" className="text-[13px] mt-[5px] text-[rgb(150,150,150)] whitespace-nowrap font-light ">
                {/*date of join*/}
                Born {birthhtmldate}
            </p>
            </div>
            <div id="WebsiteDiv" className={`flex flex-row mr-[3px] w-[25%]  ${!profilewebsite? `hidden`:`block`}`}>
            <LinkSharpIcon className="fill-[#808080] mt-[2px] w-[16px] p-0 mr-[3.3%] " />
            <a href={`//${profilewebsite}`}>
            <p id="WebSiteP" className="text-[13px] mt-[5px] truncate text-[rgb(150,150,150)] whitespace-nowrap font-light ">
                {/*date of join*/}
                {profilewebsite}
            </p>
            </a>
            </div>
            
    </div>
  )
}

export default ProfileICons