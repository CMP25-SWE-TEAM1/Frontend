import { useEffect } from "react"
import Post from "./Post"
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined"

const PostsContainer = ({ posts, setPosts }) => {
  const handlePostClick = (p) => {}

  useEffect(() => {
    console.log(posts)
  }, [posts])
  return (
    <div className="post-container w-full">
      {posts.map((p, index) => {
        return (
          <div key={index}>
            <Post
              userProfilePicture={p.tweetDetails ? p.tweetDetails.tweet_owner.profile_image : p.tweet_owner.profile_image}
              postType={p.type ? p.type : p.type}
              isFollowed={p.isFollowed ? p.isFollowed : p.isFollowed}
              replyReferredTweetId={p.tweetDetails ? (p.tweetDetails.referredTweetId ? p.tweetDetails.referredTweetId : undefined) : undefined}
              // replyReferredTweetId={p.tweetDetails.referredTweetId ? p.tweetDetails.referredTweetId : undefined}
              userName={p.tweetDetails ? p.tweetDetails.tweet_owner.nickname : p.tweet_owner.nickname}
              userTag={p.tweetDetails ? p.tweetDetails.tweet_owner.username : p.tweet_owner.username}
              id={p.tweetDetails ? (p.tweetDetails._id ? p.tweetDetails._id : p.tweetDetails.id) : p._id ? p._id : p.id}
              date={p.tweetDetails ? (p.tweetDetails.creation_time ? p.tweetDetails.creation_time : p.tweetDetails.createdAt) : p.creation_time ? p.creation_time : p.createdAt}
              media={p.tweetDetails ? p.tweetDetails.media : p.media}
              description={p.tweetDetails ? p.tweetDetails.description : p.description}
              replyCount={p.tweetDetails ? p.tweetDetails.repliesNum : p.repliesNum}
              repostCount={p.tweetDetails ? p.tweetDetails.repostsNum : p.repostsNum}
              likeCount={p.tweetDetails ? p.tweetDetails.likesNum : p.likesNum}
              viewCount={p.tweetDetails ? p.tweetDetails.viewsNum : p.viewsNum}
              isLiked={p.isLiked ? p.isLiked : p.isLiked}
              isReposted={p.isRtweeted ? p.isRtweeted : p.isRetweeted}
              key={p.tweetDetails ? p.tweetDetails.id : p.id}
              followingUser={p.tweetDetails ? p.followingUser : p.repostingUser}
              bio={p.tweetDetails ? p.tweetDetails.tweet_owner.bio : p.bio}
              setPosts={setPosts}
              posts={posts}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PostsContainer
