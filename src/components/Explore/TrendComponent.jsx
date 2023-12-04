const TrendComponent = ({ index, categoray, name, numberOfPosts, fetchTrendTweets }) => {
  return (
    <div
      className="flex min-h-[100px] w-full flex-col justify-between p-4 hover:bg-darkHover cursor-pointer"
      onClick={() => {
        fetchTrendTweets(name.substring(1))
      }}
    >
      <div className="text-xs text-secondary">
        {index}. Trending in {categoray}
      </div>
      <div className="self-end">{name}</div>
      <div className="text-xs text-secondary">{numberOfPosts} posts</div>
    </div>
  )
}

export default TrendComponent
