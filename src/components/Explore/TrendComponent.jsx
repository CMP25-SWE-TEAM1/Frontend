import React from "react"

/**
 * Renders a single trend component with its index, category, name, and number of posts.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.index - Index of the trend within a list
 * @param {string} props.category - Category of the trend (e.g., "Worldwide", "Local")
 * @param {string} props.name - Name of the trend (e.g., "#Hashtag", "Topic")
 * @param {number} props.numberOfPosts - Number of posts associated with the trend
 * @param {Function} props.fetchTrendTweets - Function to fetch tweets for the trend when clicked (optional)
 * @returns {JSX.Element} JSX element representing the trend component
 */
const TrendComponent = ({ index, categoray, name, numberOfPosts, fetchTrendTweets }) => {
  return (
    <div
      className="flex min-h-[100px] w-full cursor-pointer flex-col justify-between p-4 hover:bg-lightHover dark:hover:bg-darkHover"
      onClick={() => {
        console.log("HH")
        window.location.href = `/search?q=${name.replace(/#/g, "%23")}`
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

// TrendComponent.propTypes = {
//   /**
//    * The index of the trend within a list
//    */
//   index: React.PropTypes.number.isRequired,
//   /**
//    * The category of the trend (e.g., "Worldwide", "Local")
//    */
//   category: React.PropTypes.string.isRequired,
//   /**
//    * The name of the trend (e.g., "#Hashtag", "Topic")
//    */
//   name: React.PropTypes.string.isRequired,
//   /**
//    * The number of posts associated with the trend
//    */
//   numberOfPosts: React.PropTypes.number.isRequired,
//   /**
//    * A function to fetch tweets for the trend when clicked (optional)
//    */
//   fetchTrendTweets: React.PropTypes.func,
// }
export default TrendComponent
