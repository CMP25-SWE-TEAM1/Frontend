import React from 'react'
import { useSelector } from 'react-redux'

const FollowButton = (props) => {
    const darkMode= useSelector((state) => (state.theme.darkMode))
    // there should be a conditional rendering by back
    const buttonName = props.buttonName;
    console.log(buttonName)

  return (
    <div id="follow-buttonDiv" className={`md:ml-[35%] lg:ml-[calc(100%/2)] mt-[2%]`}>
        <button id="follow-button" onClick={()=>{
            if(buttonName === "Edit Profile")
            {
                console.log("I'm here")
               props.ModalHandler(true)
            }
        }} className={` ${darkMode? buttonName==="Follow"? `bg-white text-black
                hover:bg-darkHover dark:hover:bg-lightHover` : 
                buttonName === "Following"? 
                `` /* on hover turn red */
                :`bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover `
                :`bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover`} 
                text-center font-semibold rounded-full w-[110px] h-[35px] 
                border border-b-1 border-t- border-lightBorder dark:border-darkBorder
                }`}>
                    {buttonName}
         </button> {/*todo: conditional rendering white for follow black for unfollow*/}                    
    </div>
  )
}

export default FollowButton