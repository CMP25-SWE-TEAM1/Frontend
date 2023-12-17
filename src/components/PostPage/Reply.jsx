import React from 'react';
import Post from '../Home/Posts/Post';

function Reply({reply}) {
  console.log(reply.tweet_owner)
  return (
    <div className="w-full">
      <Post 
      userProfilePicture={reply.tweet_owner.profile_image}
      userName={reply.tweet_owner.nickname}            
      userTag={reply.tweet_owner.username}
      id={reply.id}
      date={reply.creation_time}
      media={reply.media}
      description={reply.description}
      replyCount={reply.repliesNum}
      repostCount={reply.repostsNum}
      likeCount={reply.likesNum}
      viewCount={reply.viewsNum}
      isLiked={reply.isLiked}
      isReposted={reply.isRetweeted}
      key={reply.id}
      />
    </div>
  )
}

export default Reply
