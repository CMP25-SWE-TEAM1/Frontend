import React from "react";

function Button({ name, color, backgroundColor, height, width, link }) {
  return (
    <a
      href={link}
      alt=""
      className={`cursor-pointer group  box-border border-0 m-0`}
    >
      <div
        title="buttonNameContainer"
        className={`group-hover:${
          backgroundColor ? "brightness-90" : "bg-gray-300"
        } flex justify-center items-center ${height} ${width} ${color} ${backgroundColor} rounded-full m-1`}
      >
        <span className="font-semibold">{name}</span>
      </div>
    </a>
  );
}

export default Button;
