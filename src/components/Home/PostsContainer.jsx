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
          userName={p.data.tweet_owner.nickname}
          userTag={p.data.tweet_owner.username}
          date={p.data.creation_time}
          media={profilePicTest}
          description={p.data.description}
          replyCount={p.data.repliesNum}
          repostCount={p.data.repostsNum}
          likeCount={p.data.likesNum}
          viewCount={p.data.viewsNum}
          key={p.data.tweet_owner.username}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
