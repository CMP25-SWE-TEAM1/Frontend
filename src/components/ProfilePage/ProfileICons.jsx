import React from 'react'
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { BusinessCenterSharp } from "@mui/icons-material";
import { LocationOnSharp } from "@mui/icons-material";

function ProfileICons(props) {
  return (
    <div id="icons" className={`mb-[2.5%] flex flex-row w-[80%] h-[5%] whitespace-wrap`}>
            <div id="PlaceDiv" className={`flex flex-row ml-[1.5%] w-[calc(100%/2)] h-[100%] 
            ${props.profilelocation=== ""? `hidden`:`block`}`}>
                <LocationOnSharp className="fill-[#808080] w-[10%] h-[50%]"></LocationOnSharp>
                <p id="LocationP" className="text-sm text-[rgb(150,150,150)] font-light">{props.profilelocation}</p>
            </div>
            <div id="JoinDateDiv" className={`flex flex-row ml-[-15%] w-[calc(100%/2)] h-[100%]
            ${props.profilejoindate === ""? `hidden`:`block`}`}>
            <CalendarMonth className="fill-[#808080] w-[10%] h-[50%]"> </CalendarMonth>
            <p id="JoinDateP" className="text-sm text-[rgb(150,150,150)] whitespace-nowrap font-light ">
                {/*date of join*/}
                {props.profilejoindate}
            </p>
            </div>
    </div>
  )
}

export default ProfileICons