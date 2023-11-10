import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

import { Modal, Box } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/UserSlice"

import GoogleLoginButton from "./GoogleLoginButton"

import { styles } from "../styles"
import { last120Years, days, months } from "../constants/index.js"
import lightLogo from "../assets/imgs/giga-chat-logo-dark-removebg-preview.png"

const SignUp = ({ openModal, handleCloseModal, location, setLocation }) => {
  const [captchaIsDone, setCaptchaIsDone] = useState(false)
  const siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/
  const upperCaseLetterRegex = /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const lowerCaseLetterRegex = /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const specialCharacterRegex = /^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const numberRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]{1,}$/
  const lengthRegex = /^[a-zA-Z0-9!@#$%^&*()]{8,}$/
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  const darkMode = useSelector((state) => state.theme.darkMode)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [emailExistError, setEmailExistError] = useState(false)

  const APIs = {
    mock: { emailExistAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail" },
    actual: { emailExistAPI: "" },
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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

  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }

  const handleChangeMonth = (event) => {
    setMonth(event.target.value)
  }

  const handleChangeDay = (event) => {
    setDay(event.target.value)
  }

  const handleLoginEvent = (e) => {
    e.preventDefault()
    let userCredentials = {
      nickName,
      password,
    }

    dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
      if (result.payload) {
        setNickName("")
        setPassword("")
        navigate("/home")
        handleCloseModal()
      }
    })
  }

  const handleEmailBlur = () => {
    let emailExist
    axios
      .post(APIs.mock.emailExistAPI, { email: email })
      .then((res) => {
        emailExist = res.data.emailExist
      })
      .then(() => {
        console.log(emailExist)
        if (emailExist) {
          setEmailExistError(true)
        } else {
          setEmailExistError(false)
        }
      })
      .catch((err) => {
        setEmailExistError(false)

        console.log(err)
      })
  }

  const handleCaptchaVerification = () => {
    console.log("Captcha done")
    setCaptchaIsDone(true)
  }

  function checkPassword(password) {
    return !passwordRegex.test(password)
  }

  function hasUpperCaseLetter(password) {
    return upperCaseLetterRegex.test(password)
  }
  function hasLowerCaseLetter(password) {
    return lowerCaseLetterRegex.test(password)
  }
  function hasSpecialCharachter(password) {
    return specialCharacterRegex.test(password)
  }
  function hasNumber(password) {
    return numberRegex.test(password)
  }
  function hasCorrectLength(password) {
    return lengthRegex.test(password)
  }
  function validEmail(emeil) {
    return emailRegex.test(emeil)
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

            <div id="Join GigaChat">
              <div className="m-auto max-w-[300px]">
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
                  className="mb-2 h-10 w-full rounded-3xl font-semibold text-white hover:bg-darkHover dark:bg-primary dark:text-white dark:hover:bg-[#1a8cd8]"
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

            <div id="First Step" className="-mt-10 hidden">
              <div className="max-w[600px]">
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 1 of 3</p>
                <h1 className="mt-3">Create your account</h1>
                <div className="input-container">
                  <input className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="name" autoComplete="off" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                  <label className="input-label" htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="input-container">
                  <input className={`${email === "" ? "form-input" : "form-input filled-input"} ${emailExistError ? "border border-red-600" : ""}`} type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} />
                  <label className={`input-label ${emailExistError ? "text-red-600" : "text-secondary"}`} htmlFor="email">
                    Email
                  </label>
                  {!validEmail(email) && (
                    <Alert severity="error" className={`${email ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
                      Please enter a valid email
                    </Alert>
                  )}
                  {emailExistError && <span className="ml-3 text-sm text-red-600">Email has already been taken</span>}
                </div>
                <div className={`${emailExistError ? "-mt-5" : ""} input-containter`}>
                  <div>
                    <p className="text-bold">Date of birth </p>
                    <p className="date-text text-[0.8rem] text-ternairy">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                    <br></br>
                  </div>
                  <div className="date flex">
                    <Box sx={{ minWidth: 120 }} className="month">
                      <FormControl
                        sx={{
                          "&& .MuiFormLabel-root": {
                            color: "#9aa1ad",
                          },
                          minWidth: 200,
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                          value={month}
                          label="Age"
                          onChange={handleChangeMonth}
                          sx={{
                            color: "black",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "#767C86",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            ".MuiSvgIcon-root ": {
                              fill: "#767C86 !important",
                            },
                            ".MuiSelect-select": {
                              color: `${!darkMode ? "black" : "white"}`,
                            },
                          }}
                          MenuProps={{
                            sx: {
                              ".MuiMenuItem-root": {
                                backgroundColor: `${!darkMode ? "white" : "black"}`,
                                color: `${!darkMode ? "black" : "white"}`,
                                padding: "1px 10px",
                                ":hover": {
                                  backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                                },
                              },
                              ".MuiList-root": {
                                padding: 0,
                              },
                            },
                          }}
                        >
                          {months.map((month) => (
                            <MenuItem value={month} key={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 100 }} className="day">
                      <FormControl
                        sx={{
                          "&& .MuiFormLabel-root": {
                            color: "#9aa1ad",
                          },
                          minWidth: 100,
                          padding: "0 10px",
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                        <Select
                          value={day}
                          label="Day"
                          onChange={handleChangeDay}
                          sx={{
                            color: "black",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "#767C86",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            ".MuiSvgIcon-root ": {
                              fill: "#767C86 !important",
                            },
                            ".MuiSelect-select": {
                              color: `${!darkMode ? "black" : "white"}`,
                            },
                          }}
                          MenuProps={{
                            sx: {
                              ".MuiMenuItem-root": {
                                backgroundColor: `${!darkMode ? "white" : "black"}`,
                                color: `${!darkMode ? "black" : "white"}`,
                                padding: "1px 10px",
                                ":hover": {
                                  backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                                },
                              },
                              ".MuiList-root": {
                                padding: 0,
                              },
                            },
                          }}
                        >
                          {days.map((day) => (
                            <MenuItem value={day} key={day}>
                              {day}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 100 }} className="year">
                      <FormControl
                        sx={{
                          "&& .MuiFormLabel-root": {
                            color: "#9aa1ad",
                          },
                          minWidth: 100,
                          paddingLeft: 0,
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                          value={year}
                          label="Year"
                          onChange={handleChangeYear}
                          sx={{
                            color: "black",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "#767C86",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1d9bf0",
                            },
                            ".MuiSvgIcon-root ": {
                              fill: "#767C86 !important",
                            },
                            ".MuiSelect-select": {
                              color: `${!darkMode ? "black" : "white"}`,
                            },
                          }}
                          MenuProps={{
                            sx: {
                              ".MuiMenuItem-root": {
                                backgroundColor: `${!darkMode ? "white" : "black"}`,
                                color: `${!darkMode ? "black" : "white"}`,
                                padding: "1px 10px",
                                ":hover": {
                                  backgroundColor: `${!darkMode ? "#f0f0f0" : "#16181C"}`,
                                },
                              },
                              ".MuiList-root": {
                                padding: 0,
                              },
                            },
                          }}
                        >
                          {last120Years.map((year) => (
                            <MenuItem value={year} key={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <button
                  className="btn"
                  id="next"
                  onClick={() => {
                    nextShow(1)
                  }}
                  disabled={email === "" || nickName === "" || year === "" || month === "" || day === "" || !validEmail(email) || emailExistError}
                >
                  Next
                </button>
              </div>
            </div>

            <div id="Second Step" className="-mt-10 hidden">
              <div>
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 2 of 3</p>
                <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification} />
                <button
                  className="btn"
                  onClick={() => {
                    nextShow(2)
                  }}
                  disabled={captchaIsDone ? false : true}
                >
                  Next
                </button>
              </div>
            </div>

            <div id="Third Step" className="-mt-10 hidden">
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
                    <VisibilityIcon className="text-primary" />
                  </span>
                </div>
                <div>
                  <Stack severity={`${checkPassword(password) ? "error" : "success"}`}>
                    <Alert severity={`${hasUpperCaseLetter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleTop}>
                      Require uppercase letter
                    </Alert>
                    <Alert severity={`${hasLowerCaseLetter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
                      Require lowercase letter
                    </Alert>
                    <Alert severity={`${hasSpecialCharachter(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
                      Require special character !@#$%^&*()
                    </Alert>
                    <Alert severity={`${hasNumber(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleMiddle}>
                      Require number
                    </Alert>
                    <Alert severity={`${hasCorrectLength(password) ? "success" : "error"}`} sx={styles.signupPasswordCheckStyleBottom}>
                      Require at least 8 characters
                    </Alert>
                  </Stack>

                  <button className="btn mt-16" disabled={checkPassword(password)} onClick={handleLoginEvent}>
                    <Link></Link>
                    Sign Up
                  </button>
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
