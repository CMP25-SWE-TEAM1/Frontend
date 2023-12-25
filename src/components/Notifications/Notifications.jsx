import Widgets from "../Widgets/Widgets"

import { useSelector,useDispatch } from "react-redux"

import { useState,useEffect } from "react"

import SettingsIcon from "@mui/icons-material/Settings"

import { Outlet } from "react-router-dom"

import HorizontalNavbar from "../General/HorizontalNavbar"

import { useNavigate } from "react-router-dom"

import { setNotificationSocket } from "../../store/NotificationSocketSlice"


const notificationsNavLinks = [
  { title: "All", location: "all" },
  { title: "Verified", location: "verified" },
  { title: "Mentions", location: "mentions" },
]

const Notifications = () => {
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const socket = initializeSocket(userToken)
  //   dispatch(setNotificationSocket(socket))
  // }, [dispatch, userToken])

  return (
    <div className="flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div className="no-scrollbar ml-0 mr-1 max-w-[620px] md:shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-fit">
        <div className="sticky top-0 z-50 mb-0 border-0 border-b border-lightBorder bg-white backdrop-blur-md dark:border-darkBorder dark:bg-inherit dark:backdrop-brightness-[30%]">
          <div className="flex items-center">
            <div className="flex-1 pl-2">
              <span className="text-xl font-semibold">Notifications</span>
            </div>
            <div className="flex h-14 w-14 items-center justify-end pr-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors dark:hover:bg-darkHover"
                onClick={() => {
                  navigate("/settings/account")
                }}
                title="Settings"
              >
                <SettingsIcon className="cursor-pointer"/>
              </div>
            </div>
          </div>
          <div className="flex h-[53px] items-center">
            <HorizontalNavbar urls={notificationsNavLinks} originalUrl={"/notifications"} handlers={[]}/>
          </div>
        </div>
        <Outlet />
      </div>
      {user && <Widgets parent={"notification"}/>}
    </div>
  )
}

export default Notifications
