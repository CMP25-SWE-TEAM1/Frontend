import React from 'react';
import Reply from './Reply';

function RepliesContainer({replies}) {
 
  return (
    <div className="replies-container">
      {replies&&replies.map(reply=><Reply reply={reply}/>)}
    </div>
  )
}

export default RepliesContainer
