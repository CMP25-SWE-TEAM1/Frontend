import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import BlockIcon from "@mui/icons-material/Block"
import axios from "axios"
import { useState, useEffect } from "react"

const Blocked = () => {
  const [userData, setUserData] = useState([])

  const APIs = {
    mock: { BlockedAccountsAPI: "http://localhost:3001/blockedAccounts", UnblockUserAPI: "http://localhost:3001/unblockUser", blockUserAPI: "http://localhost:3001/blockUser" },
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

  function handleUnblock(e) {
    const element = e.currentTarget
    const userId = e.currentTarget.dataset.id
    const blocked = e.currentTarget.dataset.blocked
    if (userId) {
      if(blocked == "true"){
        axios
        .delete(APIs.mock.UnblockUserAPI + `?id=${userId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("user unblocked successfully")
            element.classList.remove("text-red-600")
            element.classList.add("text-blue-600")
            element.querySelector("title").innerHTML = "Block"
            element.dataset.blocked = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
      else{
        axios
        .post(APIs.mock.blockUserAPI + `?id=${userId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("user blocked successfully")
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
              <BlockIcon data-id={user.id} data-blocked={true} titleAccess="Unblock" className="text-3xl text-red-600 hover:cursor-pointer hover:brightness-150" onClick={handleUnblock}></BlockIcon>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blocked
