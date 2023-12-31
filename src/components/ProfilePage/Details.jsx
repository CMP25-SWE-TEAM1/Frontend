import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BlockIcon from "@mui/icons-material/Block"
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined"
import VolumeMuteOutlinedIcon from "@mui/icons-material/VolumeMuteOutlined"
import ProfileRequests from "./profilerequests"
// import { CgUnblock } from "react-icons/cg";
import axios from "axios"
const Details = (props) => {
  const darkmode = useSelector((state) => state.theme.darkMode)
  const [detailsdisplay, setDisplay] = useState("hidden")
  const [muted, setmuted] = useState()
  const [notmuted, setnotmuted] = useState()
  const [blocked, setblocked] = useState()
  const [notblocked, setnotblocked] = useState()
  const mock = false
  const { token } = useSelector((state) => state.user)
  useEffect(() => {
    if (props.ismuted) {
      setmuted("hidden")
      setnotmuted("block")
    } else {
      setmuted("block")
      setnotmuted("hidden")
    }
    if (props.isblocked) {
      setblocked("hidden")
      setnotblocked("block")
    } else {
      setblocked("block")
      setnotblocked("hidden")
    }
  }, [props])
  // console.log(props)
  const APIs = {
    blockmock: { Block: `https://localhost:3001/api/profile/` },
    blockactual: { Block: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/block` },
    unblockmock: { unBlock: `https://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
    mutemock: { mute: `https://localhost:3001/api/profile/` },
    muteactual: { mute: `https://backend.gigachat.cloudns.org/api/user/${props.tag}/mute` },
    unmutemock: { mute: `https://localhost:3001/api/profile/` },
    unmuteactual: { unmute: `https://backend.gigachat.cloudns.org/api/user` },
  }
  document.onclick = (event) => {
    // console.log(event.target)
    let target = event.target
    if (target.id === "show-details-button" || target.id === "show-details-div" || target.id === "details-div") {
      setDisplay("block")
    } else {
      setDisplay("hidden")
    }
  }

  return (
    <div
      id="show-details-div"
      className={`absolute ${props.position}  top-[77.5px]
    ${props.display} h-[40px] w-[40px] 
    ${darkmode ? `bg-black text-white` : `bg-white text-black`} 
    border-t- mt-[2%] rounded-[50%] border border-b-2 border-lightBorder 
    
    bg-[white] text-center  `}
    >
      <button id="show-details-button" className="mt-[-7px] h-[100%] w-[100%] rounded-full text-[25px] hover:mt-[0] hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover ">
        ...
      </button>

      <div
        id="details-div"
        className={`absolute 
      left-[-165px] top-0 z-10 flex h-[100px] w-[200px] flex-col rounded-xl bg-inherit text-inherit   ${detailsdisplay}`}
      >
        <button
          id="block"
          className={`Detailsbt relative left-[6.5%] hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover ${blocked}`}
          onClick={() => {
            ProfileRequests.block(false, APIs, token)
          }}
        >
          <BlockIcon className="w-[25px]"></BlockIcon> <span>Block This User </span>
        </button>
        <button
          id="mute"
          className={`Detailsbt relative left-[6.5%] hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover ${notblocked}`}
          onClick={() => {
            ProfileRequests.unblock(false, APIs, token)
          }}
        >
          <BlockIcon className="w-[25px]"></BlockIcon> <span>Unblock This User</span>
        </button>
        <button
          id="mute"
          className={` Detailsbt relative left-[6.5%] hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover ${muted}`}
          onClick={() => {
            ProfileRequests.mute(false, APIs, token)
          }}
        >
          <VolumeOffOutlinedIcon></VolumeOffOutlinedIcon> <span>Mute This User </span>
        </button>
        <button
          id="unmute"
          className={`Detailsbt relative left-[6.5%] hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover ${notmuted}`}
          onClick={() => {
            ProfileRequests.unmute(false, APIs, token, props.tag)
          }}
        >
          <VolumeMuteOutlinedIcon /> <span>Unmute This User </span>
        </button>
      </div>
    </div>
  )
}

export default Details
