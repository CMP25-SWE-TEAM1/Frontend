import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar/Sidebar"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import PasswordReset from "./components/PasswordReset/PasswordReset"
import Landing from "./components/landing-page/Landing"
import Settings from "./components/Settings/Settings"
import MobileSettings from "./components/Settings/MobileSettings"
import { useState, useEffect } from "react"
import SignUp from "./components/Signup/SignUp"
import Account from "./components/Settings/Account/Account"
import AccountInformation from "./components/Settings/Account/AccountInformation"
import ChangeUsername from "./components/Settings/Account/ChangeUsername"
import ChangeEmail from "./components/Settings/Account/ChangeEmail"
import ChangePassword from "./components/Settings/Account/ChangePassword"
import AccessibilityDisplayLanguages from "./components/Settings/AccessibilityDisplayLanguages/AccessibilityDisplayLanguages"
import Display from "./components/Settings/AccessibilityDisplayLanguages/Display"
import PrivacySafety from "./components/Settings/PrivacySafety/PrivacySafety"
import Blocked from "./components/Settings/PrivacySafety/Blocked"
import Muted from "./components/Settings/PrivacySafety/Muted"
import { useDispatch, useSelector } from "react-redux"
import { setDarkMode, setLightMode } from "./store/ThemeSlice"
import PostPage from "./components/PostPage/PostPage"
import Messages from "./components/messages-page/Messages"
import MessageCompose from "./components/messages-page/compose/MessageCompose"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import ProfilePageEdit from "./components/ProfilePage/ProfilePageEdit/ProfilePageEdit"
import NotFound from "./components/NotFound"
import Explore from "./components/Explore/Explore"
import Notifications from "./components/Notifications/Notifications"
import All from "./components/Notifications/All"
import Verified from "./components/Notifications/Verified"
import Mentions from "./components/Notifications/Mentions"
import ProfilePosts from "./components/ProfilePage/ProfilePosts"
import ProfileReplies from "./components/ProfilePage/ProfileReplies"
import ProfileMedia from "./components/ProfilePage/ProfileMedia"
import ProfileLikes from "./components/ProfilePage/ProfileLikes"
import PostEngagement from "./components/PostEngagement/PostEngagement"
import SearchResults from "./components/Search/SearchResults"

const App = () => {
  const [location, setLocation] = useState(window.location.pathname)
  const [passwordIsConfirmed] = useState(sessionStorage.getItem("passwordIsConfirmed"))

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
  const [openProfileEditModal, SetProfileEditModal] = useState(false)
  const handleOpenProfileEditModal = () => {
    SetProfileEditModal(true)
  }
  const handleCloseProfileModal = () => {
    SetProfileEditModal(false)
  }

  // Compose message
  const [composeModalOpen, setComposeModalOpen] = useState(false)
  // const [composeModalURL, setComposeModalURL] = useState("") // location before ComposeModalOpen
  const handleComposeModalOpen = () => {
    setComposeModalOpen(true)
    // setComposeModalURL(window.location.pathname)
    // setLocation("/messages/compose")
  }
  const handleComposeModalClose = () => {
    setComposeModalOpen(false)
    // setLocation(composeModalURL)
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
    <div className="app relative flex min-h-[100vh] flex-col-reverse bg-white text-black dark:bg-black dark:text-white max-xs:max-w-[475px] xs:h-[100vh] xs:w-full xs:flex-row">
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/search/*" element={<SearchResults />}></Route>
          <Route path="/notifications" element={<Notifications />}>
            <Route path="all" element={<All />}></Route>
            <Route path="verified" element={<Verified />}></Route>
            <Route path="mentions" element={<Mentions />}></Route>
            <Route path="" element={<All />}></Route>
          </Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/messages" element={<Messages composeModalOpen={composeModalOpen} handleComposeModalOpen={handleComposeModalOpen} handleComposeModalClose={handleComposeModalClose} />}></Route>
          {/* <Route path="/messages/compose" element={<MessageCompose composeModalOpen={composeModalOpen} handleComposeModalClose={handleComposeModalClose} />}></Route> */}
          <Route path="/settings" element={<Settings />}>
            <Route path="" element={<MobileSettings />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route path="account_information" element={<AccountInformation />}></Route>
            {passwordIsConfirmed === "true" && <Route path="change_username" element={<ChangeUsername />}></Route>}
            {passwordIsConfirmed === "true" && <Route path="change_email" element={<ChangeEmail />}></Route>}
            <Route path="change_password" element={<ChangePassword />}></Route>

            <Route path="privacy_and_safety" element={<PrivacySafety />}></Route>
            <Route path="blocked" element={<Blocked />}></Route>
            <Route path="muted" element={<Muted />}></Route>

            <Route path="accessibility_display_and_languages" element={<AccessibilityDisplayLanguages />}></Route>
            <Route path="display" element={<Display />}></Route>
          </Route>
          <Route path={`/:tag`} element={<ProfilePage handleOpenProfileEditModal={handleOpenProfileEditModal} openModal={openProfileEditModal} handleCloseModal={handleCloseProfileModal} />}>
            <Route  element={<ProfilePosts />}></Route>
            <Route path="with_replies" element={<ProfileReplies />}></Route>
            <Route path="likes" element={<ProfileLikes />}></Route>
            <Route path="" element={<ProfilePosts />}></Route>
          </Route>
          <Route path={`settings/profile`} element={<ProfilePageEdit handleOpenProfileEditModal={handleOpenProfileEditModal} openModal={openProfileEditModal} handleCloseModal={handleCloseProfileModal}></ProfilePageEdit>}></Route>
          <Route path="/signup" element={<SignUp openModal={openProfileEditModal} handleCloseModal={handleCloseSignupModal} location={location} setLocation={setLocation} />}></Route>
          <Route path="/:tag/status/:id" element={<PostPage post={testPost} />}></Route>
          <Route path="/:tag/status/:id/:NavbarLink" element={<PostEngagement />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      {/* {user && <Widgets />} */}
      {/* true will be replaced by authorization*/}
    </div>
  )
}

export default App
