import React from "react"

function Blocked({ tag, setViewPost }) {
  return (
    <div id="blocked" className="absolute left-[33%] top-[70%] w-[30%]">
      <h1 className="text-3xl font-bold">@{tag} is Blocked</h1>
      <span className="text-wrap text-sm font-medium text-[gray]">Are you sure you want to view these posts? Viewing posts won't unblock @{tag}. </span>
      <a
        href="https://help.twitter.com/en/using-x/blocking-and-unblocking-accounts"
        className="w-[calc(95%/2)] whitespace-nowrap bg-transparent text-sm
 font-light text-[rgb(23,129,200)] before:text-white hover:underline"
      >
        Learn More
      </a>
      <div className="mt-[10px]">
        <button
          className=" mb-[1px] mt-[1px] h-[50px] w-[150px] rounded-full bg-[rgb(29,155,240)] hover:brightness-90 dark:hover:brightness-90"
          onClick={() => {
            setViewPost(true)
          }}
        >
          View Posts
        </button>
      </div>
    </div>
  )
}

export default Blocked
