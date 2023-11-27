import React from 'react';
import Reply from './Reply';

function RepliesContainer({replies}) {
 
  return (
    <div className="replies-container">
      {replies.map(reply=><Reply props={reply}/>)}
    </div>
  )
}

export default RepliesContainer
