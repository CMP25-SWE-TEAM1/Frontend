import React, { useState } from "react";

import profilePicTest from "../assets/profilePicTest.JPG";

import { Link } from "react-router-dom";

import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const Post = ({
  userName,
  userTag,
  date,
  replyCount,
  repostCount,
  likeCount,
  viewCount,
}) => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null);

  const openMenu = Boolean(anchorPostMenu);

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorPostMenu(null);
  };

  //"Thu Oct 26 2023 23:18:01 GMT+0200 (Eastern European Standard Time)" we need date in this format

  const htmlElement = document.getElementById("htmlid");

  const time1 = Date.parse(date);
  const time2 = new Date().getTime();

  const differenceInMilliseconds = time2 - time1;

  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;

  const intDifferenceInSeconds = Math.floor(differenceInSeconds);
  const intDifferenceInMinutes = Math.floor(differenceInMinutes);
  const intDifferenceInHours = Math.floor(differenceInHours);

  const finalDate =(intDifferenceInHours>24)?Math.floor(intDifferenceInHours/24)+"d": intDifferenceInHours
    ? intDifferenceInHours + "h"
    : intDifferenceInMinutes
    ? intDifferenceInMinutes + "m"
    : intDifferenceInSeconds + "s";

  //fix if houres more that 24

  return (
    <div
      className="h-fit border-gray-200 border dark:border-gray-600 border-r-0 border-l-0 p-3 flex"
      data-testid="postId"
    >
      <div className=" h-60 w-10 sm:mr-3">
        <Avatar
          alt="Remy Sharp"
          src={profilePicTest}
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className=" sm:mr-2">
        <div className="flex justify-between items-center post-header">
          <div className="flex items-center">
            <Link className="hover:underline" to="/mohamedsamir">
              {userName}
              <VerifiedIcon
                className="pl-1 text-primary"
                sx={{ fontSize: "22px" }}
              />
            </Link>
            <Link className="text-ternairy dark:text-secondary text-sm ml-1">
              @{userTag}
            </Link>
            <div className="h-[2px] w-[2px] m-1 bg-ternairy dark:bg-secondary rounded-full"></div>
            <Link
              className="text-ternairy dark:text-secondary text-sm"
              to="/postid"
            >
              {finalDate}
            </Link>
          </div>
          <div>
            <Button
              id="basic-button"
              data-testid="menu-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleMenuButtonClick}
              className="bg-transparent"
            >
              <MoreHorizIcon className="text-secondary" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorPostMenu}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={
                htmlElement.classList.contains("dark")
                  ? {
                      "& .MuiMenu-paper": {
                        background: "black",
                        borderRadius: "20px",
                        boxShadow:
                          "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                        border: "solid 1px #333435",
                      },
                    }
                  : {
                      "& .MuiMenu-paper": {
                        borderRadius: "20px",
                        boxShadow:
                          "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                      },
                    }
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleMenuClose} className="flex items-center">
                <SentimentVeryDissatisfiedIcon className="dark:text-white mr-3 text-base" />
                <span className="dark:text-white text-[15px]">
                  Not interested in this post
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <PersonAddAltIcon className="dark:text-white mr-3 text-base" />
                <span className="dark:text-white text-[15px]">
                  Follow @{userTag}
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <VolumeOffOutlinedIcon className="dark:text-white mr-3 text-base" />
                <span className="dark:text-white text-[15px]">
                  Mute @{userTag}
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <BlockOutlinedIcon className="dark:text-white mr-3 text-base" />
                <span className="dark:text-white text-[15px]">
                  Block @{userTag}
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <QueryStatsOutlinedIcon className="dark:text-white mr-3 text-base" />
                <span className="dark:text-white text-[15px]">
                  View post engagements
                </span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="post-text">
          <div
            className="text-start dark:text-gray-300 max-h-[100px] overflow-hidden"
            data-testid="post-text-id"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi facere
            unde sed amet placeat. Odit consequatur eveniet quam vero, modi
            incidunt libero distinctio commodi quo, ab itaque dolor ipsam. Lorem
            ipsum dolor sit amet, adipisicing elit. Dolorumggg veniam cum
            quibusdam fuga quod ad molestias ratione, repellat voluptatum earum
            error libero! Architecto, at sapiente delectus blandit sunt
            molestias!
          </div>
          {/* <div>show more</div> */}
        </div>
        <div className="mt-3">
          <Link>
            <img src={profilePicTest} alt="" className="rounded-xl" />
          </Link>
        </div>
        <div className="mt-3 flex dark:text-secondary text-ternairy justify-between max-w-full">
          <div
            className="flex hover:text-primary items-center -ml-2 cursor-pointer group  transition-colors duration-300"
            title="Reply"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100 ">
              <ChatBubbleOutlineOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{replyCount}</span>
          </div>
          <div
            className="  flex hover:text-green-500 items-center cursor-pointer group transition-colors duration-300"
            title="Repost"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100 ">
              <CachedOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{repostCount}</span>
          </div>
          <div
            className="  flex hover:text-pink-600 items-center cursor-pointer group transition-colors duration-300"
            title="Like"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100">
              <FavoriteBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{likeCount}</span>
          </div>
          <div
            className="  flex hover:text-primary items-center  cursor-pointer group transition-colors duration-300"
            title="Views"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100 ">
              <QueryStatsOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">{viewCount}</span>
          </div>
          <div
            className={`flex hover:text-primary items-center cursor-pointer group transition-colors duration-300`}
            title="Bookmark"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100">
              <BookmarkBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>
          </div>
          <div
            className="  flex hover:text-primary items-center cursor-pointer group transition-colors duration-300"
            title="Share"
          >
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center dark:group-hover:bg-gray-900 group-hover:bg-gray-100">
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
    </div>
  );
};

export default Post;
