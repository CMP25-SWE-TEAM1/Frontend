import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"
import Landing from "./components/landing-page/Landing"
import Settings from "./components/Settings/Settings"
import { useState } from "react"
import { useEffect } from "react"
import SignUp from "./components/SignUp"
import Account from "./components/Settings/Account/Account"
import AccessibilityDisplayLanguages from "./components/Settings/AccessibilityDisplayLanguages/AccessibilityDisplayLanguages"
import Accessibility from "./components/Settings/AccessibilityDisplayLanguages/Accessibility"
import Display from "./components/Settings/AccessibilityDisplayLanguages/Display"

const App = () => {
  const [location, setLocation] = useState(null)

  useEffect(()=>{
    const mode = localStorage.getItem("mode")
    const htmlElement = document.getElementById("htmlid")

    if(mode == "dark"){
      document.documentElement.style.setProperty("--color-theme", "dark")
      htmlElement.classList.add("dark")
    }
    else{
      document.documentElement.style.setProperty("--color-theme", "white")
      htmlElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    setLocation(window.location.pathname)
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
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="app ml-auto mr-auto flex justify-start">
      {loggedIn && <Sidebar />}
      {/* true will be replaced by authorization*/}
      <BrowserRouter>
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

            <Route path="accessibility_display_and_languages" element={<AccessibilityDisplayLanguages />}></Route>
            <Route path="accessibility" element={<Accessibility />}></Route>
            <Route path="display" element={<Display />}></Route>
          </Route>
          <Route path="/signup" element={<SignUp openModal={true} handleCloseModal={handleCloseSignupModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {loggedIn && false && <Widgets />}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
