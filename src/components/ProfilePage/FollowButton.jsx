import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ProfilePage from './ProfilePage'
const FollowButton = (props) => {
    const darkMode= useSelector((state) => (state.theme.darkMode))
    const {token} = useSelector((state)=>(state.user))
    const mock = false;
    const {token} = useSelector((state)=>(state.user))
    const mock = false;
    const [buttonstate,setbuttonstate]=useState(props.buttonName)
    // there should be a conditional rendering by back
   useEffect(
    ()=>{
        setbuttonstate(props.buttonName)
    },[props.buttonName])
    const APIsf = {
      
        mock: { postfollowProfileAPI:   `http://localhost:3001/api/user/${props.tag}/follow` },
        actual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
        actual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/follow` },
      }
    const APIsuf = {
      
        mock: { postfollowProfileAPI:   `http://localhost:3001/api/user/${props.tag}/unfollow` },
        actual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
        actual: { postfollowProfileAPI: `http://backend.gigachat.cloudns.org/api/user/${props.tag}/unfollow` },
      }
    function HandleClick()
    {
        if(buttonstate ==="Edit Profile")
        {
            //Open Modal
        }
        else if(buttonstate === "Follow")
        {
            axios.post(
                mock? APIsf.mock.postfollowProfileAPI : APIsf.actual.postfollowProfileAPI,
                {},
                {
                    headers:{
                        authorization: `Bearer ${token}` 
                    },
                }
            ).then((res)=>{
                if(res.status ===  204)
                {
                  setbuttonstate("Following")
                }
            }).catch((err)=>{
                console.log(err)
                console.log(props.tag)
            });
        }
        else{
            axios.post(
                mock? APIsuf.mock.postfollowProfileAPI : APIsuf.actual.postfollowProfileAPI,
                {},
                {
                    headers:{
                        authorization : "Bearer " + token,
                    },
                }
            ).then((res)=>{
                if(res.status ===  204)
                {
                   setbuttonstate("Follow")
                }
            }).catch((err)=>{
                console.log(APIsuf.actual.postfollowProfileAPI)
            });
        }
    }
    
  return (
    <div id="follow-buttonDiv" className={`md:ml-[35%] lg:ml-[calc(100%/3)] mt-[2%]`}>
        <button id="follow-button" onClick={()=>{HandleClick()
        }} className={` ${darkMode? buttonstate==="Follow"? `bg-white text-black
                hover:bg-darkHover dark:hover:bg-lightHover` : 
                `bg-black text-white hover:bg-lightHover dark:hover:bg-darkHover `
                : buttonstate==="Follow"? `bg-black text-white hover:bg-darkHover dark:hover:bg-lightHover`
                : `bg-white text-black hover:bg-lightHover dark:hover:bg-darkHover`} 
                text-center font-semibold rounded-full w-[110px] h-[35px] 
                border border-b-1 border-t- border-lightBorder dark:border-darkBorder
                }
                ${buttonstate==="Following"? `hover:border-[red] hover:text-[red]  bt
                ` :`` }`}>
                    <span>{buttonstate}</span>
         </button> {/*todo: conditional rendering white for follow black for unfollow*/}                    
    </div>
  )
}

export default FollowButton