import axios from "axios"

import { APIs } from "../../constants/signupConstants.js"

import { useState } from "react"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"

const TagStep = ({ mock, userTag, setUserTag, originalUsername, userToken, user, setUser, nextShow }) => {
  const [usernameError, setUsernameError] = useState(false)

  const handleUsernameBlur = () => {
    axios
      .post(mock ? APIs.mock.checkUsername : APIs.actual.checkUsername, {
        username: userTag,
      })
      .then((res) => {
        setUsernameError(false)
      })
      .catch((err) => {
        if (userTag !== originalUsername) {
          setUsernameError(true)
          console.log(err)
        } else {
          setUsernameError(false)
        }
      })
  }

  const handleAssignUsername = () => {
    axios
      .patch(
        mock ? APIs.mock.assignUsername : APIs.actual.assignUsername,
        {
          username: userTag,
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      )
      .then((res) => {
        const newuser = {
          ...user,
          username: userTag,
        }
        setUser(newuser)
        nextShow(6)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div id="Tag Step" className="-mt-10 hidden">
      <div>
        <h1>What should we call you?</h1>
        <p className="text-xs text-secondary">Your @username is unique. You can always change it later.</p>

        <div className="input-container relative">
          <input className={`${userTag === "" ? "form-input" : "form-input filled-input"} ${usernameError ? "border-red-600" : ""}`} name="userTag" id="userTag" autoComplete="off" value={`${userTag}`} onChange={(e) => setUserTag(e.target.value)} onBlur={handleUsernameBlur} />
          <label className={`${usernameError ? "text-red-600" : ""} input-label`} htmlFor="userTag">
            Username
          </label>
          {!usernameError && <CheckCircleIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-[18px] text-green-600" />}
          {usernameError && <ErrorIcon className="absolute bottom-0 right-0 -translate-x-2 -translate-y-8 text-[18px] text-red-600" />}
          {usernameError && <span className="ml-3 text-sm text-red-600">Username has already been taken</span>}
        </div>
        <button className="btn mt-3" onClick={handleAssignUsername} disabled={usernameError}>
          Next
        </button>
      </div>
    </div>
  )
}

export default TagStep
