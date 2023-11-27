import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useState } from "react"
import axios from "axios"

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const APIs = {
    mock: { changePasswordAPI: "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io/changePassword" },
    actual: { changePasswordAPI: "" },
  }

  const handlePasswordChange = () => {
    setErrorMsg("")
    // call password check api to compare the actual password
    if (newPassword === confirmPassword) {
      axios
        .patch(APIs.mock.changePasswordAPI, { currentPassword: currentPassword, newPassword: newPassword })
        .then((res) => {
          if (res.status == 200) {
            window.location.href = '/settings/account';
          }
        })
        .catch((err) => {
          if (err.response.status == 401 || err.response.status == 404) {
            setErrorMsg("Incorrect password")
          } else console.log(err)
        })
    } else {
      // error new passwords don't match
      setErrorMsg("New password doesn't match confirmation")
    }
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Change your password</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Change your password at any time.</p>

      <div className="flex flex-col p-5">
        <div className="input-container">
          <input className={currentPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="currentPassword" id="currentPassword" autoComplete="off" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            Current password
          </label>
        </div>
        <Link to={"/password_reset"} className="mt-2 text-xs text-primary">
          Forgot password?
        </Link>
      </div>

      <hr />

      <div className="flex flex-col p-5">
        <div className="input-container mb-4">
          <input className={newPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="newPassword" id="newPassword" autoComplete="off" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            New password
          </label>
        </div>
        <div className="input-container">
          <input className={confirmPassword === "" ? "form-input" : "form-input filled-input"} type="password" name="confirmPassword" id="confirmPassword" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label className="input-label" htmlFor="password">
            Confirm password
          </label>
        </div>
      </div>

      <hr />

      <div className="flex p-5">
        <div className="text-red-600">{errorMsg}</div>
        <button id="confirmPassword" className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90" onClick={handlePasswordChange} disabled={currentPassword === "" || newPassword === "" || confirmPassword === ""}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ChangePassword
