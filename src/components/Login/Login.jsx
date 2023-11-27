import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Modal, Box, Alert } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"

import lightLogo from "../../assets/imgs/giga-chat-logo-dark-removebg-preview.png"
import { styles } from "../../styles"

import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/UserSlice"

import GoogleLoginButton from "../GoogleLoginButton"
import axios from "axios"

const Login = ({ openModal, handleCloseModal, location, setLocation }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { loading, error } = useSelector((state) => state.user)

  const [emailExistError, setEmailExistError] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const APIs = {
    mock: { emailExistAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail" },
    actual: {
      emailExistAPI: "http://51.20.216.159/api/user/checkExistedEmail",
      loginAPI: "http://51.20.216.159/api/user/login",
    },
  }

  function handleNext(emailExist) {
    if (emailExist) {
      const firstPage = document.getElementById("firstPage")
      const secondPage = document.getElementById("secondPage")

      firstPage.style.display = "none"
      secondPage.style.display = "block"
    } else {
      setEmailExistError(true)
      setTimeout(() => {
        setEmailExistError(false)
      }, 3000)
    }
  }

  const handleLoginEvent = (e) => {
    e.preventDefault()
    let userCredentials = {
      email: userName,
      password: password,
    }
    // axios
    //   .post(APIs.actual.loginAPI, userCredentials)
    //   .then((res) => {
    //     console.log(res.data.data.user)
    //     console.log(res.data.token)
    //   })
    //   .catch((err) => {
    //      setLoginError(err.message === "Request failed with status code 401")
    //   })

    dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
      // console.log(result)
      if (result.payload) {
        setUserName("")
        setPassword("")
        handleCloseModal()
        navigate("/home")
        setLoginError(false)
      } else {
        setLoginError(result.error.message === "Request failed with status code 401")
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailCheck = () => {
    let emailExist
    axios
      .post(APIs.actual.emailExistAPI, { email: userName })
      .then((res) => {
        emailExist = res.status === 200
      })
      .then(() => {
        handleNext(emailExist)
      })
      .catch((err) => {
        emailExist = !err.message === "Request failed with status code 404"
        handleNext(emailExist) //this will be removed
        // console.log(emailExist)
      })
  }

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
            <button className="relative left-[-80px] top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>
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
                <button type="button" id="next" className="btn mt-2" onClick={handleEmailCheck} disabled={userName === ""}>
                  Next
                </button>
                <Link
                  onClick={() => {
                    setLocation("/password_reset")
                  }}
                  to={"/password_reset"}
                >
                  <button id="forgotPassword" className="btn mt-2 border border-lightBorder bg-black text-white hover:bg-darkHover dark:border-darkBorder dark:bg-white dark:text-black dark:hover:bg-lightHover">
                    Forgot Password?
                  </button>
                </Link>
                <span className="mt-5 text-slate-400">
                  Don't have an account? <Link to={"/Signup"}>Sign Up</Link>{" "}
                </span>
                {emailExistError && <Alert severity="error">sorry we couldn't find your email</Alert>}
              </div>
            </div>

            {/* --------------------------------------Second Login Page------------------------------------- */}
            <div id="secondPage" className="hidden">
              <div>
                <h1 className="text-4xl">Enter your password</h1>
                <form action="/" method="post" className="flex flex-col gap-5" autoComplete="off" onSubmit={handleLoginEvent}>
                  <div className="input-container">
                    <input type="text" name="username" id="username" value={userName} className="form-input filled-input border-0 !bg-gray-100 !text-ternairy dark:!bg-gray-900" disabled />
                    <label className="input-label" htmlFor="username">
                      Phone, email or username
                    </label>
                  </div>
                  <div className={`relative ${error ? "-mb-4" : ""}`}>
                    <div className="input-container">
                      <input className={password === "" ? "form-input" : "form-input filled-input"} type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="input-label" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <span className={`toggle-password absolute right-4 top-4 cursor-pointer ${showPassword ? "active" : ""}`} onClick={togglePasswordVisibility}>
                      <VisibilityIcon className="text-primary" />
                    </span>
                  </div>
                  {loginError && (
                    <Alert severity="error" sx={styles.signupPasswordCheckStyleMiddle}>
                      {error}
                    </Alert>
                  )}

                  <Link
                    onClick={() => {
                      setLocation("/password_reset")
                    }}
                    to={"/password_reset"}
                    className=" text-xs text-primary"
                  >
                    Forgot password?
                  </Link>
                  <button id="login" type="submit" className="btn -mb-4 mt-36 h-14 rounded-3xl" disabled={password === ""}>
                    {loading ? "Loading..." : "Log In"}
                  </button>
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
