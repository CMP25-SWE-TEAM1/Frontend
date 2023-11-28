import Post from "./Post";

const PostsContainer = ({ posts }) => {
  const handlePostClick=(p)=>{
    
  }
  return (
    <div className="post-container">
      {posts.map((p) => (
        <Post
          userName={p.data.tweet_owner.nickname}
          userTag={p.data.tweet_owner.username}
          date={p.data.creation_time}
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
