import { useState } from "react"
import React from 'react'
import { Modal, Box } from "@mui/material"
import { useSelector } from "react-redux"
const ProfilePageEdit = (openModal,handleCloseModal)=>{
/*const [windowWidth, setWindowWidth] = useState(window.innerWidth)
const user = useSelector((state)=>state.user.user)
  const modalStyle = {
    position: "absolute",
    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }
  function sendRequest()
  {

  }
    return (
    <div id="Edit-Profile" className="place-content-center">
       <Modal open={false} onClose = {handleCloseModal} data-testid="ProfileEditModal" >
        <Box style={modalStyle} >
            <div className="pop-up m-auto min-w-[350px] bg-white dark:bg-black md:rounded-2xl overflow-y-auto overflow-x-hidden">
            <button className="relative  top-1 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>
            <form onSubmit={()=>{this.sendRequest()}} className="w-[100%] h-[100%]">
                <div className="w-[100%] h-[25%] place-content-center">
                <input type="text" id="Profname" className={`w-[90%] h-[40%] justify-center bg-transparent border-[1px]
                border-white rounded-xl ml-[5%] mt-[2%] ${"" === "" ? "form-input" : "form-input filled-input"}`} ></input>
                <label className="input-label" htmlFor="Profname">
                    Name
                </label>
                </div>
                <div  className="w-[100%] h-[25%]">
                <p className="">bio</p>
                <input type="text" className="w-[80%] h-[30%] justify-center" ></input>
                </div>
                <p>Location</p>
                <div  className="w-[100%] h-[25%]">
                <input type="text" className="w-[80%] h-[30%] justify-center" ></input>
                </div>
                <p>website</p>
                <div className="w-[100%] h-[25%]">
                <input type="text" className="w-[80%] h-[30%] justify-center" ></input>
                </div>
            </form>
            </div>
        </Box>
       </Modal>
    </div>)
    */}

export default ProfilePageEdit