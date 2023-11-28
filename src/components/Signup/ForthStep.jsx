import axios from "axios"

import Alert from "@mui/material/Alert"

import { APIs } from "../../constants/signupConstants.js"

import { useState } from "react"

const ForthStep = ({  setUser, setUserToken, nextShow, handleOpenBirthdateError, mock, email }) => {
    
  const [verficationCode, setVerficationCode] = useState("")
  const [emailConfirmationError, setEmailConfirmationError] = useState(false)


  const handleConfirmEmail = () => {
    axios
      .post(mock ? APIs.mock.confirmEmail : APIs.actual.confirmEmail, {
        confirmEmailCode: verficationCode,
        email: email,
      })
      .then((res) => {
        console.log(res)
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

  const handleResendConfirmationEmail = () => {
    axios
      .post(mock ? APIs.mock.resendConfirmationEmail : APIs.actual.resendConfirmationEmail, {
        email: email,
      })
      .catch((err) => {
        handleOpenBirthdateError()
        console.log(err)
      })
  }

  return (
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
        <a onClick={handleResendConfirmationEmail} className="cursor-pointer">
          Resend email
        </a>

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
  )
}
 
export default ForthStep;