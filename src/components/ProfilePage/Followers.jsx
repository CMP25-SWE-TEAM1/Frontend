import React from 'react'
import { Link } from "react-router-dom"
 const Followers = (props) =>  {
  
  return (
    <div id="Followers-Following-div" className="flex flex-row md:w-[50%] lg:w-[35%] h-[5%]    mb-[5%] ">
      <Link to='following' className='w-[calc(95%/2)]'>
    <button id="Following-Button" className="whitespace-nowrap before:text-white w-[100%]  bg-transparent hover:underline text-sm font-light text-[rgb(150,150,150)]">
       {props.following? props.following: 0} Following
    </button>
    </Link>
    <Link to='followers ' className='w-[calc(95%/2)]'>
    <button id="Followers-button" className="whitespace-nowrap before:text-white w-[100%]  bg-transparent hover:underline text-sm font-light text-[rgb(150,150,150)] ">
        {props.followers? props.followers: 0} Followers
    </button>
    </Link>
    </div>
  )
}

export default Followers