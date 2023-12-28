import React from "react"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getColor } from "../../../constants"

function PostFooter({ id, pathname, replyCount, reposted, repostsNum, liked, likesNum, viewCount, handleRepostClick, handleLikeClick }) {
  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div className="post-footer mt-3 flex w-[85%] gap-12 max-xs:gap-[6%] text-ternairy dark:text-secondary">
      <Link>
        <div className={`group pointer-events-auto -ml-2 flex cursor-pointer items-center transition-colors  duration-300 hover:${"text-" + getColor(themeColor)}`} title="Reply">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018] ">
            <ChatBubbleOutlineOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
          <span className="text-sm">{replyCount}</span>
        </div>
      </Link>
      <Link>
        <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 ${reposted ? "text-green-500" : ""} hover:text-green-500`} title="Repost" onClick={handleRepostClick}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e8f9ee] dark:group-hover:bg-[#031309] ">
            <CachedOutlinedIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </div>
          <span className="text-sm">{repostsNum}</span>
        </div>
      </Link>
      <Link>
        <div className={`group  pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 ${liked ? "text-pink-600" : ""} hover:text-pink-600`} title="Like" onClick={handleLikeClick}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#f9e5ef] dark:group-hover:bg-[#14000a]">
            {liked ? (
              <FavoriteOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            )}
          </div>
          <span className="text-sm">{likesNum}</span>
        </div>
      </Link>
      {pathname.search(id) === -1 && (
        <Link>
          <div className={`group  pointer-events-auto flex cursor-pointer  items-center transition-colors duration-300 hover:${"text-" + getColor(themeColor)}`} title="Views">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018] ">
              <SignalCellularAltIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>
            <span className="text-sm">{viewCount}</span>
          </div>
        </Link>
      )}
      {/* <div className={`bookmarkUpload flex ${pathname.search(id) === -1 ? "" : "w-40 justify-between"}`}>
        <Link>
          <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 hover:${"text-" + getColor(themeColor)}`} title="Bookmark">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
              <BookmarkBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>
          </div>
        </Link>
        <Link>
          <div className={`group pointer-events-auto flex cursor-pointer items-center transition-colors duration-300 hover:${"text-" + getColor(themeColor)}`} title="Share">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
              <FileUploadOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>
          </div>
        </Link>
      </div> */}
    </div>
  )
}

export default PostFooter
