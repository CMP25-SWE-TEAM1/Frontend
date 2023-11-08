import React from "react";

function SidebarOption({ icon, name, link }) {
  return (
    <a href={link} data-testid="link" alt="" className="group m-0 box-border cursor-pointer border-0">
      <div className="flex w-fit content-center items-start rounded-full p-0.5 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
        <div className="py-2 pl-2">{icon}</div>
        <div className="py-2 pl-4 pr-6">
          <span>{name}</span>
        </div>
      </div>
    </a>
  )
}

export default SidebarOption;
