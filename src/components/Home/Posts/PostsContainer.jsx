import Post from "./Post"

const PostsContainer = ({ posts }) => {
  const handlePostClick = (p) => {}

  return (
    <div className="post-container">
      {posts.map((p) => (
        <Post
          userProfilePicture={p.tweetDetails ? p.tweetDetails.tweet_owner.profile_image : p.tweet_owner.profile_image}
          userName={p.tweetDetails ? p.tweetDetails.tweet_owner.nickname : p.tweet_owner.nickname}
          userTag={p.tweetDetails ? p.tweetDetails.tweet_owner.username : p.tweet_owner.username}
          id={p.tweetDetailsid ? p.tweetDetails.id: p.tweetDetails._id}
          date={p.tweetDetails ? p.tweetDetails.creation_time : p.creation_time}
          media={p.tweetDetails ? [...p.tweetDetails.media] : [...p.media]}
          description={p.tweetDetails ? p.tweetDetails.description : p.description}
          replyCount={p.tweetDetails ? p.tweetDetails.repliesNum : p.repliesNum}
          repostCount={p.tweetDetails ? p.tweetDetails.repostsNum : p.repostsNum}
          likeCount={p.tweetDetails ? p.tweetDetails.likesNum : p.likesNum}
          viewCount={p.tweetDetails ? p.tweetDetails.viewsNum : p.viewsNum}
          isLiked={p.isLiked? p.isLiked : false}
          isReposted={p.isRtweeted? p.isRtweeted : false}
          key={p.tweetDetails ? p.tweetDetails.id : p.tweet_owner.username}
        />
      ))}
    </div>
  )
}

export default PostsContainer
