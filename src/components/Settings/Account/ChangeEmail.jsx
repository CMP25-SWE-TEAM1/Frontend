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
  const { user } = useSelector((state) => state.user)
  const [errorMsg, setErrorMsg] = useState("")

  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

  function validEmail(email) {
    return emailRegex.test(email)
  }

  const dispatch = useDispatch()

  const APIs = {
    mock: { ChangeEmailAPI: "http://localhost:3001/changeEmail" },
    actual: { ChangeEmailAPI: "" },
  }

  const handleChangeEmail = () => {
    setErrorMsg("")
    axios
      .patch(APIs.mock.ChangeEmailAPI, { email: email })
      .then((res) => {
        if (res.status == 200) {
          dispatch(changeEmail(email))
          window.location.href = "/settings/account"
        }
      })
      .catch((err) => {
        if (err.response.status === 400) setErrorMsg("Email already exists")
        else setErrorMsg("Error changing email, please try again later")
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
          <input type="text" id="currentEmail"  className="form-input filled-input border-0 !bg-gray-100 !text-ternairy dark:!bg-gray-900" disabled />
          <label className="input-label" htmlFor="email">
            Current email
          </label>
        </div>
      </div>

      <div className="flex flex-col p-5">
        <div className="input-container mb-4">
          <input className={email === "" ? "form-input" : "form-input filled-input"} type="text" id="newEmail" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="input-label" htmlFor="password">
            New email
          </label>
          <Alert severity={`${validEmail(email) ? "success" : "error"}`} className={`${email ? "flex" : "hidden"}`} sx={styles.signupPasswordCheckStyleMiddle}>
            Please enter a valid email
          </Alert>
        </div>
      </div>

      <hr />

      <div className="flex p-5">
        <div className="text-red-600">{errorMsg}</div>
        <button id="changeEmailBtn" className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handleChangeEmail} disabled={email === "" || !validEmail(email)}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangeEmail
