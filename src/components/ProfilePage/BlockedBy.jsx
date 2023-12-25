import React from 'react'

function BlockedBy({tag}) {
  return (
    <div id="blocked-by" className="absolute top-[70%] left-[37.5%]">
    <h1 className="text-3xl font-bold">
      You're blocked
    </h1>
    <p className="text-sm font-medium text-[gray]">
    You can't follow or see @{tag}'s posts.
    </p>
    <a href="https://help.twitter.com/en/using-x/someone-blocked-me-on-x" className="whitespace-nowrap before:text-white w-[calc(95%/2)] bg-transparent
     hover:underline text-sm font-light text-[rgb(23,129,200)]">Learn More</a>
  </div>
  )
}

export default BlockedBy