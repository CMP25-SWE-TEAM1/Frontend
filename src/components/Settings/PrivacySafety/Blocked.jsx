import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import BlockIcon from "@mui/icons-material/Block"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const Blocked = () => {
  const [userData, setUserData] = useState([])
  const { token } = useSelector((state) => state.user)

  const APIs = {
    mock: { BlockedAccountsAPI: "http://localhost:3001/blockedAccounts", UnblockUserAPI: "http://localhost:3001/unblockUser", blockUserAPI: "http://localhost:3001/blockUser" },
    actual: { BlockedAccountsAPI: "http://backend.gigachat.cloudns.org/api/user/blockList", UnblockUserAPI: `http://backend.gigachat.cloudns.org/api/user/`, blockUserAPI: `http://backend.gigachat.cloudns.org/api/user/` },
  }

  useEffect(() => {
    console.log(token)
    axios
      .get(APIs.actual.BlockedAccountsAPI + "?page=1&count=1000", {
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

  function handleUnblock(e) {
    const element = e.currentTarget
    const username = element.dataset.username
    const blocked = element.dataset.blocked

    if (blocked == "true") {
      axios
        .patch(
          APIs.actual.UnblockUserAPI + username + "/unblock",
          {},
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            console.log(username + "unblocked successfully")
            element.classList.remove("text-red-600")
            element.classList.add("text-blue-600")
            element.querySelector("title").innerHTML = "Block"
            element.dataset.blocked = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .patch(
          APIs.actual.blockUserAPI + username + "/block",
          {},
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            console.log(username + "blocked successfully")
            element.classList.remove("text-blue-600")
            element.classList.add("text-red-600")
            element.querySelector("title").innerHTML = "Unblock"
            element.dataset.blocked = true
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
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Blocked Accounts</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">When you block someone, that person won&apos;t be able to follow or message you, and you won&apos;t see notifications from them.</p>

      <div>
        {userData.map((user) => (
          <div key={user.id} className="flex h-[85px] w-[600px] hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="w-[10%] pl-2">
              <Link to={`/${user.username}`}>
                <img src={user.profile_image} alt="Profile Image" className="mt-1 h-10 w-10 rounded-3xl" />
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
              <BlockIcon data-username={user.username} data-blocked={true} titleAccess="Unblock" className="text-3xl text-red-600 hover:cursor-pointer hover:brightness-150" onClick={handleUnblock}></BlockIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blocked
