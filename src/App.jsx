import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/Login/PasswordReset"

import Landing from "./components/landing-page/Landing"
import { useState } from "react"
import { Button } from "@mui/material"
import { useEffect } from "react"

const App = () => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    setLocation(window.location.pathname)
  }, [location])

  //This will be moved to landing page
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    setLocation(window.location.pathname)
  }
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="app ml-auto mr-auto flex justify-start pl-10 pr-10">
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
                <Landing openModal={openModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} location={location} setLocation={setLocation} />
              </>
            }
          ></Route>
          <Route path="login" element={<Login openModal={true} handleCloseModal={handleCloseModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="password_reset" element={<PasswordReset />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {loggedIn && false && <Widgets />}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
