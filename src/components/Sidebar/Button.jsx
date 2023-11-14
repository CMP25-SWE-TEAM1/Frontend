import React from "react";

function Button({ name, color, backgroundColor, height, width, link }) {
  return (
    <a href={link} alt="" className={`group m-0 ${color} box-border cursor-pointer border-0 w-fit`}>
      <div title="buttonNameContainer" className={`group-hover:${backgroundColor!=="" ? "brightness-90" : "bg-lightHover dark:hover:bg-darkHover"} flex items-center justify-center ${height} ${width} ${color} ${backgroundColor} m-0 rounded-full`}>
        <span className="font-semibold">{name}</span>
      </div>
    </a>
  )
}

export default Button;