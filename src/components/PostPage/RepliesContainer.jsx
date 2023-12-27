import React from "react"
import Reply from "./Reply"

function RepliesContainer({ replies }) {
  return (
    <div className="replies-container">
      {replies &&
        replies.map((reply) => (
          <div key={reply.id}>
            <Reply reply={reply} />
          </div>
        ))}
    </div>
  )
}

export default RepliesContainer
