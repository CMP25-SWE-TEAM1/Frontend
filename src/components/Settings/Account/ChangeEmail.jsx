import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"
import Alert from "@mui/material/Alert"
import { styles } from "../../../styles"
import { changeEmail } from "../../../store/UserSlice"

const ChangeEmail = () => {
  const [email, setEmail] = useState("")
  const { user, token } = useSelector((state) => state.user)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [emailChosen, setEmailChosen] = useState(false)

  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  function validEmail(email) {
    return emailRegex.test(email)
  }

  const dispatch = useDispatch()

  const APIs = {
    mock: { ChangeEmailAPI: "http://localhost:3001/changeEmail", VerifyEmailAPI: "http://localhost:3001/verifyEmail" },
    actual: { ChangeEmailAPI: "http://backend.gigachat.cloudns.org/api/user/updateEmail", VerifyEmailAPI: "http://backend.gigachat.cloudns.org/api/user/verifyEmail" },
  }

  const handleChangeEmail = () => {
    setErrorMsg("")
    axios
      .post(
        APIs.actual.ChangeEmailAPI,
        { email: email },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setEmailChosen(true)
          setSuccessMsg(res.data.data.message)
        }
      })
      .catch((err) => {
        if (err.response.data.message) setErrorMsg(err.response.data.message)
        else setErrorMsg("Internal server error, please try again later")
        console.log(err)
      })
  }

  const handleVerifyEmail = () => {
    setErrorMsg("")
    axios
      .post(
        APIs.actual.VerifyEmailAPI,
        { verifyEmailCode:verificationCode, email: email },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          dispatch(changeEmail(email))
          setSuccessMsg(res.data.data.message)
          setTimeout(() => {
            //window.location.href = "/settings/account"
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.data.message) setErrorMsg(err.response.data.message)
        else setErrorMsg("Internal server error, please try again later")
        console.log(err)
      })
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account_information">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Change your email</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Update your email address.</p>

      <div className="flex flex-col p-5">
        <div className="input-container">
          <input type="text" id="currentEmail" value={user && user.email} className="form-input filled-input border-0 !bg-gray-100 !text-ternairy dark:!bg-gray-900" disabled />
          <label className="input-label" htmlFor="email">
            Current email
          </label>
        </div>
      </div>

      <div className="flex flex-col p-5">
        <div className="input-container">
          <input className={email === "" ? "form-input" : "form-input filled-input"} type="text" id="newEmail" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="input-label" htmlFor="password">
            New email
          </label>
          <Alert severity={`${validEmail(email) ? "success" : "error"}`} className={`${email ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
            Please enter a valid email
          </Alert>
        </div>
      </div>

      <div className="flex flex-col p-5">
        <div className="input-container mb-4">
          <input disabled={!emailChosen} className={ verificationCode === "" ? "form-input" : "form-input filled-input" } type="text" id="newEmail" autoComplete="off" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <label className="input-label" htmlFor="password">
            Verification code
          </label>
        </div>
      </div>

      <hr />
      <div className="flex p-5">
        <div className="text-red-600">{errorMsg}</div>
        <div className="text-green-600">{successMsg}</div>
        <button id="changeEmailBtn" hidden={emailChosen} className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handleChangeEmail} disabled={email === "" || !validEmail(email)}>
          Save
        </button>
        <button id="verifyEmailBtn" hidden={!emailChosen} className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handleVerifyEmail} disabled={verificationCode === ""}>
          Verify
        </button>
      </div>
    </div>
  )
}

export default ChangeEmail
