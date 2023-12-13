import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BlockIcon from '@mui/icons-material/Block';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
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
    console.log(props.ismuted) 
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
      setblocked('hidden');
      setnotblocked('block');
    }else{
      setblocked('block');
      setnotblocked('hidden');
    }

  }
  ,[])
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
  function blockhandle() {
    axios.patch(
      mock? APIs.blockmock.Block : APIs.blockactual.Block,
      {},
      {
          headers:{
              authorization : "Bearer " + token,
          },
      }
  ).then((res)=>{
    console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  function unblockhandle(){
    axios.patch(
      mock? APIs.blockmock.Block : APIs.unblockactual.unBlock,
      {},
      {
          headers:{
              authorization : "Bearer " + token,
          },
      }
  ).then((res)=>{
    console.log(res)
    }).catch((err)=>{
      console.log("hello")
      console.log(err)
    })
  }
  function mutehandle()
  {
    axios.patch(
      mock? APIs.blockmock.Block : APIs.muteactual.mute,
      {},
      {
          headers:{
              authorization : "Bearer " + token,
          },
      }
  ).then((res)=>{
    console.log(res)
    }).catch((err)=>{
      console.log("hello")
      console.log(err)
    })
  }
  function unmutehandle()
  {
    console.log("tete")
    axios.patch(
      mock? APIs.blockmock.Block : APIs.unmuteactual.unmute,
      {},
      {
          headers:{
              authorization : "Bearer " + token,
          },
      }
  ).then((res)=>{
    console.log(res)
    }).catch((err)=>{
      console.log("hello")
      console.log(err)
    })
  }
  document.onclick= (event)=>{
    if(event===undefined)
    {
      event=window.event;
    }
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
    <div id='show-details-div' className={`relative left-[47%] ${props.display} w-[40px] h-[40px] 
    ${darkmode? `bg-black text-white` : `bg-white text-black`} 
    border border-b-2 border-t- border-lightBorder dark:border-darkBorder hover:bg-lightHover 
    dark:hover:bg-darkHover rounded-[50%] bg-[white] text-center mt-[2%] `}>
       <button id="show-details-button" className='text-[25px] mt-[-7px] '>...</button>
    
    <div id='details-div' className={`z-10 flex flex-col rounded-xl bg-inherit text-black w-[250px] h-[100px] bg-white text-black ${detailsdisplay}` }>
      <button id='block' className= {` Detailsbt ${blocked}`} onClick={blockhandle}>
       <BlockIcon></BlockIcon> Block This User 
      </button>
      <button id='mute' className= {`Detailsbt ${notblocked}`} onClick={unblockhandle}>
        {/* <CgUnblock></CgUnblock> <span>Unblock This User </span> */}
      </button>
      <button id='mute' className= {` Detailsbt hidden`} onClick={mutehandle}>
        <VolumeOffOutlinedIcon  ></VolumeOffOutlinedIcon>   <span>Mute This User </span>
        </button>
        <button id='unmute' className={`Detailsbt block`} onClick={unmutehandle}>
        <VolumeMuteOutlinedIcon ></VolumeMuteOutlinedIcon> <span>Unmute This User </span>
      </button>
    </div>
    </div>
  )
}

export default Details