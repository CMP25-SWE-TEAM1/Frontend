import { useState } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

const Settings = () => {
  const [selectedSettings, setSelectedSettings] = useState("")

  function handleSelect(e){
    if(selectedSettings !== "")
      selectedSettings.classList.remove("border-r-[3px]", "border-primary", "bg-lightHover", "dark:bg-darkHover")
    e.currentTarget.classList.add("border-r-[3px]", "border-primary", "bg-lightHover", "dark:bg-darkHover")
    setSelectedSettings(e.currentTarget)
  }

  return (
    <div className="flex h-screen dark:bg-black dark:text-white">
      <div className="flex h-full w-[320px] flex-col border-r border-lightBorder dark:border-darkBorder">
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Settings</h1>

        <Link to="/settings/account">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_your_account" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Your account</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/privacy_and_safety">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_privacy_and_settings" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Privacy and safety</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/accessibility_display_and_languages">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Accessibility, display, and languages</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
      </div>

      <div className="flex h-full w-[600px] flex-col border-r border-lightBorder dark:border-darkBorder">
        <Outlet />
      </div>
    </div>
  )
}

export default Settings
