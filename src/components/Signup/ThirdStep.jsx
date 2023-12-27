import { styles } from "../../styles.js"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Alert from "@mui/material/Alert"

import axios from "axios"

import { APIs } from "../../constants/signupConstants.js"

import { useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const ThirdStep = ({ nickName, email, month, day, year, emailExistError, validEmail, mock, nextShow, handleOpenBirthdateError }) => {
  // eslint-disable-next-line no-unused-vars
  const [birthdateError, setBirthdateError] = useState(false)

  const handleSignup = () => {
    axios
      .post(mock ? APIs.mock.signupAPI : APIs.actual.signupAPI, {
        nickname: nickName,
        birthDate: `${month}-${day}-${year}`,
        email: email,
      })
      .then((res) => {
        console.log(res)
        nextShow(3)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleBack = () => {
    const SecondStep = document.getElementById("Second Step")
    const ThirdStep = document.getElementById("Third Step")

    SecondStep.style.display = "block"
    ThirdStep.style.display = "none"
  }

  const handleCheckBirthdate = () => {
    axios
      .post(mock ? APIs.mock.checkBirthdateAPI : APIs.actual.checkBirthdateAPI, { birthDate: `${month}-${day}-${year}` })
      .then((res) => {})
      .then(() => {
        setBirthdateError(false)
        handleSignup()
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

  return (
    <div id="Third Step" className="m-auto -mt-10 hidden h-fit w-[320px]">
      <ArrowBackIcon className="cursor-pointer" onClick={handleBack} />

      <div className="!h-fit">
        <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 3 of 5</p>
        <h1 className="">Create your account</h1>

        <div className="input-container relative">
          <input readOnly className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="nameRead" autoComplete="off" value={nickName} onFocus={() => nextShow(-1)} />

          <label className="input-label" htmlFor="nameRead">
            Name
          </label>
          <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />
        </div>
        <div className="input-container">
          <input readOnly className={`${email === "" ? "form-input" : "form-input filled-input"} ${emailExistError ? "border border-red-600" : ""}`} type="text" name="email" id="emailRead" autoComplete="off" value={email} onFocus={() => nextShow(-1)} />
          <label className={`input-label ${emailExistError ? "text-red-600" : "text-secondary"}`} htmlFor="emailRead">
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
          <input readOnly className={day === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="nameRead2" autoComplete="off" value={`${month} ${day}, ${year}`} onFocus={() => nextShow(-1)} />

          <label className="input-label" htmlFor="nameRead2">
            Date of birth
          </label>
          <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />
        </div>

        <p className="text-xs text-secondary">
          By signing up, you agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalizing our services, including ads. <a href="/">Learn more</a>. Others will be able to find you by email or phone number, when provided, unless you choose otherwise <a href="/">here</a>.
        </p>

        <button className="btn bg-black dark:bg-white" id="next" onClick={handleCheckBirthdate} disabled={email === "" || nickName === "" || year === "" || month === "" || day === "" || !validEmail(email) || emailExistError}>
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default ThirdStep
