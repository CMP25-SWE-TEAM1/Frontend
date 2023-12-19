import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BlockIcon from '@mui/icons-material/Block';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import ProfileRequests from "./profilerequests"
// import { CgUnblock } from "react-icons/cg";
import axios from 'axios';
 const Details = (props)=> {
  const darkmode = useSelector((state)=>(state.theme.darkMode))
  const [detailsdisplay,setDisplay]= useState('hidden')
  const [muted,setmuted] =useState()
  const [notmuted,setnotmuted] =useState()
  const[blocked,setblocked] = useState()
  const[notblocked,setnotblocked] = useState()
  const mock= false;
  const {token} = useSelector((state)=>(state.user))
  useEffect(
   ()=>{
    if(props.ismuted)
    {
      setmuted('hidden');
      setnotmuted('block');
    }else{
      setmuted('block');
      setnotmuted('hidden');
    }
    if(props.isblocked)
    {
      console.log("Hello")
      setblocked('hidden');
      setnotblocked('block');
    }else{
      setblocked('block');
      setnotblocked('hidden');
    }

  }
  ,[props])
  // console.log(props)
  const APIs = {
      
    blockmock: { Block:   `http://localhost:3001/api/profile/` },
    blockactual: { Block: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/block` },
    unblockmock: { unBlock:   `http://localhost:3001/api/profile/` },
    unblockactual: { unBlock: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unblock` },
    mutemock: { mute:  `http://localhost:3001/api/profile/` },
    muteactual: {mute: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/mute`},
    unmutemock: { mute:  `http://localhost:3001/api/profile/` },
    unmuteactual: {unmute: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unmute`},
  }
  document.onclick= (event)=>{
    // console.log(event.target)
    let target = event.target;
    if(target.id=== 'show-details-button' || target.id ==='show-details-div' ||target.id ==='details-div')
    {
      setDisplay('block')
    }
    else{
      setDisplay('hidden')
    }
  }
  return (
    <div id='show-details-div' className={`absolute ${props.isfollowed? `right-[140px]` :`right-[110px]`}  top-[80px] ${props.display} w-[40px] h-[40px] 
    ${darkmode? `bg-black text-white` : `bg-white text-black`} 
    border border-b-2 border-t- border-lightBorder dark:border-darkBorder hover:bg-lightHover 
    dark:hover:bg-darkHover rounded-[50%] bg-[white] text-center mt-[2%] `}>
       <button id="show-details-button" className='text-[25px] mt-[-7px] '>...</button>
    
    <div id='details-div' className={`absolute left-[-165px] top-0 z-10 w-[200px] h-[100px] flex flex-col rounded-xl bg-inherit text-inherit   ${detailsdisplay}` }>
      <button id='block' className= {`relative left-[6.5%] Detailsbt ${blocked}`} onClick={()=>{ProfileRequests.block(false,APIs,token)}}>
       <BlockIcon className='w-[25px]'></BlockIcon> <span>Block This User </span>
      </button>
      <button id='mute' className= {`relative left-[6.5%] Detailsbt ${notblocked}`} onClick={()=>{ProfileRequests.unblock(false,APIs,token)}}>
      <BlockIcon className='w-[25px]'></BlockIcon> <span>Unblock This User</span>
      </button>
      <button id='mute' className= {` relative left-[6.5%] Detailsbt ${muted}`} onClick={()=>{ProfileRequests.mute(false,APIs,token)}}>
        <VolumeOffOutlinedIcon  ></VolumeOffOutlinedIcon>   <span>Mute This User </span>
        </button>
        <button id='unmute' className={`relative left-[6.5%] Detailsbt ${notmuted}`} onClick={()=>{ProfileRequests.unmute(false,APIs,token)}}>
        <VolumeMuteOutlinedIcon ></VolumeMuteOutlinedIcon> <span>Unmute This User </span>
      </button>
    </div>
    </div>
  )
}

export default Details