import { useState } from "react"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const Settings = () => {
  const [selectedSettings, setSelectedSettings] = useState("")
  const [search, setSearch] = useState("")
  const [passwordIsConfirmed] = useState(sessionStorage.getItem("passwordIsConfirmed"))

  function handleSelect(e) {
    if (selectedSettings !== "") selectedSettings.classList.remove("border-r-[3px]", "border-primary", "bg-lightHover", "dark:bg-darkHover")
    e.currentTarget.classList.add("border-r-[3px]", "border-primary", "bg-lightHover", "dark:bg-darkHover")
    setSelectedSettings(e.currentTarget)
  }

  function handleSearch(current_search) {
    document.getElementById("settings-no-results").classList.remove("hidden")

    setSearch(current_search)
    const options = document.querySelectorAll(".settings-option")

    options.forEach((option) => option.classList.add("hidden"))
    options.forEach((option) => {
      const title = option.firstChild.firstChild.innerHTML
      if (current_search && title.toLowerCase().includes(current_search.toLowerCase())) {
        option.classList.remove("hidden")
        document.getElementById("settings-no-results").classList.add("hidden")
      }
    })
  }

  function cancelSearch() {
    setSearch("")
    document.getElementById("cancel-search").classList.add("hidden")
    document.querySelectorAll(".settings-option").forEach((option) => option.classList.add("hidden"))
    document.querySelectorAll(".main-option").forEach((option) => option.classList.remove("hidden"))
    document.getElementById("settings-no-results").classList.add("hidden")
  }

  return (
    <div className="flex h-screen dark:bg-black dark:text-white ">
      <div className="flex h-full w-[450px] flex-col border-r border-lightBorder dark:border-darkBorder max-lg:hidden">
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Settings</h1>

        <div className="flex w-full">
          <ArrowBackIcon id="cancel-search" className="ml-2 mt-2 hidden h-10 w-10 rounded-full p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" onClick={cancelSearch}></ArrowBackIcon>
          <div className="relative w-full p-2">
            <SearchIcon className="absolute left-4 top-[18px] text-xl text-secondary"></SearchIcon>
            <input
              type="text"
              id="search-bar"
              maxLength={15}
              autoComplete="off"
              placeholder="Search settings"
              className="mb-4 h-10 w-full rounded-full border-2 pl-8 focus:border-primary focus:outline-none dark:bg-black dark:text-white"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={(e) => {
                document.getElementById("cancel-search").classList.remove("hidden")
                handleSearch(e.target.value)
              }}
            />
          </div>
        </div>

        <Link to="/settings/account" className="settings-option main-option">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_your_account" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Your account</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/privacy_and_safety" className="settings-option main-option">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_privacy_and_settings" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Privacy and safety</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/accessibility_display_and_languages" className="settings-option main-option">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Accessibility, display, and languages</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>

        <div className="m-auto mt-5 hidden" id="settings-no-results">
          {search === "" && (
            <div>
              <div className="pl-12 pr-12 text-sm text-secondary">Try searching for account, privacy, etc.</div>
            </div>
          )}

          {search !== "" && (
            <div>
              <div className="pl-12 pr-12 text-2xl font-extrabold">No results for {search}</div>
              <div className="pl-12 pr-12 text-sm text-secondary">The term you entered did not bring up any results. Try a different search term.</div>
            </div>
          )}
        </div>

        <Link to="/settings/display" className="settings-option hidden">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Account information</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        {passwordIsConfirmed === "true" && (
          <Link to="/settings/change_username" className="settings-option hidden">
            <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
              <div className="mb-auto mt-auto pl-4 text-sm">Username</div>
              <div className="m-auto mr-3 text-2xl">&gt;</div>
            </div>
          </Link>
        )}
        {passwordIsConfirmed === "true" && (
          <Link to="/settings/change_password" className="settings-option hidden">
            <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
              <div className="mb-auto mt-auto pl-4 text-sm">Email</div>
              <div className="m-auto mr-3 text-2xl">&gt;</div>
            </div>
          </Link>
        )}
        <Link to="/settings/display" className="settings-option hidden">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Change your password</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>

        <Link to="/settings/blocked" className="settings-option hidden">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Blocked accounts</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/muted" className="settings-option hidden">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Muted accounts</div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>

        <Link to="/settings/display" className="settings-option hidden">
          <div className="flex h-11 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_accessibility" onClick={handleSelect}>
            <div className="mb-auto mt-auto pl-4 text-sm">Display</div>
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
