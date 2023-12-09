import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const Muted = () => {
  const [userData, setUserData] = useState([])
  const { token } = useSelector((state) => state.user)

  const APIs = {
    mock: { mutedAccountsAPI: "http://localhost:3001/blockedAccounts", UnmuteUserAPI: "http://localhost:3001/unblockUser", muteUserAPI: "http://localhost:3001/blockUser" },
    actual: { mutedAccountsAPI: "http://backend.gigachat.cloudns.org/api/user/mutedList", UnmuteUserAPI: `http://backend.gigachat.cloudns.org/api/user/`, muteUserAPI: `http://backend.gigachat.cloudns.org/api/user/` },
  }

  useEffect(() => {
    axios
      .get(APIs.actual.mutedAccountsAPI + "?page=1&count=1000", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUserData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleUnmute(e) {
    const element = e.currentTarget
    const username = element.dataset.username
    const muted = element.dataset.muted

    if (muted == "true") {
      axios
        .patch(
          APIs.actual.UnmuteUserAPI + username + "/unmute",
          {},
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            console.log(username + "unmuted successfully")
            element.classList.remove("text-red-600")
            element.classList.add("text-blue-600")
            element.querySelector("title").innerHTML = "mute"
            element.dataset.muted = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .patch(
          APIs.actual.muteUserAPI + username + "/mute",
          {},
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            console.log(username + "muted successfully")
            element.classList.remove("text-blue-600")
            element.classList.add("text-red-600")
            element.querySelector("title").innerHTML = "Unmute"
            element.dataset.muted = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../privacy_and_safety">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Muted Accounts</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Here&apos;s everyone you muted. You can add or remove them from this list.</p>

      <div>
        {userData.map((user) => (
          <div key={user.id} className="flex h-[85px] w-[600px] hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="w-[10%] pl-2">
              <Link to={`/${user.username}`}>
                <img src={user.profile_image} alt="Profile Image" className="h-10 w-10 rounded-3xl" />
              </Link>
            </div>
            <div className="w-[70%] overflow-hidden">
              <Link to={`/${user.username}`}>
                <h1 className="font-bold hover:underline">{user.nickname}</h1>
                <h2 className="text-sm text-secondary">{`@${user.username}`}</h2>
                <p className="text-sm">{user.bio}</p>
              </Link>
            </div>
            <div className="m-auto w-[10%]">
              <VolumeOffIcon data-username={user.username} data-muted={true} titleAccess="Unmute" className="text-3xl text-red-600 hover:cursor-pointer hover:brightness-150" onClick={handleUnmute}></VolumeOffIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Muted
