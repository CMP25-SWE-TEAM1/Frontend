import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import Widgets from "./components/Widgets"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/PasswordReset/PasswordReset"
import Landing from "./components/landing-page/Landing"
import Settings from "./components/Settings/Settings"
import { useState, useEffect } from "react"
import SignUp from "./components/Signup/SignUp"
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
import { useDispatch, useSelector } from "react-redux"
import { setDarkMode, setLightMode } from "./store/ThemeSlice"
import PostPage from "./components/PostPage/PostPage"
import Messages from "./components/messages-page/Messages"

const App = () => {
  const [location, setLocation] = useState(window.location.pathname)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    if (darkMode) {
      dispatch(setDarkMode())
    } else {
      dispatch(setLightMode())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const user = useSelector((state) => state.user.user)
  // console.log(location)
  const testPost = {
    userName: "Mohamed Samir",
    userTag: "MSamir245",
    date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "23K",
    repostCount: "45K",
    likeCount: "64K",
    viewCount: "1M",
  }
  return (
    <div className="app flex h-[100vh] bg-white text-black dark:bg-black dark:text-white">
      <BrowserRouter>
        {user && location !== "/password_reset" && <Sidebar />}

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
          <Route path="login" element={<Login openModal={true} handleCloseModal={handleCloseLoginModal} setLocation={setLocation} />}></Route>
          <Route path="password_reset" element={<PasswordReset />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
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
          <Route path="/replies" element={<PostPage post={testPost} />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* {user && <Widgets />} */}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
