import GoogleLogin from "@leecheuk/react-google-login"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Box } from "@mui/material"
import lightLogo from "../../assets/imgs/giga-chat-logo-dark-removebg-preview.png"
import {styles} from '../../styles'


const Login = ({ openModal, handleCloseModal, location, setLocation }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function handleNext() {
    const firstPage = document.getElementById("firstPage")
    const secondPage = document.getElementById("secondPage")

    firstPage.style.display = "none"
    secondPage.style.display = "block"
  }

  function responseGoogle(response) {
    // Handle the Google sign-in response here
    console.log(response)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-black text-white md:rounded-2xl">
            <Link to="/" className="!text-white" onClick={handleCloseModal}>
              <button className="relative left-[-80px] top-4 h-10 w-10 rounded-3xl text-2xl no-underline bg-transparent hover:bg-zinc-900">x</button>
            </Link>
            <img src={lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />
            {/* --------------------------------------First Login Page------------------------------------- */}
            <div id="firstPage">
              <div>
                <h1>Log in to Gigachat</h1>
                <GoogleLogin
                  clientId="40488454700-g3rk7h26t89sb83do0dbdeinvke0tmrj.apps.googleusercontent.com"
                  onSuccess={() => responseGoogle()}
                  onFailure={() => responseGoogle()}
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} className="btn mt-0">
                      Log in with Google
                    </button>
                  )}
                />
                <div className="flex h-10 items-center justify-center">
                  <div className="flex w-full items-center">
                    <hr className="mr-2 w-full" />
                  </div>
                  &nbsp; or &nbsp;
                  <div className="flex w-full items-center">
                    <hr className="ml-2 w-full" />
                  </div>
                </div>
                <div className="input-container">
                  <input className={userName === "" ? "form-input" : "form-input filled-input"} type="text" name="username" id="username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <label className="input-label" htmlFor="username">
                    Phone, email or username
                  </label>
                </div>
                <button type="button" id="next" className="btn mt-0" onClick={handleNext} disabled={userName === ""}>
                  Next
                </button>
                <Link
                  onClick={() => {
                    setLocation("/password_reset")
                  }}
                  to={"/password_reset"}
                >
                  <button id="forgotPassword" className="btn border border-white bg-black text-white">
                    Forgot Password?
                  </button>
                </Link>
                <span className="text-slate-400">
                  Don't have an account? <Link to={"/Signup"}>Sign Up</Link>{" "}
                </span>
              </div>
            </div>

            {/* --------------------------------------Second Login Page------------------------------------- */}
            <div id="secondPage" className="hidden">
              <div>
                <h1 className="text-4xl">Enter your password</h1>
                <form action="/" method="post" className="flex flex-col gap-5" autoComplete="off">
                  <div className="input-container">
                    <input type="text" name="username" id="username" value={userName} className="form-input filled-input border-0 bg-neutral-900" disabled />
                    <label className="input-label" htmlFor="username">
                      Phone, email or username
                    </label>
                  </div>
                  <div className="relative">
                    <div className="input-container">
                      <input className={password === "" ? "form-input" : "form-input filled-input"} type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="input-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <span className={`absolute cursor-pointer right-4 top-4 toggle-password ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                      👁️
                    </span>
                  </div>
                  <Link
                    onClick={() => {
                      setLocation("/password_reset")
                    }}
                    to={"/password_reset"}
                    className="text-xs text-primary -mt-3"
                  >
                    Forgot password?
                  </Link>
                  <button id="login" type="submit" className="btn mt-32" disabled={password === ""}>
                    Log in
                  </button>
                </form>
                <span className="text-slate-400">
                  Don't have an account? <Link to={"/Signup"}>Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Login
