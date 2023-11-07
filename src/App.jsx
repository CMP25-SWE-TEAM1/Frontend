import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"

import Landing from "./components/landing-page/Landing"
import { useState } from "react"
import { useEffect } from "react"
import SignUp from "./components/SignUp"

const App = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    setLocation(window.location.pathname)
  }, [location])

  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleOpenLoginModal = () => setOpenLoginModal(true)
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

  return (
    <div className="app ml-auto mr-auto flex justify-start">
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
          <Route path="/signup" element={<SignUp openModal={true} handleCloseModal={handleCloseSignupModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {false && <Widgets />}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
