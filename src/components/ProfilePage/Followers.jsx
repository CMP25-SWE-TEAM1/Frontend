import React from "react"
import { Link } from "react-router-dom"
const Followers = (props) => {
  return (
    <div id="Followers-Following-div" className="mb-[5%] flex h-[5%] flex-row md:w-[50%]    lg:w-[35%] ">
      <Link to="following" className="w-[calc(95%/2)]">
        <button id="Following-Button" className="w-[100%] whitespace-nowrap bg-transparent  text-sm font-light text-[rgb(150,150,150)] before:text-white hover:underline">
          {props.following ? props.following : 0} Following
        </button>
      </Link>
      <Link to="followers " className="w-[calc(95%/2)]">
        <button id="Followers-button" className="w-[100%] whitespace-nowrap bg-transparent  text-sm font-light text-[rgb(150,150,150)] before:text-white hover:underline ">
          {props.followers ? props.followers : 0} Followers
        </button>
      </Link>
    </div>
  )
}

export default Followers
