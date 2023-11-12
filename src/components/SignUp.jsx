import { useEffect, useRef, useState } from "react"
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Typography from "@mui/material/Typography"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginUser, signupUser } from "../store/UserSlice"

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
  const [verficationCode, setVerficationCode] = useState("")
  const [day, setDay] = useState("")
  const [userToken, setUserToken] = useState("")
  const [user, setUser] = useState()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [emailExistError, setEmailExistError] = useState(false)
  const [birthdateError, setBirthdateError] = useState(false)
  const [emailConfirmationError, setEmailConfirmationError] = useState(false)

  const APIs = {
    mock: { emailExistAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/checkEmail" },
    actual: {
      emailExistAPI: "http://13.48.45.126:3000/api/user/checkExistedEmail",
      checkBirthdateAPI: "http://13.48.45.126:3000/api/user/checkBirthDate",
      signupAPI: "http://13.48.45.126:3000/api/user/signup",
      resendConfirmationEmail: "http://13.48.45.126:3000/api/user/resendConfirmEmail",
      confirmEmail: "http://13.48.45.126:3000/api/user/confirmEmail",
      assignPassword: "http://13.48.45.126:3000/api/user/AssignPassword",
    },
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  function nextShow(position) {
    const JoinGigaChat = document.getElementById("Join GigaChat")
    const FirstStep = document.getElementById("First Step")
    const SecondStep = document.getElementById("Second Step")
    const ThirdStep = document.getElementById("Third Step")
    const ForthStep = document.getElementById("Forth Step")
    const FifthStep = document.getElementById("Fifth Step")

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
      case 3:
        ThirdStep.style.display = "none"
        ForthStep.style.display = "block"
        break
      case -1:
        ThirdStep.style.display = "none"
        FirstStep.style.display = "block"
        break
      case 4:
        ForthStep.style.display = "none"
        FifthStep.style.display = "block"
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

    dispatch(loginUser({ user, isgoogle: null, issignup: true })).then((result) => {
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
      .post(APIs.actual.emailExistAPI, { email: email })
      .then((res) => {
        emailExist = res.data.message === "Email is existed"
      })
      .then(() => {
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

  const handleSignup = () => {
    axios
      .post(APIs.actual.signupAPI, {
        nickname: nickName,
        birthDate: `${month}-${day}-${year}`,
        email: email,
      })
      .catch((err) => {
        handleOpenBirthdateError()
        console.log(err)
      })
  }

  const handleCheckBirthdate = () => {
    let acceptedBirthdate
    axios
      .post(APIs.actual.checkBirthdateAPI, { birthDate: `${month}-${day}-${year}` })
      .then((res) => {
        acceptedBirthdate = res.data.message === "User is above 13 years old."
      })
      .then(() => {
        setBirthdateError(false)
        handleSignup()
        nextShow(3)
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 403") {
          setBirthdateError(true)
          handleOpenBirthdateError()
        } else {
          console.log(err)
        }
      })
  }

  const [openBirthdateErrorModal, setOpenBirthdateErrorModal] = useState(false)
  const handleOpenBirthdateErrorModal = () => setOpenBirthdateErrorModal(true)
  const handleCloseBirthdateErrorModal = () => setOpenBirthdateErrorModal(false)

  const handleOpenBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page")
    const ThirdStep = document.getElementById("Third Step")

    ThirdStep.style.display = "none"
    ErrorPage.style.display = "block"

    handleOpenBirthdateErrorModal()
  }

  const handleCloseBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page")
    const FirstStep = document.getElementById("First Step")

    ErrorPage.style.display = "none"
    FirstStep.style.display = "block"

    setDay("")
    setMonth("")
    setYear("")
    setNickName("")
    setEmail("")

    handleCloseBirthdateErrorModal()
  }

  const handleResendConfirmationEmail = () => {
    axios
      .post(APIs.actual.resendConfirmationEmail, {
        email: email,
      })
      .catch((err) => {
        handleOpenBirthdateError()
        console.log(err)
      })
  }

  const handleAssignPassword = () => {
    axios
      .post(APIs.actual.assignPassword, {
        token: userToken,
        password: password,
      })
      .then((res) => {
        dispatch(signupUser({ user: user })).then((result) => {
          if (result.payload) {
            setNickName("")
            setPassword("")
            navigate("/home")
            handleCloseModal()
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleConfirmEmail = () => {
    axios
      .post(APIs.actual.confirmEmail, {
        confirmEmailCode: verficationCode,
        email: email,
      })
      .then((res) => {
        setUserToken(res.data.token)
        setUser(res.data.data.user)
        nextShow(4)
      })
      .catch((err) => {
        console.log(err)
        setEmailConfirmationError(true)
        setVerficationCode("")
        setTimeout(() => {
          setEmailConfirmationError(false)
        }, 3000)
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
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 1 of 5</p>
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
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 2 of 5</p>
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
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 3 of 5</p>
                <h1 className="">Create your account</h1>

                <div className="input-container relative">
                  <input readOnly className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="name" autoComplete="off" value={nickName} onFocus={() => nextShow(-1)} />

                  <label className="input-label" htmlFor="name">
                    Name
                  </label>
                  <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />
                </div>
                <div className="input-container">
                  <input readOnly className={`${email === "" ? "form-input" : "form-input filled-input"} ${emailExistError ? "border border-red-600" : ""}`} type="text" name="email" id="email" autoComplete="off" value={email} onFocus={() => nextShow(-1)} />
                  <label className={`input-label ${emailExistError ? "text-red-600" : "text-secondary"}`} htmlFor="email">
                    Email
                  </label>
                  <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />

                  {!validEmail(email) && (
                    <Alert severity="error" className={`${email ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
                      Please enter a valid email
                    </Alert>
                  )}
                  {emailExistError && <span className="ml-3 text-sm text-red-600">Email has already been taken</span>}
                </div>
                <div className="input-container relative">
                  <input readOnly className={day === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="name" autoComplete="off" value={`${month} ${day}, ${year}`} onFocus={() => nextShow(-1)} />

                  <label className="input-label" htmlFor="name">
                    Date of birth
                  </label>
                  <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />
                </div>

                <p className="text-xs text-secondary">
                  By signing up, you agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>, including <a>Cookie Use</a>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. <a>Learn more</a>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <a>here</a>.
                </p>

                <button className="btn" id="next" onClick={handleCheckBirthdate} disabled={email === "" || nickName === "" || year === "" || month === "" || day === "" || !validEmail(email) || emailExistError}>
                  Sign Up
                </button>
              </div>
            </div>

            <div id="Forth Step" className="-mt-10 hidden">
              <div>
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 4 of 5</p>
                <h1 className="">We sent you a code</h1>
                <p className="text-xs text-secondary">Enter it below to verify {email}.</p>
                <div className="input-container relative">
                  <input
                    className={verficationCode === "" ? "form-input" : "form-input filled-input"}
                    type="text"
                    name="verficationCode"
                    id="verficationCode"
                    autoComplete="off"
                    value={verficationCode}
                    onChange={(e) => {
                      setVerficationCode(e.target.value)
                    }}
                  />
                  {/* {console.log(user)} */}

                  <label className="input-label" htmlFor="verficationCode">
                    Verfication Code
                  </label>
                </div>
                <a onClick={handleResendConfirmationEmail}>Resend email</a>

                {emailConfirmationError && <Alert severity="error">Verfication Code is wrong</Alert>}

                <button
                  className="btn mt-20"
                  onClick={() => {
                    handleConfirmEmail()
                  }}
                  disabled={verficationCode === ""}
                >
                  Next
                </button>
              </div>
            </div>

            <div id="Fifth Step" className="-mt-10 hidden">
              <div>
                <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 5 of 5</p>
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

                  <button className="btn mt-16" disabled={checkPassword(password)} onClick={handleAssignPassword}>
                    <Link></Link>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>

            <div id="Error Page" className="-mt-10 hidden">
              <div>
                <Modal className="relative" open={openBirthdateErrorModal} onClose={handleCloseBirthdateErrorModal} disableEscapeKeyDown disablePortal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, 100%)",
                      width: 300,
                      bgcolor: "transparent",
                      border: "1px solid white",
                      boxShadow: 24,
                      p: 2,
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // marginTop: "45%",
                    }}
                  >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Can't complete your signup right now.
                    </Typography>
                    <button className="btn mt-3 w-[100px]" onClick={handleCloseBirthdateError}>
                      Close
                    </button>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default SignUp
