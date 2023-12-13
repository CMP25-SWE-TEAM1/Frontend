import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import axios from "axios"
import { useSelector } from "react-redux"

function Post({userTag, id, userProfilePicture, userName, descriptionLines, mediaUrls,
   mediaTypes, replCount, reposted,repostsNum, liked, likesNum, finalDate, isVisible,
    viewCount, handleMouseEnter, handleMouse}) {
  return (
    <Link className="w-full" to={`/${userTag}/status/${id}`}>
      <div className=" h-fit border border-l-0 border-r-0 border-lightBorder p-3 hover:bg-lightHover dark:border-darkBorder dark:hover:bg-darkHover" data-testid="postId">
        <div></div>
        <div className="flex">
          <div className=" h-fit w-10 sm:mr-3">
            <Link className="hover:brightness-90" to={`/${userTag}`}>
              <Avatar alt="Remy Sharp" src={userProfilePicture} sx={{ width: 40, height: 40 }} />
            </Link>
          </div>
          <div className=" w-full sm:mr-2">
            <PostHeader userTag={userTag} userProfilePicture={userProfilePicture} userName={userName} finalDate={finalDate} id={id} isVisible={isVisible} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} hoveredProfile={hoveredProfile} openMenu={openMenu} anchorPostMenu={anchorPostMenu} handleMenuClose={handleMenuClose} htmlElement={htmlElement} handleMenuButtonClick={handleMenuButtonClick}/>
          </div>
        </div>
        <PostBody descriptionLines={descriptionLines} mediaUrls={mediaUrls} mediaTypes={mediaTypes}/>
        <PostFooter replyCount={replyCount} reposted={reposted} repostsNum={repostsNum} liked={liked} likesNum={likesNum} viewCount={viewCount} handleRepostClick={handleRepostClick} handleLikeClick={handleLikeClick} />
      </div>
    </Link>
  )
}

export default Post
