import React, { useEffect } from "react";

function SwitchAccount({ profilePhoto, userName, userTag, moreIcon, link ,handleLogout}) {
  return (
    <a href={link} alt="" className="group mt-auto mb-2 box-border w-full cursor-pointer border-0" onClick={handleLogout}>
      <div title="switchAccountContainer" className="m-1 flex w-fit items-center justify-around rounded-full p-2 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
        <div title="profileIcon" className="w-[18%]">
          {profilePhoto}
        </div>
        <div className="w-[75%] max-[1278px]:hidden">
          <div className="truncate font-semibold">{userName}</div>
          <div className="truncate text-secondary">{userTag}</div>
        </div>
        <div title="moreIcon" className="w-[10%] max-[1278px]:hidden">
          {moreIcon}
        </div>
      </div>
    </a>
  )
}

export default SwitchAccount;
