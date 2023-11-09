import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"
import Landing from "./components/landing-page/Landing"
import Settings from "./components/Settings/Settings"
import { useState, useEffect } from "react"
import SignUp from "./components/SignUp"
import Account from "./components/Settings/Account/Account"
import AccountInformation from "./components/Settings/Account/AccountInformation"
import ChangeUsername from "./components/Settings/Account/ChangeUsername"
import ChangeEmail from "./components/Settings/Account/ChangeEmail"
import ChangePassword from "./components/Settings/Account/ChangePassword"
import AccessibilityDisplayLanguages from "./components/Settings/AccessibilityDisplayLanguages/AccessibilityDisplayLanguages"
import Accessibility from "./components/Settings/AccessibilityDisplayLanguages/Accessibility"
import Display from "./components/Settings/AccessibilityDisplayLanguages/Display"
import PrivacySafety from "./components/Settings/PrivacySafety/PrivacySafety"
import Blocked from "./components/Settings/PrivacySafety/Blocked"
import Muted from "./components/Settings/PrivacySafety/Muted"
import getUser from "./constants"

import { styles } from "./styles"

const App = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    const mode = localStorage.getItem("mode")
    const htmlElement = document.getElementById("htmlid")

    if(mode === "dark"){
      document.documentElement.style.setProperty("--color-theme", "dark")
      htmlElement.classList.add("dark")
    } else {
      document.documentElement.style.setProperty("--color-theme", "white")
      htmlElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    setLocation(window.location.pathname)
    setUser(getUser())
  }, [location])

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true)
  }
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false)
    setLocation(window.location.pathname)
  }

  const [openSignupModal, setOpenSignupModal] = useState(false)
  const handleOpenSignupModal = () => setOpenSignupModal(true)
  const handleCloseSignupModal = () => {
    setOpenSignupModal(false)
    setLocation(window.location.pathname)
  }

  const [user, setUser] = useState(getUser())

  return (
    <div className="app flex h-[100vh] bg-white dark:bg-black text-black dark:text-white">
      <BrowserRouter>
        {user && <Sidebar user={user} setUser={setUser} />}

        {/* {location !== "/login" && location !== "/password_reset" && <Sidebar />} */}
        {/* true will be replaced by authorization*/}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing openLoginModal={openLoginModal} handleOpenLoginModal={handleOpenLoginModal} handleCloseLoginModal={handleCloseLoginModal} openSignupModal={openSignupModal} handleOpenSignupModal={handleOpenSignupModal} handleCloseSignupModal={handleCloseSignupModal} location={location} setLocation={setLocation} />
              </>
            }
          ></Route>
          <Route path="login" element={<Login openModal={true} handleCloseModal={handleCloseLoginModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="password_reset" element={<PasswordReset />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/settings" element={<Settings />}>
            <Route path="account" element={<Account />}></Route>
            <Route path="account_information" element={<AccountInformation />}></Route>
            <Route path="change_username" element={<ChangeUsername />}></Route>
            <Route path="change_email" element={<ChangeEmail />}></Route>
            <Route path="change_password" element={<ChangePassword />}></Route>

            <Route path="privacy_and_safety" element={<PrivacySafety />}></Route>
            <Route path="blocked" element={<Blocked />}></Route>
            <Route path="muted" element={<Muted />}></Route>

            <Route path="accessibility_display_and_languages" element={<AccessibilityDisplayLanguages />}></Route>
            <Route path="accessibility" element={<Accessibility />}></Route>
            <Route path="display" element={<Display />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp openModal={true} handleCloseModal={handleCloseSignupModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* {user && <Widgets />} */}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
