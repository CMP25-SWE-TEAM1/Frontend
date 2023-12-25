import React from 'react'
import { useParams } from "react-router-dom"
import { Outlet } from "react-router"
import HorizontalNavbar from '../../General/HorizontalNavbar'
import { useSelector } from "react-redux"
import Header from '../Header'
const  FollowPage = () => {
  const FollowNavLinks = [
    { title: "Following", location: "Following" },
    { title: "Followers", location: "Followers" },
  ]
  const {tag} = useParams()
  const {user} = useSelector((state)=>(state.user))
  console.log(tag);
  return (
    <div className=" flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div
        className="home ml-0 mr-1 max-w-[620px] shrink-0 flex-grow 
      overflow-y-scroll border border-b-0 border-t-0 border-lightBorder 
      dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-[600px]"
      >
      <Header profilename={user.nickname}></Header>
      <div id="FollowNavbar-div" className={`flex flex-row w-[100%] h-[50px] `}>
        <HorizontalNavbar urls={FollowNavLinks} originalUrl={`/${tag}`} handlers={[]}/>
      </div>
      <div>
        <Outlet />
      </div>
      </div>
    </div>
  )
}

export default FollowPage