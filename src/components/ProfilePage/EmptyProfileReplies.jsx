import React from 'react'
import { useSelector } from 'react-redux'

function EmptyProfileReplies(props) {
    const {user} = useSelector((state)=>state.user)
    console.log(props)
  return (
    <div className="mt-10 flex flex-col items-center">
        <div className="flex max-w-[360px] flex-col items-center justify-center">
          <div className="text-3xl font-bold">Nothing to see here — yet</div>
          {user.username === props.tag && <div className="mt-2 text-sm text-secondary">
         you don't have any {props.type === 1 && "posts"} {props.type === 0 && "Likes"} yet .{" "}
            <p className="text-blackdark:text-white" rel="noreferrer">
              {props.type === 0 && "Tap the heart on any post to show it some love,\n When you do it'll show up here."}
              {props.type === 1 && "Reply on any post, \n When you do it'll show up here"}
            </p>
          </div>
          }
          {user.username !== props.tag && <div className="mt-2 text-sm text-secondary">
         @{props.tag} doesn't  have any {props.type === 1 && "posts"} {props.type === 0 && "Likes"} yet .{" "}
            <p className="text-blackdark:text-white" rel="noreferrer">
              {props.type === 0 && "When He Taps the heart on any post to show it some love,\n When he does it'll show up here."}
              {props.type === 1 && "When He Reply on any post, \n When He does it'll show up here"}
            </p>
          </div>}
        
        </div>
      </div>
  )
}

export default EmptyProfileReplies