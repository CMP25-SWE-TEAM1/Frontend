import React, { useState } from "react";

import profilePicTest from "../assets/profilePicTest.JPG";

import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";
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

const Post = () => {
  const [anchorPostMenu, setAnchorPostMenu] = useState(null);

  const openMenu = Boolean(anchorPostMenu);

  const handleMenuButtonClick = (event) => {
    setAnchorPostMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorPostMenu(null);
  };

  return (
    <div className="h-fit border-gray-200 border dark:border-gray-600 border-r-0 border-l-0 p-3 flex">
      <div className=" h-60 w-10 mr-3">
        <Avatar
          alt="Remy Sharp"
          src={profilePicTest}
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className=" flex-1">
        <div className="flex justify-between items-center post-header">
          <div className="flex items-center">
            <Link className="hover:underline" to="/mohamedsamir">
              Mohamed Samir
              <VerifiedIcon
                className="pl-1 text-primary"
                sx={{ fontSize: "22px" }}
              />
            </Link>
            <Link className="text-secondary text-sm ml-1">@MSamir245</Link>
            <div className="h-[2px] w-[2px] m-1 bg-secondary rounded-full"></div>
            <Link className="text-secondary text-sm" to="/postid">
              16h
            </Link>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleMenuButtonClick}
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
              sx={{
                "& .MuiMenu-paper": {
                  backgroundColor: "black",
                  borderRadius: "20px",
                  boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                  border: "solid 1px #333435",
                },
              }}
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
                <SentimentVeryDissatisfiedIcon className="text-white mr-3 text-base shadow-card" />
                <span className="text-white text-[15px]">
                  Not interested in this post
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <PersonAddAltIcon className="text-white mr-3 text-base" />
                <span className="text-white text-[15px]">
                  Follow @MSamir245
                </span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <VolumeOffOutlinedIcon className="text-white mr-3 text-base" />
                <span className="text-white text-[15px]">Mute @MSamir245</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <BlockOutlinedIcon className="text-white mr-3 text-base" />
                <span className="text-white text-[15px]">Block @MSamir245</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <QueryStatsOutlinedIcon className="text-white mr-3 text-base" />
                <span className="text-white text-[15px]">
                  View post engagements
                </span>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="post-text">
          <div className="text-start text-gray-300 max-h-[100px] overflow-hidden">
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
        <div className="mt-3 flex text-secondary  justify-start">
          <div className="  flex hover:text-primary items-center mr-[9%] -ml-2 cursor-pointer group  transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900 ">
              <ChatBubbleOutlineOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">4.9K</span>
          </div>
          <div className="  flex hover:text-green-500 items-center mr-[9%] cursor-pointer group transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900 ">
              <CachedOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">32K</span>
          </div>
          <div className="  flex hover:text-pink-600 items-center mr-[9%] cursor-pointer group transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900">
              <FavoriteBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">86K</span>
          </div>
          <div className="  flex hover:text-primary items-center mr-[9%] cursor-pointer group transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900 ">
              <QueryStatsOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>

            <span className="text-sm">2M</span>
          </div>
          <div className="  flex hover:text-primary items-center cursor-pointer group transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900 ">
              <BookmarkBorderOutlinedIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </div>
          </div>
          <div className="  flex hover:text-primary items-center cursor-pointer group transition-colors duration-300">
            <div className="bg-inherit rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-gray-900">
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
