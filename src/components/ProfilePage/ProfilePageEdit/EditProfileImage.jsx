import React from 'react'
import defaultProfilePic from "../../../assets/imgs/Default_Profile_Picture.png"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import { useSelector } from 'react-redux' 
const EditProfileImage = ({profileimage,handlePictureClick,handlePictureChange,hiddenFileInput})=> {
  const {darkMode}= useSelector((state)=>state.theme)
    return (
    <div id="ProfileImageDiv-test" className="relative  m-0 top-[7.5%] ml-[5%] w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img id="ProfileImage-test" src={profileimage ? profileimage : defaultProfilePic} alt="profile" className="h-[120px] w-[120px] rounded-full" />
          </div>
          <button id="AddProfileImage-test" type="button" className="absolute left-[50%] top-[50%] m-auto h-[47px] w-[47px] 
          -translate-x-[50%] -translate-y-[50%] rounded-full bg-white hover:bg-lightHover 
          dark:bg-gray-600 dark:hover:bg-darkHover" onClick={handlePictureClick}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={handlePictureChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
    </div>
  )
}

export default EditProfileImage