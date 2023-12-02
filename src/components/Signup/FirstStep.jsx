import Alert from "@mui/material/Alert"

import axios from "axios"

import { APIs } from "../../constants/signupConstants.js"
import { styles } from "../../styles.js"
import Birthdate from "./Birthdate.jsx"

const FirstStep = ({ nickName, setNickName, email, setEmail, month, setMonth, day, setDay, year, setYear, nextShow, emailExistError, setEmailExistError, validEmail, mock }) => {
  const handleEmailBlur = () => {
    // let emailExist
    axios
      .post(mock ? APIs.mock.emailExistAPI : APIs.actual.emailExistAPI, { email: email })
      .then((res) => {
        setEmailExistError(res.data.message === "Email is existed")
        // emailExist = res.data.message === "Email is existed"
      })
      // .then(() => {
      //   if (emailExist) {
      //     setEmailExistError(true)
      //   } else {
      //     setEmailExistError(false)
      //   }
      // })
      .catch((err) => {
        setEmailExistError(false)

        // console.log(err)
      })
  }

  return (
    <div id="First Step" className="-mt-10 hidden">
      <div className="max-w[600px]">
        <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 1 of 5</p>
        <h1 className="mt-3">Create your account</h1>
        <div className="input-container">
          <input className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" data-testid="nameInput" name="name" id="name" autoComplete="off" value={nickName} onChange={(e) => setNickName(e.target.value)} />
          <label className="input-label" htmlFor="name">
            Name
          </label>
        </div>
        <div className="input-container">
          <input className={`${email === "" ? "form-input" : "form-input filled-input"} ${emailExistError ? "border border-red-600" : ""}`} type="text" data-testid="emailInput" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} />
          <label className={`input-label ${emailExistError ? "text-red-600" : "text-secondary"}`} htmlFor="email">
            Email
          </label>
          {!validEmail(email) && (
            <Alert severity="error" className={`${email ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
              Please enter a valid email
            </Alert>
          )}
          <span className={`ml-3 text-sm text-red-600 ${emailExistError ? "" : "hidden"}`}>Email has already been taken</span>
        </div>
        <div className={`${emailExistError ? "-mt-5" : ""} input-containter`}>
          <div>
            <p className="text-bold">Date of birth </p>
            <p className="date-text text-[0.8rem] text-ternairy">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
            <br></br>
          </div>
          <Birthdate month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} />
        </div>
        <button
          className="btn"
          id="next"
          onClick={() => {
            nextShow(1)
          }}
          data-testid="firstPageNext"
          disabled={email === "" || nickName === "" || year === "" || month === "" || day === "" || !validEmail(email) || emailExistError}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default FirstStep
