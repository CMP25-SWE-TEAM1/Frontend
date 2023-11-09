import Post from "./Post";

const PostsContainer = ({ posts }) => {
  return (
    <div className="post-container">
      {posts.map((p) => (
        <Post
          userName={p.userName}
          userTag={p.userTag}
          date={p.date}
          replyCount={p.replyCount}
          repostCount={p.repostCount}
          likeCount={p.likeCount}
          viewCount={p.viewCount}
          key={p.userTag}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
