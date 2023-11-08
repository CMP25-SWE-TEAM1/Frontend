import React from "react";

function SwitchAccount({ profilePhoto, userName, userTag, moreIcon, link ,handleLogout}) {
  return (
    <a href={link} alt="" className="group m-0 mt-2 box-border w-full cursor-pointer border-0" onClick={handleLogout}>
      <div title="switchAccountContainer" className="m-1 flex w-fit items-center justify-around rounded-full p-2 group-hover:bg-lightHover dark:group-hover:bg-darkHover">
        <div title="profileIcon" className="w-[10%]">
          {profilePhoto}
        </div>
        <div className="w-[75%]">
          <div className="truncate font-semibold">{userName}</div>
          <div className="truncate">{userTag}</div>
        </div>
        <div title="moreIcon" className="w-[10%]">
          {moreIcon}
        </div>
      </div>
    </a>
  )
}

export default SwitchAccount;
