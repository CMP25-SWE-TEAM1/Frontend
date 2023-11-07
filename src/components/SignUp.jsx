import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import { Modal, Box } from "@mui/material"
import lightLogo from "../assets/imgs/giga-chat-logo-dark-removebg-preview.png"



import GoogleLoginButton from "./GoogleLoginButton"
import { gapi } from "gapi-script"

import { styles } from "../styles"


const SignUp = ({ openModal, handleCloseModal, location, setLocation }) => {

  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const siteKey = "6Ldxlf4oAAAAAKjm3gXBNjq-GBJ4hM79g6NYk7KG"
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  function responseGoogle(response) {
    console.log(response)
  }
  const handleCaptchaVerification = (response) => {
    console.log("Captcha response: ", response)
  }
  function nextShow(position) {
    const JoinGigaChat = document.getElementById("Join GigaChat")
    const FirstStep = document.getElementById("First Step")
    const SecondStep = document.getElementById("Second Step")
    const ThirdStep = document.getElementById("Third Step")
    switch (position) {
      case 0:
        JoinGigaChat.style.display = "none"
        FirstStep.style.display = "flex"
        break
      case 1:
        FirstStep.style.display = "none"
        SecondStep.style.display = "flex"
        break
      case 2:
        SecondStep.style.display = "none"
        ThirdStep.style.display = "flex"
        break
      default:
        break
    }
  }
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="m-auto flex h-full justify-center bg-black text-white md:rounded-2xl">
            <Link to="/" className="text-white" onClick={handleCloseModal}>
              <button className="relative left-2 top-2 h-10 w-10 rounded-3xl text-2xl no-underline hover:bg-zinc-900">x</button>
            </Link>

            <div id="Join GigaChat" className="pop-up m-auto h-full max-w-[320px]">
              <img src={lightLogo} alt="GigaChat Logo" className="ml-[40%] mt-4 w-[40px]" />

              <h1 className="mb-4 mt-3">Join GigaChat today</h1>

              <GoogleLoginButton handleCloseModal={handleCloseModal} />

              <div className="flex h-10 items-center justify-center">
                <div className="flex w-full items-center">
                  <hr className="mr-2 w-full" />
                </div>
                &nbsp; or &nbsp;
                <div className="flex w-full items-center">
                  <hr className="ml-2 w-full" />
                </div>
              </div>

              <button
                className="btn"
                onClick={() => {
                  nextShow(0)
                }}
              >
                Create Account
              </button>
              <span className="text-xs text-secondary">
                By signing up, you agree to the <a href="/#">Terms of Service</a> and <a href="/#">Privacy Policy</a>, including <a href="/#">Cookie Use</a>.
              </span>

              <span className="mt-3 text-sm text-secondary">
                Have an account already ?&nbsp;
                <Link to="/login" className="text-white">
                  Log in
                </Link>
              </span>
            </div>

            <div id="First Step" className="pop-up m-auto hidden h-full max-w-[430px]">
              <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 1 of 3</p>
              <h1 className="mt-3">Create your account</h1>
              <div className="input-container">
                <input className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="name" autoComplete="off" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                <label className="input-label" htmlFor="name">
                  Name
                </label>
              </div>
              <div className="input-container">
                <input className={email === "" ? "form-input" : "form-input filled-input"} type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="input-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="input-containter">
                <div>
                  <p className="text-bold">Date of birth </p>
                  <p className="date-text">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                  <br></br>
                </div>
                <input
                  type="date"
                  className="date-input text-black"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value)
                    console.log(e.target.value)
                  }}
                ></input>
              </div>
              <button
                className="btn"
                id="next"
                onClick={() => {
                  nextShow(1)
                }}
                disabled={email === "" || nickName === "" || date === ""}
              >
                Next
              </button>
            </div>

            <div id="Second Step" className="pop-up m-auto hidden h-full max-w-[430px]">
              <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 2 of 3</p>
              <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification()} />
              <button
                className="btn"
                onClick={() => {
                  nextShow(2)
                }}
              >
                Next
              </button>
            </div>

            <div id="Third Step" className="pop-up m-auto hidden h-full max-w-[430px]">
              <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 3 of 3</p>
              <h1 className="">You'll need a Password</h1>
              <p className="date-text">Make sure it's 8 characters or more</p>
              <div className="input-container">
                <input className={password === "" ? "form-input" : "form-input filled-input"} type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="input-label" htmlFor="password">
                  Password
                </label>
                <span className={`toggle-password ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                  👁️
                </span>
              </div>
              <div>
                <Link to="/home" className="text-white">
                  <button className="btn px-4 py-2 " disabled={password.length <= 8}>
                    Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default SignUp
