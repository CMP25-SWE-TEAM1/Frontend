import { useEffect } from "react"
import Post from "./Post"

const PostsContainer = ({ posts, setPosts }) => {
  const handlePostClick = (p) => {}

  useEffect(() => {
    console.log(posts)
  }, [posts])

  return (
    <div className="post-container">
      {posts.map((p, index) => {
        // console.log(p.tweetDetails ? (p.tweetDetails._id ? p.tweetDetails._id : p.tweetDetails.id) : p.id)
        return (
          <Post
            userProfilePicture={p.tweetDetails ? p.tweetDetails.tweet_owner.profile_image : p.tweet_owner.profile_image}
            userName={p.tweetDetails ? p.tweetDetails.tweet_owner.nickname : p.tweet_owner.nickname}
            userTag={p.tweetDetails ? p.tweetDetails.tweet_owner.username : p.tweet_owner.username}
            id={p.tweetDetails ? (p.tweetDetails._id ? p.tweetDetails._id : p.tweetDetails.id) : p.id}
            date={p.tweetDetails ? p.tweetDetails.creation_time : p.creation_time}
            media={p.tweetDetails ? p.tweetDetails.media : p.media}
            description={p.tweetDetails ? p.tweetDetails.description : p.description}
            replyCount={p.tweetDetails ? p.tweetDetails.repliesNum : p.repliesNum}
            repostCount={p.tweetDetails ? p.tweetDetails.repostsNum : p.repostsNum}
            likeCount={p.tweetDetails ? p.tweetDetails.likesNum : p.likesNum}
            viewCount={p.tweetDetails ? p.tweetDetails.viewsNum : p.viewsNum}
            isLiked={p.isLiked ? p.isLiked : p.tweetDetails.isLiked}
            isReposted={p.isRtweeted ? p.isRtweeted : p.tweetDetails.isRtweeted}
            key={p.tweetDetails ? p.tweetDetails.id : p.id}
            followingUser={p.tweetDetails ? p.followingUser : p.repostingUser}
            setPosts={setPosts}
            posts={posts}
          />
        )
      })}
    </div>
  )
}

export default PostsContainer
