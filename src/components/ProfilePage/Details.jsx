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
      console.log("Hello")
      setblocked("hidden")
      setnotblocked("block")
    } else {
      setblocked("block")
      setnotblocked("hidden")
    }
  }, [props])
  // console.log(props)
  const APIs = {
    blockmock: { Block: `http://localhost:3001/api/profile/` },
    blockactual: { Block: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/block` },
    unblockmock: { unBlock: `http://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
    mutemock: { mute: `http://localhost:3001/api/profile/` },
    muteactual: { mute: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/mute` },
    unmutemock: { mute: `http://localhost:3001/api/profile/` },
    unmuteactual: { unmute: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unmute` },
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
  console.log(props.position)
  return (
    <div
      id="show-details-div"
      className={`absolute ${props.position}  top-[77.5px]
    ${props.display} h-[40px] w-[40px] 
    ${darkmode ? `bg-black text-white` : `bg-white text-black`} 
    border-t- mt-[2%] rounded-[50%] border border-b-2 border-lightBorder 
    bg-[white] text-center hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover `}
    >
      <button id="show-details-button" className="mt-[-7px] text-[25px] ">
        ...
      </button>

      <div id="details-div" className={`absolute left-[-165px] top-0 z-10 flex h-[100px] w-[200px] flex-col rounded-xl bg-inherit text-inherit   ${detailsdisplay}`}>
        <button
          id="block"
          className={`Detailsbt relative left-[6.5%] ${blocked}`}
          onClick={() => {
            ProfileRequests.block(false, APIs, token)
          }}
        >
          <BlockIcon className="w-[25px]"></BlockIcon> <span>Block This User </span>
        </button>
        <button
          id="mute"
          className={`Detailsbt relative left-[6.5%] ${notblocked}`}
          onClick={() => {
            ProfileRequests.unblock(false, APIs, token)
          }}
        >
          <BlockIcon className="w-[25px]"></BlockIcon> <span>Unblock This User</span>
        </button>
        <button
          id="mute"
          className={` Detailsbt relative left-[6.5%] ${muted}`}
          onClick={() => {
            ProfileRequests.mute(false, APIs, token)
          }}
        >
          <VolumeOffOutlinedIcon></VolumeOffOutlinedIcon> <span>Mute This User </span>
        </button>
        <button
          id="unmute"
          className={`Detailsbt relative left-[6.5%] ${notmuted}`}
          onClick={() => {
            ProfileRequests.unmute(false, APIs, token)
          }}
        >
          <VolumeMuteOutlinedIcon/> <span>Unmute This User </span>
        </button>
      </div>
    </div>
  )
}

export default Details
