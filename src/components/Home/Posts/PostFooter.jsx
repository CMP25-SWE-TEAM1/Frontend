import React from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"

function PostFooter({replyCount, reposted, repostsNum, liked, likesNum, viewCount, handleRepostClick, handleLikeClick}) {
  return (
    <div className="post-footer mt-3 flex max-w-full justify-between text-ternairy dark:text-secondary">
            <div className="group -ml-2 flex cursor-pointer items-center transition-colors  duration-300 hover:text-primary" title="Reply">
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
            <div className={`  group flex cursor-pointer items-center transition-colors duration-300 ${reposted? "text-green-500" : ""} hover:text-green-500`} title="Repost">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e8f9ee] dark:group-hover:bg-[#031309] " onClick={handleRepostClick}>
                <CachedOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
              </div>

              <span className="text-sm">{repostsNum}</span>
            </div>
            <div className={`  group flex cursor-pointer items-center transition-colors duration-300 ${liked? "text-pink-600" : ""} hover:text-pink-600`} title="Like">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#f9e5ef] dark:group-hover:bg-[#14000a]" onClick={handleLikeClick}>
                {liked? <FavoriteOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
                : 
                <FavoriteBorderOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />}
                
              </div>

              <span className="text-sm">{likesNum}</span>
            </div>
            <div className="  group flex cursor-pointer  items-center transition-colors duration-300 hover:text-primary" title="Views">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018] ">
                <QueryStatsOutlinedIcon
                  sx={{
                    width: 16,
                    height: 16,
                  }}
                />
              </div>

              <span className="text-sm">{viewCount}</span>
            </div>
            <div className="bookmarkUpload flex">
              <div className={`group flex cursor-pointer items-center transition-colors duration-300 hover:text-primary`} title="Bookmark">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
                  <BookmarkBorderOutlinedIcon
                    sx={{
                      width: 16,
                      height: 16,
                    }}
                  />
                </div>
              </div>
              <div className="  group flex cursor-pointer items-center transition-colors duration-300 hover:text-primary" title="Share">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-inherit group-hover:bg-[#e7f5fd] dark:group-hover:bg-[#031018]">
                  <FileUploadOutlinedIcon
                    sx={{
                      width: 16,
                      height: 16,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
  )
}

export default PostFooter
