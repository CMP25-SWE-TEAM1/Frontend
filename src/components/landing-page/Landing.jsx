import { useEffect, useState } from "react"
import Login from "../Login/Login"
import "./landing.css"
import SignUp from "../Signup/SignUp"
import GoogleLoginButton from "../General/GoogleLoginButton"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Landing = ({ openLoginModal, handleOpenLoginModal, handleCloseLoginModal, openSignupModal, handleOpenSignupModal, handleCloseSignupModal, location, setLocation }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  // Dark & Light mode
  const logoImgDark = require("../../assets/imgs/logo-dark.jpg")
  const logoImgLight = require("../../assets/imgs/logo-light.jpg")

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/home")
    }
  })

  // -----
  return (
    <div className={`landing ${darkMode ? "dark" : "light"}`}>
      <div className="content">
        <div className="logo">
          {!darkMode && <img src={logoImgLight} alt="Logo" />}
          {darkMode && <img src={logoImgDark} alt="Logo" />}
        </div>
        <div className="info">
          <span className="t1">Happening now</span>
          <span className="t2">Join today.</span>
          <div className="panel">
            <GoogleLoginButton handleCloseModal={handleCloseLoginModal} />
            <button className="apple-btn mt-4">
              {/* Apple icon */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                </g>
              </svg>
              {/* Text */}
              Sign up with Apple
            </button>
            <span className="or">or</span>
            <div className="create-acc hover:cursor-pointer" onClick={handleOpenSignupModal}>
              Create account
            </div>
            <span className="rules">
              By signing up, you agree to the <a href="#/tos">Terms of Service</a> and <a href="#/privacy">Privacy Policy</a>, including <a href="help.#/rules-and-policies/twitter-cookies">Cookie Use.</a>
            </span>
            <span className="acc-exist">Already have an account?</span>
            <div onClick={handleOpenLoginModal} className="login hover:cursor-pointer">
              Sign in
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        {/* NOTE: commented links until decide its state */}
        {/* <a href="#/plapla">About</a>
        <a href="#/plapla">Download GigaChat app</a>
        <a href="#/plapla">Help Center</a>
        <a href="#/plapla">Terms of Service</a>
        <a href="#/plapla">Privacy Policy</a>
        <a href="#/plapla">Cookie Policy</a>
        <a href="#/plapla">Accessibility</a>
        <a href="#/plapla">Ads info</a>
        <a href="#/plapla">Blog</a>
        <a href="#/plapla">Status</a>
        <a href="#/plapla">Careers</a>
        <a href="#/plapla">Brand Resources</a>
        <a href="#/plapla">Advertising</a>
        <a href="#/plapla">Marketing</a>
        <a href="#/plapla">GigaChat for Business</a>
        <a href="#/plapla">Developers</a>
        <a href="#/plapla">Directory</a>
        <a href="#/plapla">Settings</a> */}
        <div>&copy; 2023 GigaChat Corp.</div>
      </div>
      <Login openModal={openLoginModal} handleCloseModal={handleCloseLoginModal} setLocation={setLocation} />
      <SignUp openModal={openSignupModal} handleCloseModal={handleCloseSignupModal} />
    </div>
  )
}

export default Landing
