import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Button from './SmallComponents/FollowButton'
const Followers = () =>{
    const user = useSelector( (state)=> state.user.user)
    return (
        <div className='flex flex-row'>
            <div>
            <Avatar/>
            </div>
            <div className="flex flex-col mt-[-30px] ml-[70px] min-w-full  ">
                    <div id="UserName">
                        <p className={`text-xl opacity-100 font-bold `}>
                            {user.name}
                        </p>
                    </div>
                    <div id="UserTag">
                        <p className="text-[rgba(150,150,150,50)] text-[80%] ">
                           {`@` + user.name}
                        </p>
                    </div>
                </div>
            <div>
                <Button name="Follow" classname={`rounded-[1.5rem] bg-white text-black w-[7vw] 
                text-m h-[5vh] font-semibold ml-[315%]`}></Button>
            </div>
        </div>    
    )
}

export default Followers