import React from "react";

function SwitchAccount({ profilePhoto, userName, userTag, moreIcon, link }) {
  return (
    <a
      href={link} alt=""
      className="cursor-pointer group box-border w-full border-0 m-0 mt-20"
    >
      <div title="switchAccountContainer" className="w-fit group-hover:bg-gray-300 flex justify-around items-center rounded-full p-2 m-1">
        <div title="profileIcon" className="w-[10%]">{profilePhoto}</div>
        <div className="w-[75%]">
          <div className="truncate font-semibold">{userName}</div>
          <div className="truncate">{userTag}</div>
        </div>
        <div title="moreIcon" className="w-[10%]">{moreIcon}</div>
      </div>
    </a>
  );
}

export default SwitchAccount;
