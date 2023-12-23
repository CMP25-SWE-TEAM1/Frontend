import React, { useEffect, useState } from 'react'
import ProfileRequests from './profilerequests'
import { useSelector } from 'react-redux'
const BlockButton =({isblocked,tag}) => {
    const [display, setDisplay] = useState()
    const {token} = useSelector((state)=>state.user)
    const APIs = {
        unblockmock: { unBlock:   `http://localhost:3001/api/profile/` },
        unblockactual: { unBlock: `http://backend.gigachat.cloudns.org/api/user/${tag}/unblock` },
      }
    useEffect(()=>{
        isblocked? setDisplay('block') : setDisplay('hidden')
    }
        ,[isblocked])
  return (
    <>
    <button
      id="block-button"
      onClick={() => {
        ProfileRequests.unblock(false,APIs,token)
      }}
      className={`blockedbt ${display} bg-[rgb(244,33,46)] h-[35px] w-[85px] 
      rounded-full border border-lightBorder text-center font-sans font-[700]
      dark:border-darkBorder  text-white `}
    >
      <span>Blocked</span>
    </button>
  </>
  )
}

export default BlockButton