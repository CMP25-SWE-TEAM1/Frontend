import Post from "./Post";
import profilePicTest from "../../assets/profilePicTest.JPG"

const PostsContainer = ({ posts }) => {
  const handlePostClick=(p)=>{
    
  }
  
  return (
    <div className="post-container">
      {posts.map((p) => (
        <Post
          userProfilePicture={profilePicTest}
          userName={p.tweetDetails.tweet_owner.nickname}
          userTag={p.tweetDetails.tweet_owner.username}
          date={p.tweetDetails.createdAt}
          media={profilePicTest}
          description={p.tweetDetails.description}
          replyCount={p.tweetDetails.repliesNum}
          repostCount={p.tweetDetails.repostsNum}
          likeCount={p.tweetDetails.likesNum}
          viewCount={p.tweetDetails.viewsNum}
          key={p.tweetDetails.tweet_owner.username}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
