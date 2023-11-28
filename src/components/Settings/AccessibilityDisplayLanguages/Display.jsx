import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { toggleTheme } from "../../../store/ThemeSlice"
import { setDarkMode, setLightMode } from "../../../store/ThemeSlice"

const Display = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  function handleLightMode() {
    dispatch(setLightMode())
    localStorage.setItem("mode", false)
  }

  function handleDarkMode() {
    dispatch(setDarkMode())
    localStorage.setItem("mode", true)
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../accessibility_display_and_languages">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Display</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Manage your font size, color, and background. These settings affect all the X accounts on this browser.</p>

      <div>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Background</h1>
        <div className="flex justify-evenly">
          <label htmlFor="default-bg">
            <div className="flex h-16 w-40 cursor-pointer items-center justify-around rounded-lg border border-secondary bg-white font-bold text-black">
              <input type="checkbox" id="default-bg" className="h-4 w-4" checked={!darkMode} onChange={handleLightMode} />
              Default
            </div>
          </label>
          <label htmlFor="lights-out-bg">
            <div className="flex h-16 w-40 cursor-pointer items-center justify-around rounded-lg border border-secondary bg-black font-bold text-white">
              <input type="checkbox" id="lights-out-bg" className="h-4 w-4" checked={darkMode} onChange={handleDarkMode} />
              Lights Out
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Display
