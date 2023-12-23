import axios from "axios"

import Alert from "@mui/material/Alert"

import { APIs } from "../../constants/signupConstants.js"

import { useState, useRef, useEffect } from "react"

import { useSelector } from "react-redux"
import { getColor } from "../../constants"

const ForthStep = ({ setUserTag, setOriginalUsername, setUser, setUserToken, nextShow, handleOpenBirthdateError, mock, email }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const [verficationCode, setVerficationCode] = useState("")
  const [emailConfirmationError, setEmailConfirmationError] = useState(false)

  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)

  const resendCode = useRef(null)
  const resendCodeSpan = useRef(null)

  const handleConfirmEmail = () => {
    axios
      .post(mock ? APIs.mock.confirmEmail : APIs.actual.confirmEmail, {
        confirmEmailCode: verficationCode,
        email: email,
      })
      .then((res) => {
        // console.log(res)
        setUserToken(res.data.token)
        setUserTag(res.data.data.suggestedUsername)
        setOriginalUsername(res.data.data.suggestedUsername)
        nextShow(4)
        // return res.data.data.suggestedUsername
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
      .then(() => {
        setIsResending(true)
      })
      .catch((err) => {
        if (mock) {
          setIsResending(true)
        }
        handleOpenBirthdateError()
        console.log(err)
      })
  }

  useEffect(() => {
    let timer

    if (countdown > 0 && isResending) {
      resendCode.current.disabled = true
      resendCodeSpan.current.style.color = darkMode ? "white" : "black"
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }

    if (countdown === 0) {
      setIsResending(false)
      setCountdown(30)
      resendCode.current.disabled = false
      resendCodeSpan.current.style.color = "#1d9bf0"
    }

    return () => clearTimeout(timer)
  }, [countdown, isResending])

  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div id="Forth Step" className="m-auto -mt-10 hidden w-[320px]">
      <div className="!h-fit">
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
        <button ref={resendCode} onClick={handleResendConfirmationEmail} className="w-fit cursor-pointer !bg-transparent">
          <span ref={resendCodeSpan} className={` ${"text-" + getColor(themeColor)} hover:underline`}>
            {isResending ? `Resending in ${countdown}s` : "Resend Email"}
          </span>
        </button>

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

export default ForthStep
