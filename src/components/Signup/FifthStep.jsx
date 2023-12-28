import Alert from "@mui/material/Alert"
import VisibilityIcon from "@mui/icons-material/Visibility"
import Stack from "@mui/material/Stack"
import React from "react"

import { Link } from "react-router-dom"

import { useState } from "react"

import axios from "axios"

import { PASSWORD_REGEX, UPPER_CASE_LETTER_REGEX, LOWER_CASE_LETTER_REGEX, SPECIAL_CHARACTER_REGEX, NUMBER_REGEX, LENGTH_REGEX, APIs } from "../../constants/signupConstants.js"
import { styles } from "../../styles.js"

import { useSelector } from "react-redux"
import { getColor } from "../../constants"

/**
 * Generates FifthStep component which guides users through the final stage of the signup process:
 * - Prompts them to create a secure password.
 * - Enforces password strength requirements.
 * - Submits the chosen password to complete signup.
 * - Updates user data and navigates to the next step upon success.
 *
 * @component
 */
const FifthStep = ({ setUser, mock, userToken, userTag, nextShow, password, setPassword }) => {
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
    // console.log({
    //   headers: {
    //     authorization: "Bearer " + userToken,
    //   },
    // })
    // console.log({
    //   password: password,
    // })
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
        // console.log(res)
        nextShow(5)
      })
      .then(() => {
        // console.log(APIs.actual.getProfile + userTag)
        axios
          .get(mock ? APIs.mock.getProfile : APIs.actual.getProfile + userTag, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            console.log(res)
            setUser(res.data.user)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div id="Fifth Step" className="m-auto -mt-10 hidden w-[320px]">
      <div className="!h-fit">
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
            <VisibilityIcon className={`${"text-" + getColor(themeColor)}`} />
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

          <button className="btn mt-16 bg-black dark:bg-white" disabled={checkPassword(password)} onClick={handleAssignPassword}>
            <Link></Link>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

// FifthStep.propTypes = {
//   /**
//    * Function to update the user state
//    */
//   setUser: React.PropTypes.func.isRequired,

//   /**
//    * Boolean indicating whether to use mock APIs
//    */
//   mock: React.PropTypes.bool.isRequired,

//   /**
//    * User authentication token
//    */
//   userToken: React.PropTypes.string.isRequired,

//   /**
//    * User's unique tag
//    */
//   userTag: React.PropTypes.string.isRequired,

//   /**
//    * Function to navigate to the next step
//    */
//   nextShow: React.PropTypes.func.isRequired,

//   /**
//    * Initial password value
//    */
//   password: React.PropTypes.string.isRequired,

//   /**
//    * Function to update the password state
//    */
//   setPassword: React.PropTypes.func.isRequired,
// }
export default FifthStep
