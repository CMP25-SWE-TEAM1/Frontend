import { useEffect } from "react"
import { Link } from "react-router-dom"

const UsersContainer = (props) => {
  const users = props.users

  return (
    <div className="user-container">
      {users.map((user) => (
        <Link key={user._id} to={`/${user.username}`}>
          <div className="flex h-[85px] w-[600px] hover:bg-lightHover dark:hover:bg-darkHover">
            <div className="w-[10%] pl-2">
              <img src={user.profile_image} alt="Profile Image" className="h-10 w-10 rounded-3xl" />
            </div>
            <div className="w-[70%] overflow-hidden">
              <h1 className="font-bold hover:underline">{user.nickname}</h1>
              <h2 className="text-sm text-secondary">{`@${user.username}`}</h2>
              <p className="text-sm">{user.bio}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UsersContainer
