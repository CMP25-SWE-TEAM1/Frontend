import React from "react";

function SidebarOption({ icon, name, link }) {
  return (
    <a
      href={link}
      data-testid="link"
      alt=""
      className="cursor-pointer group box-border w-full border-0 m-0"
    >
      <div className="w-fit group-hover:bg-gray-300 items-start flex content-center rounded-full m-0.5 p-0.5">
      <div className="py-2 pl-2">
      {icon}
      </div>
      <div className="py-2 pl-4 pr-6">
        <span>{name}</span>
      </div>
      </div>
    </a>
  );
}

export default SidebarOption;
