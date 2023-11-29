import React from 'react';
import Post from '../Home/Post';

function Reply(props) {
  return (
    <div className="w-full">
      <Post 
      userName={props.userName}
      userTag={props.userTag}
      date={props.date}
      replyCount={props.replyCount}
      repostCount={props.repostCount}
      likeCount={props.likeCount}
      viewCount={props.viewCount}
      key={props.userTag}
      />
    </div>
  )
}

export default Reply
