import { Avatar } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import React from "react"

/**
 * Renders a single user search option, displaying the user's avatar, nickname, and username, and navigating to the user's profile page when clicked.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.option - User data to display
 * @param {Object} props.props - Additional props passed to the underlying element
 * @returns {JSX.Element} JSX element representing the user search option
 */
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

// UserSearchComponent.propTypes = {
//   /**
//    * The trend data to display
//    */
//   option: React.PropTypes.object.isRequired,
//   /**
//    * Additional props passed to the underlying element
//    */
//   props: React.PropTypes.object,
// }

export default UserSearchComponent
