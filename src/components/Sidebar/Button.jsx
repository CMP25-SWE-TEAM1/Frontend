import React, { useEffect } from "react"

function Button({ name, title, color, backgroundColor, height, width, link, disabled, disabledColor, hoverBgColor, darkHoverBgColor, other }) {
  // useEffect(() => {
  //   console.log(name+backgroundColor)
  // },[backgroundColor])

  return (
    <a href={link} alt="" className={`m-0 box-border w-fit cursor-pointer border-0 ${"!" + color} ${disabled ? "pointer-events-none" : ""}`}>
      <div title={title} className={`hover:${backgroundColor ? "brightness-90" : hoverBgColor ? `${hoverBgColor} dark:hover:${darkHoverBgColor}` : "bg-lightHover dark:hover:bg-darkHover"} flex items-center justify-center ${height} ${width} ${disabled ? `${disabledColor} brightness-90` : color} ${backgroundColor} m-0 rounded-full ${other}`}>
        <span className="font-semibold">{name}</span>
      </div>
    </a>
  )
}

export default Button
