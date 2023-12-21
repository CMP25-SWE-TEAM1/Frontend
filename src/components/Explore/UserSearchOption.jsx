import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UserSearchComponent = ({ option, ...props }) => {
  const navigate = useNavigate()

  return (
    <div {...props} key={props.id} className="flex cursor-pointer p-3 hover:bg-lightHover" onClick={() => navigate(`/${option.username}`)}>
      <Avatar alt={option.username} src={option.profile_image} sx={{ width: 40, height: 40 }} />
      <div className="ml-3">
        <div className="text-sm text-secondary">{option.nickname}</div>
        <div className="text-sm text-secondary">@{option.username}</div>
      </div>
    </div>
  )
}

export default UserSearchComponent
