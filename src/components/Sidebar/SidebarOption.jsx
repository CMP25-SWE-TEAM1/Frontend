import React from "react"
import { useNavigate } from "react-router-dom"

function SidebarOption({ icon, name, link, select }) {
  const navigate = useNavigate()
  return (
    <div
      data-testid="link"
      title={name}
      className="group my-1 box-border cursor-pointer border-0 max-[1278px]:w-fit"
      onClick={() => {
        navigate(link)
      }}
    >
      <div className="flex w-fit content-center items-start rounded-full p-0.5 group-hover:bg-lightHover dark:group-hover:bg-darkHover max-[1278px]:mr-3">
        <div data-testid="icon" className={`py-2 pl-[3px] max-[1278px]:pr-2 xs:pl-2`}>
          {select ? icon[1] : icon[0]}
        </div>
        <div className={`${select ? "font-bold" : ""} py-2 pl-4 pr-6  max-[1278px]:hidden`}>
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}

export default SidebarOption
