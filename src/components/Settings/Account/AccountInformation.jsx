import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import axios from "axios"
import { useSelector } from "react-redux"

const AccountInformation = () => {
  const [passwordIsConfirmed, setPasswordIsConfirmed] = useState(sessionStorage.getItem("passwordIsConfirmed"))
  const { user, token } = useSelector((state) => state.user)

  const Information = () => {
    return (
      <div>
        <div className="flex items-center pl-4">
          <Link to="/settings/account">
            <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
          </Link>
          <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Account information</h1>
        </div>
        <p className="mb-4 pl-4 pr-10 text-xs text-secondary">View and update your account information, like your username and email address.</p>
        <Link to="/settings/change_username">
          <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="flex h-[57px] flex-col justify-center p-[11px]">
              <div className="w-[90%] text-sm">Username</div>
              <p className="text-xs text-secondary">{user && user.username}</p>
            </div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
        <Link to="/settings/change_email">
          <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="flex h-[57px] flex-col justify-center p-[11px]">
              <div className="w-[90%] text-sm">Email</div>
              <p className="text-xs text-secondary">{user && user.email}</p>
            </div>
            <div className="m-auto mr-3 text-2xl">&gt;</div>
          </div>
        </Link>
      </div>
    )
  }

  const ConfirmPassword = () => {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const APIs = {
      mock: { confirmPasswordAPI: "http://localhost:3001/checkPassword" },
      actual: { confirmPasswordAPI: "http://backend.gigachat.cloudns.org/api/user/confirmPassword" },
    }

    const handleConfirmPassword = () => {
      console.log(token)
      setErrorMsg("")
      axios
        .post(
          APIs.actual.confirmPasswordAPI,
          { password: password },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem("passwordIsConfirmed", "true")
            setSuccessMsg(res.data.data.message)
            setTimeout(() => {
              setPasswordIsConfirmed("true")
            }, 2000)
          }
        })
        .catch((err) => {
          if (err.response.data.message) setErrorMsg(err.response.data.message)
          else setErrorMsg("Internal server error, please try again later")
          console.log(err)
        })
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div>
        <div className="flex items-center pl-4">
          <Link to="/settings/account">
            <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
          </Link>
          <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Account information</h1>
        </div>
        <p className="mb-4 pl-4 pr-10 text-xs text-secondary">View and update your account information, like your username and email address.</p>
        <hr />
        <div className="flex flex-col p-5">
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
          <Link to={"/password_reset"} className="mt-2 text-xs text-primary">
            Forgot password?
          </Link>
        </div>

        <hr />
        <div className="flex p-5">
          <div className="text-red-600">{errorMsg}</div>
          <div className="text-green-600">{successMsg}</div>
          <button id="confirmPassword" className="btn ml-auto mt-6 w-24 !bg-primary !text-white hover:brightness-90" onClick={handleConfirmPassword} disabled={password === ""}>
            Confirm
          </button>
        </div>
      </div>
    )
  }

  return passwordIsConfirmed === "true" ? <Information /> : <ConfirmPassword />
}

export default AccountInformation
