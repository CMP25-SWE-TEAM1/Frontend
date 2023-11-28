import React from "react"
import { useNavigate } from "react-router-dom"

function SidebarOption({ icon, name, link }) {
  const navigate = useNavigate()
  return (
    <div data-testid="link" className="group my-1 box-border cursor-pointer border-0 max-[1278px]:w-fit" onClick={() => navigate(link)}>
      <div className="flex w-fit content-center items-start rounded-full p-0.5 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
        <div className="py-2 pl-2 max-[1278px]:pr-2">{icon}</div>
        <div className="py-2 pl-4 pr-6 max-[1278px]:hidden">
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}

export default SidebarOption
