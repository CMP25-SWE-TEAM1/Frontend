const WidgetsTrendComponent = ({ index, categoray, name, numberOfPosts, fetchTrendTweets }) => {
  return (
    <div
      className="flex  w-full cursor-pointer flex-col justify-between p-3 hover:bg-lightHover dark:hover:bg-[#292d34]"
      onClick={() => {
        window.location.href = `search?q=${name.replace(/#/g, "%23")}`
      }}
    >
      <div className="text-start text-xs text-secondary">
        {index}. Trending in {categoray}
      </div>
      <div className="self-end">{name}</div>
      <div className="text-start text-xs text-secondary">{numberOfPosts} posts</div>
    </div>
  )
}

export default WidgetsTrendComponent
