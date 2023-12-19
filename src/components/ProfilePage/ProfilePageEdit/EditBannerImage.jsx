import React from 'react'
import CoverImage from "../CoverImage.jsx"
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"
import {DefaultCoverPage} from "../../../constants/index"
import { useSelector } from 'react-redux'

const EditBannerImage = ({coverpage,handlecoverPictureChange,handlecoverPictureClick,hiddencoverFileInput,setCoverpage}) => {
    const {darkMode} = useSelector((state)=>state.theme)
  return (
    <div id="CoverimageDiv-test" className="relative h-[135px]  w-[100%]">
    <CoverImage  coverimage={coverpage} height="h-[200px]" ></CoverImage>
    <button id="AddImage-test" type="button" className={`absolute ${coverpage === DefaultCoverPage || coverpage === undefined? `left-[50%]`:`left-[40%] `} m-auto h-[47px] w-[47px] 
    top-[100px] -translate-x-[50%] -translate-y-[50%]
     rounded-full bg-white hover:bg-lightHover
     dark:bg-gray-600 dark:hover:bg-darkHover`} onClick={handlecoverPictureClick}>
        <AddAPhotoOutlinedIcon  className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
        <input
          type="file"
          onChange={handlecoverPictureChange}
          ref={hiddencoverFileInput}
          style={{ display: "none" }} // Make the file input element invisible
        />
      </button>
      <button id="remove-banner-test" type="button" className={`absolute font-medium text-xl left-[60%]  top-[100px]
       m-auto h-[47px] w-[47px] 
      -translate-x-[50%] -translate-y-[50%]  rounded-full bg-white hover:bg-lightHover
      dark:bg-gray-600 dark:hover:bg-darkHover ${coverpage === DefaultCoverPage || coverpage === undefined? `hidden` :``} `} 
      onClick={
        ()=>{
          setCoverpage(DefaultCoverPage)
        }
      } >
          x
        </button>
    </div>
  )
}

export default EditBannerImage