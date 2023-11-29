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
            <div className='flex flex-col'>
            <p>{user.name}</p>
            <p>{user.name}</p>
            </div>
            <div>
                <Button name="Follow" classname={`rounded-[1.5rem] bg-white text-black w-[7vw] 
                text-m h-[5vh] font-semibold ml-[315%]`}></Button>
            </div>
        </div>    
    )
}

export default Followers