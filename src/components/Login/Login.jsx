import GoogleLogin from "@leecheuk/react-google-login"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Box } from "@mui/material"

const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -70%)",
  width: 600,
  height: "50vh",
}

const Login = ({ openModal, handleCloseModal, location, setLocation }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  function handleNext() {
    const firstPage = document.getElementById("firstPage")
    const secondPage = document.getElementById("secondPage")

    firstPage.style.display = "none"
    secondPage.style.display = "flex"
  }

  function responseGoogle(response) {
    // Handle the Google sign-in response here
    console.log(response)
  }

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]">
        <Box sx={modalStyle}>
          <div className="m-auto h-[550px] bg-black text-white md:rounded-2xl">
            <Link to="/" className="text-white">
              <button className="relative left-2 top-2 h-10 w-10 rounded-3xl text-2xl no-underline hover:bg-zinc-900">x</button>
            </Link>

            {/* --------------------------------------First Login Page------------------------------------- */}
            <div id="firstPage" className="pop-up">
              <h1>Log in to Gigachat</h1>
              <GoogleLogin
                clientId="40488454700-g3rk7h26t89sb83do0dbdeinvke0tmrj.apps.googleusercontent.com"
                onSuccess={() => responseGoogle()}
                onFailure={() => responseGoogle()}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} className="btn">
                    Log in with Google
                  </button>
                )}
              />
              <div className="flex h-10 items-center justify-center">
                <div className="flex w-48 items-center">
                  <hr className="w-48" />
                </div>
                &nbsp; or &nbsp;
                <div className="flex w-48 items-center">
                  <hr className="w-48" />
                </div>
              </div>
              <div className="input-container">
                <input className={userName === "" ? "form-input" : "form-input filled-input"} type="text" name="username" id="username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <label className="input-label" htmlFor="username">
                  Phone, email or username
                </label>
              </div>
              <button type="button" id="next" className="btn" onClick={handleNext} disabled={userName === ""}>
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

            {/* --------------------------------------Second Login Page------------------------------------- */}
            <div id="secondPage" className="pop-up hidden">
              <h1 className="text-4xl">Enter your password</h1>
              <form action="/" method="post" className="flex flex-col gap-5" autoComplete="off">
                <div className="input-container">
                  <input type="text" name="username" id="username" value={userName} className="form-input filled-input border-0 bg-neutral-900" disabled />
                  <label className="input-label" htmlFor="username">
                    Phone, email or username
                  </label>
                </div>
                <div className="input-container">
                  <input className={password === "" ? "form-input" : "form-input filled-input"} type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label className="input-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <Link
                  onClick={() => {
                    setLocation("/password_reset")
                  }}
                  to={"/password_reset"}
                  className="text-xs text-blue-600"
                >
                  Forgot password?
                </Link>
                <button id="login" type="submit" className="btn mt-24 h-14 rounded-3xl" disabled={password === ""}>
                  Log in
                </button>
              </form>
              <span className="text-slate-400">
                Don't have an account? <Link to={"/Signup"}>Sign Up</Link>
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Login
