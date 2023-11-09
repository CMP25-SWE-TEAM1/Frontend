import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import { Modal, Box } from "@mui/material"
import lightLogo from "../assets/imgs/giga-chat-logo-dark-removebg-preview.png"


import { styles } from "../styles"
import GoogleLoginButton from "./GoogleLoginButton"

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
        FirstStep.style.display = "block"
        break
      case 1:
        FirstStep.style.display = "none"
        SecondStep.style.display = "block"
        break
      case 2:
        SecondStep.style.display = "none"
        ThirdStep.style.display = "block"
        break
      default:
        break
    }
  }
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
            <Link to="/" className="!text-white" onClick={handleCloseModal}>
              <button className="bg-white dark:bg-black text-black dark:text-white hover:bg-lightHover dark:hover:bg-darkHover relative left-[-80px] top-4 h-10 w-10 rounded-3xl bg-transparent text-2xl no-underline">x</button>
            </Link>
            <img src={lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />

            <div id="Join GigaChat">
              <div>
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
                  className="btn mt-0"
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
            </div>

            <div id="First Step" className="hidden">
              <div>
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
            </div>

            <div id="Second Step" className="hidden">
              <div>
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
            </div>

            <div id="Third Step" className="hidden">
              <div>
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 3 of 3</p>
                <h1 className="">You'll need a Password</h1>
                <p className="date-text">Make sure it's 8 characters or more</p>
                <div className="relative">
                  <div className="input-container">
                    <input className={password === "" ? "form-input" : "form-input filled-input"} type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="input-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <span className={`toggle-password absolute right-4 top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                    👁️
                  </span>
                </div>
                <div className="mt-auto">
                  <Link to="/home" className="text-white">
                    <button className="btn" disabled={password.length <= 8}>
                      Next
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default SignUp
