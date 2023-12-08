import React from 'react'
import Button from "@mui/material/Button"
import GeneralButton from "../Sidebar/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

function Popup({openMenu, handleMenuButtonClick, permissionOptions, replyPermissionIndex, anchorPostMenu, handleMenuClose, handleMenuItemClick, htmlElement}) {
  return (
    <div>
          <Button target={"_blank"} color="text-[#1D9BF0]" size="sm" variant="plain" id="basic-button" data-testid="menu-button" aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleMenuButtonClick} className="my-3 rounded-full bg-transparent py-0 hover:bg-[#e7f5fd] dark:bg-transparent dark:hover:bg-[#031018]">
            <GeneralButton name={permissionOptions[replyPermissionIndex].icon2} color="text-[#1D9BF0]" backgroundColor="bg-transparent" height="h-6" width="w-6"></GeneralButton>
            <div className="ml-0.5 text-[14px] normal-case text-[#1D9BF0]">{permissionOptions[replyPermissionIndex].name} can reply</div>
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
                      boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #333435",
                      border: "solid 1px #333435",
                    },
                  }
                : {
                    "& .MuiMenu-paper": {
                      borderRadius: "20px",
                      boxShadow: "0 0 #0000, 0 0 #0000, 0px 0px 10px 1px #767C86",
                    },
                  }
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="ml-3 flex items-center">
              <span className="text-[15px] dark:text-white">
                <b>Who can reply?</b>
                <br />
                Choose who can reply to this post.
                <br />
                Anyone mentioned can always reply.
              </span>
            </div>
            {permissionOptions.map((option, index) => (
              <MenuItem key={option.name} onClick={(event) => handleMenuItemClick(event, index)}>
                <GeneralButton name={option.icon1} color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-10" width="w-10"></GeneralButton>
                <span className="ml-3 text-[15px] dark:text-white">
                  <b>{option.name}</b>{" "}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </div>
  )
}

export default Popup
