import React from "react"
import { useNavigate } from "react-router-dom"

function SidebarOption({ icon, name, link }) {
  const navigate = useNavigate()
  return (
    <div data-testid="link" alt="" className="group m-0 box-border cursor-pointer border-0" onClick={() => navigate(link)}>
      <div className="flex w-fit content-center items-start rounded-full p-0.5 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
        <div data-testid="icon" className="py-2 pl-2">{icon}</div>
        <div className="py-2 pl-4 pr-6">
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}

export default SidebarOption
