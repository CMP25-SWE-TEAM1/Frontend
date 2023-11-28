import Alert from "@mui/material/Alert"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Stack from "@mui/material/Stack"

import { Link } from "react-router-dom"

import { useState } from "react"

import axios from "axios"

import { PASSWORD_REGEX, UPPER_CASE_LETTER_REGEX, LOWER_CASE_LETTER_REGEX, SPECIAL_CHARACTER_REGEX, NUMBER_REGEX, LENGTH_REGEX, EMAIL_REGEX, APIs } from "../../constants/signupConstants.js"
import { styles } from "../../styles.js"

const FifthStep = ({ mock, user, setUser, setUserTag, userToken, setOriginalUsername, nextShow, password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  function checkPassword(password) {
    return !PASSWORD_REGEX.test(password)
  }
  function hasUpperCaseLetter(password) {
    return UPPER_CASE_LETTER_REGEX.test(password)
  }
  function hasLowerCaseLetter(password) {
    return LOWER_CASE_LETTER_REGEX.test(password)
  }
  function hasSpecialCharachter(password) {
    return SPECIAL_CHARACTER_REGEX.test(password)
  }
  function hasNumber(password) {
    return NUMBER_REGEX.test(password)
  }
  function hasCorrectLength(password) {
    return LENGTH_REGEX.test(password)
  }

  const handleAssignPassword = () => {
    axios
      .patch(
        mock ? APIs.mock.assignPassword : APIs.actual.assignPassword,
        {
          password: password,
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      )
      .then((res) => {
        setUser(res.data.data.currentUser)
        setUserTag(user.username)
        setOriginalUsername(user.username)
        nextShow(5)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div id="Fifth Step" className="-mt-10 hidden">
      <div>
        <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 5 of 5</p>
        <h1>You'll need a Password</h1>
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
  )
}

export default FifthStep
