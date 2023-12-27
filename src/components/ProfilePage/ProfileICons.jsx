import React, { useEffect, useState } from "react"
import CalendarMonth from "@mui/icons-material/CalendarMonth"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import { LocationOnSharp } from "@mui/icons-material"
import { months, DefaultCoverPage } from "../../constants/index"
import LinkSharpIcon from "@mui/icons-material/LinkSharp"
import { useSelector } from "react-redux"
const ProfileICons = ({ profilelocation, profilewebsite, profilejoindate, profilebirthdate }) => {
  const { user } = useSelector((state) => state.user)
  const [joinedhtmldate, setJoinedhtmldate] = useState()
  const [birthhtmldate, setBirthhtmldate] = useState()
  useEffect(() => {
    if (profilebirthdate && profilebirthdate) {
      setJoinedhtmldate(`${months[profilejoindate.slice(0, 10).split("-")[1] - 1]} ${profilejoindate.slice(0, 10).split("-")[0]}`)
      setBirthhtmldate(`${months[profilebirthdate.slice(0, 10).split("-")[1] - 1]} ${profilebirthdate.slice(0, 10).split("-")[2]}, ${profilebirthdate.slice(0, 10).split("-")[0]}`)
    }
  }, [profilebirthdate, profilebirthdate])
  return (
    <div id="icons-test" className={`mb-[5%] flex h-[5%] w-[100%] flex-row flex-wrap space-x-[10px] `}>
      <div id="PlaceDiv" className={`ml-[10px] mr-[3px] flex flex-row ${!profilelocation ? `hidden` : `block`}`}>
        <LocationOnSharp className="mr-[3.3%] mt-[2px] w-[16px] fill-[#808080] p-0"></LocationOnSharp>
        <p id="LocationP" className="mt-[5px] whitespace-nowrap text-[13px]  font-light text-[rgb(150,150,150)]">
          {profilelocation}
        </p>
      </div>
      <div id="JoinDateDiv" className={`mr-[3px] flex flex-row  ${!profilejoindate ? `hidden` : `block`}`}>
        <CalendarMonth className="mr-[3.3%] mt-[2px] w-[16px] fill-[#808080] p-0  " />
        <p id="JoinDateP" className="mt-[5px] whitespace-nowrap text-[13px] font-light text-[rgb(150,150,150)] ">
          {/*date of join*/}
          Joined {joinedhtmldate}
        </p>
      </div>
      <div id="BirthDateeDiv" className={`mr-[3px] flex flex-row ${!profilebirthdate ? `hidden` : `block`}`}>
        <CakeOutlinedIcon className="mr-[3.3%] mt-[2px] w-[16px] fill-[#808080] p-0 " />
        <p id="JoinDateP" className="mt-[5px] whitespace-nowrap text-[13px] font-light text-[rgb(150,150,150)] ">
          {/*date of join*/}
          Born {birthhtmldate}
        </p>
      </div>
      <div id="WebsiteDiv" className={`mr-[3px] flex w-[25%] flex-row text-ellipsis  ${!profilewebsite ? `hidden` : `block`}`}>
        <LinkSharpIcon className="mr-[3.3%] mt-[2px] w-[16px] fill-[#808080] p-0 " />
        <a href={`//${profilewebsite}`}>
          <p id="WebSiteP" className="mt-[5px] w-[10em] truncate whitespace-nowrap text-[13px] font-light  text-[rgb(150,150,150)] hover:underline ">
            {/*date of join*/}
            {profilewebsite}
          </p>
        </a>
      </div>
    </div>
  )
}

export default ProfileICons
