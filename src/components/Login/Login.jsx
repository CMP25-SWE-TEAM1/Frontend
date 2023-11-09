import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Modal, Box } from "@mui/material"
import lightLogo from "../../assets/imgs/giga-chat-logo-dark-removebg-preview.png"
import { styles } from "../../styles"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/UserSlice"
import GoogleLoginButton from "../GoogleLoginButton"

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

  const { loading, error } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const handleLoginEvent = (e) => {
    e.preventDefault()
    let userCredentials = {
      userName,
      password,
    }

    dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
      if (result.payload) {
        setUserName("")
        setPassword("")
        navigate("/home")
        handleCloseModal()
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
            <Link to="/" className="!text-white" onClick={handleCloseModal}>
              <button className="relative left-[-80px] top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover">x</button>
            </Link>
            <img src={lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />
            {/* --------------------------------------First Login Page------------------------------------- */}
            <div id="firstPage">
              <div>
                <h1 className="mb-4 mt-3">Log in to Gigachat</h1>
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
                <div className="input-container">
                  <input className={userName === "" ? "form-input" : "form-input filled-input"} type="text" name="username" id="username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <label className="input-label" htmlFor="username">
                    Phone, email or username
                  </label>
                </div>
                <button type="button" id="next" className="btn mt-2" onClick={handleNext} disabled={userName === ""}>
                  Next
                </button>
                <Link
                  onClick={() => {
                    setLocation("/password_reset")
                  }}
                  to={"/password_reset"}
                >
                  <button id="forgotPassword" className="btn mt-2 border border-black bg-white text-black hover:bg-lightHover dark:border-white dark:bg-black dark:text-white dark:hover:bg-darkHover">
                    Forgot Password?
                  </button>
                </Link>
                <span className="mt-5 text-slate-400">
                  Don't have an account? <Link to={"/Signup"}>Sign Up</Link>{" "}
                </span>
              </div>
            </div>

            {/* --------------------------------------Second Login Page------------------------------------- */}
            <div id="secondPage" className="hidden">
              <div>
                <h1 className="text-4xl">Enter your password</h1>
                <form action="/" method="post" className="flex flex-col gap-5" autoComplete="off" onSubmit={handleLoginEvent}>
                  <div className="input-container">
                    <input type="text" name="username" id="username" value={userName} className="form-input filled-input border-0 !bg-gray-100 dark:!bg-gray-900 !text-ternairy" disabled />
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
                    <span className={`toggle-password absolute right-4 top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                      👁️
                    </span>
                  </div>
                  <Link
                    onClick={() => {
                      setLocation("/password_reset")
                    }}
                    to={"/password_reset"}
                    className="-mt-3 text-xs text-primary"
                  >
                    Forgot password?
                  </Link>
                  <button id="login" type="submit" className="btn mt-36 h-14 rounded-3xl" disabled={password === ""}>
                    {loading ? "Loading..." : "Log In"}
                  </button>
                  {error && <div>{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Login
