const TrendComponent = ({ index, categoray, name, numberOfPosts }) => {
  return (
    <div className="h-52 w-full">
      <div>
        {index}. Trending in {categoray}
        <br /> #{name}
        <br /> {numberOfPosts}
      </div>
    </div>
  )
}

export default TrendComponent
