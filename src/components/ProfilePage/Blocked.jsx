import React from 'react'

function Blocked({tag,setViewPost}) {
  return (
    <div id="blocked" className="absolute top-[70%] left-[33%] w-[30%]">
    <h1  className="text-3xl font-bold">
      @{tag} is Blocked
    </h1>
    <span className="text-sm font-medium text-[gray] text-wrap">Are you sure you want to view these posts? Viewing posts won't unblock @{tag}. </span>
    <a href="https://help.twitter.com/en/using-x/blocking-and-unblocking-accounts" className="whitespace-nowrap before:text-white w-[calc(95%/2)] bg-transparent
 hover:underline text-sm font-light text-[rgb(23,129,200)]">Learn More</a>
     <div className="mt-[10px]">
      <button className=" hover:brightness-90 dark:hover:brightness-90 w-[150px] h-[50px] bg-[rgb(29,155,240)] rounded-full mt-[1px] mb-[1px]" onClick={()=>{setViewPost(true)}}>View Posts</button>
    </div>
  </div>
  )
}

export default Blocked