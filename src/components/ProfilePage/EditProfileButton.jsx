import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const EditProfileButton = ({handleOpenProfileEditModal,display}) => {
    const navigate = useNavigate();
    const {darkMode} = useSelector((state)=>state.theme)
  return (
    <button onClick={()=>{
        handleOpenProfileEditModal()
        navigate('/settings/profile')
    }} className={`relative right-[10px] ${display} ${darkMode? `bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover`: `bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover` }
    h-[40px] w-[120px] rounded-full border border-lightBorder text-center  font-[500] dark:border-darkBorder`}>Edit Profile</button>
  )
}

export default EditProfileButton