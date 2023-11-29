import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
const ProfilePage=() => {
    //name, color, backgroundColor, height, width, link,disabled,disabledColor,hoverBgColor ,darkHoverBgColor
    const darkMode = useSelector((state) => state.theme.darkMode)
    const user     = useSelector((state) => state.user.user)
    return (
        <div>
        <div>
            hello
        </div>
        <Link to={`/${user.name}/following`}>
        <div className="flex flex-row ">
          <button className="bg-black">hello</button>
        </div>
        </Link>
        </div>
    )
}
export default ProfilePage