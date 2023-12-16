import React from "react";

function Button({ name,title, color, backgroundColor, height, width, link,disabled,disabledColor,hoverBgColor, darkHoverBgColor, other}) {
  return (
    <a href={link} alt="" className={`m-0 box-border cursor-pointer border-0 w-fit ${color} ${disabled? "pointer-events-none":""} hidden xs:block` }>
      <div title={title} className={`hover:${backgroundColor? "brightness-90" : hoverBgColor ? `${hoverBgColor} dark:hover:${darkHoverBgColor}`:"bg-lightHover dark:hover:bg-darkHover"} flex items-center justify-center ${height} ${width} ${disabled? `${disabledColor} brightness-90`:color} ${backgroundColor} m-0 rounded-full ${other}`}>
        <span className="font-semibold">{name}</span>
      </div>
    </a>
  )
}

export default Button;
