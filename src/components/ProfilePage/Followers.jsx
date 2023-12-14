import React from 'react'

 const Followers = (props) =>  {
  console.log(props)
  return (
    <div id="Followers-div" className="flex flex-row md:w-[50%] lg:w-[35%] h-[5%]  mb-[5%] ">
    <button id="Following-Button" className="whitespace-nowrap before:text-white w-[calc(95%/2)] bg-transparent hover:underline text-sm font-light text-[rgb(150,150,150)]">
       {props.following? props.following: 0} Following
    </button>
    <button id="Followers-button" className="whitespace-nowrap before:text-white w-[calc(95%/2)] bg-transparent hover:underline text-sm font-light text-[rgb(150,150,150)] ">
        {props.followers? props.followers: 0} followers
    </button>
    </div>
  )
}

export default Followers