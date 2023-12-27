import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const Header = ({ handleCloseModal, hiddenFormSubmit, name, year, website }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { darkMode } = useSelector((state) => state.theme)
  return (
    <div id="Header-test" className={` sticky top-0 z-10 h-[70px] w-[100%]  rounded-t-[1px] backdrop-blur-sm  ${darkMode ? `bg-black` : `bg-white`}  flex flex-row`}>
      <button
        type="button"
        className="relative ml-[5px] mt-[5px] h-10 w-10 rounded-3xl bg-transparent 
    bg-white text-2xl text-black no-underline 
    hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover"
        onClick={() => {
          handleCloseModal()
          navigate(`/${user.username}`)
        }}
      >
        x
      </button>
      <p className="ml-[15px] mt-[15px] text-xl font-semibold">Edit Profile</p>
      <button
        className={`absolute   right-[12.5px] top-[12.5px] z-10 
         h-[35px] w-[70px] rounded-full bg-black 
         text-2xl text-lg font-medium text-white
          no-underline hover:bg-darkHover dark:bg-white dark:text-black dark:hover:bg-lightHover`}
        onClick={() => {
          hiddenFormSubmit.current.click()
        }}
        disabled={name === "" || 2023 - year < 18 || website}
      >
        Save
      </button>
    </div>
  )
}

export default Header
