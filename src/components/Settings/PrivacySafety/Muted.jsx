import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import axios from "axios"
import { useState, useEffect } from "react"

const Muted = () => {
  const [userData, setUserData] = useState([])

  const APIs = {
    mock: { BlockedAccountsAPI: "http://localhost:3001/blockedAccounts", UnblockUserAPI: "http://localhost:3001/unblockUser" },
    actual: { BlockedAccountsAPI: "", UnblockUserAPI: "" },
  }

  useEffect(() => {
    axios
      .get(APIs.mock.BlockedAccountsAPI)
      .then((res) => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleUnmute(e) {
    const userId = e.target.dataset.id
    if (userId) {
      axios
        .delete(APIs.mock.UnblockUserAPI + `/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("user unblocked successfully")
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
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Muted Accounts</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Here&apos;s everyone you muted. You can add or remove them from this list.</p>
    
      <div>
        {userData.map((user) => (
          <div key={user.id} className="flex h-[85px] w-[600px] hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="w-[10%] pl-2">
              <Link to={`/${user.username}`}>
                <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="Profile Image" className="mt-1 h-10 w-10 rounded-3xl" />
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
              <VolumeOffIcon data-id={user.id} titleAccess="Unmute" className="text-3xl text-red-600 hover:cursor-pointer" onClick={handleUnmute}></VolumeOffIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Muted
