import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useEffect, useState } from "react"

const Display = () => {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("mode")
    return storedMode ? storedMode : "light"
  })

  useEffect(() => {
    localStorage.setItem("mode", mode)
  }, [mode])

  function handleLightMode() {
    setMode("light")
    const htmlElement = document.getElementById("htmlid")
    document.documentElement.style.setProperty("--color-theme", "white")
    htmlElement.classList.remove("dark")
  }

  function handleDarkMode() {
    setMode("dark")
    const htmlElement = document.getElementById("htmlid")
    document.documentElement.style.setProperty("--color-theme", "dark")
    htmlElement.classList.add("dark")
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../accessibility_display_and_languages">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Display</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Manage your font size, color, and background. These settings affect all the X accounts on this browser.</p>

      <div>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Background</h1>
        <div className="flex justify-evenly">
          <label htmlFor="default-bg">
            <div className="flex h-16 w-40 cursor-pointer items-center justify-around rounded-lg border border-secondary bg-white font-bold text-black">
              <input type="checkbox" id="default-bg" className="w-4 h-4" checked={mode == "light"} onChange={handleLightMode} />
              Default
            </div>
          </label>
          <label htmlFor="lights-out-bg">
            <div className="flex h-16 w-40 cursor-pointer items-center justify-around rounded-lg border border-secondary bg-black font-bold text-white">
              <input type="checkbox" id="lights-out-bg" className="w-4 h-4" checked={mode == "dark"} onChange={handleDarkMode} />
              Lights Out
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Display
