import React from "react"

/**
 * Generates WidgetsTrendComponent, visually representing a single trend item:
 * - Displays trend information in a clear, concise format:
    - Index number
    - Trend category
    - Trend name (emphasized visually)
    - Number of associated posts
 * - Uses hover effects to visually indicate interactivity.
 * - Implements click functionality to initiate a search for the trend name.
 * - Accepts props for index, category, name, and numberOfPosts.
 *
 * @component
 */
const WidgetsTrendComponent = ({ index, categoray, name, numberOfPosts }) => {
  return (
    <div
      className="flex  w-full cursor-pointer flex-col justify-between p-3 hover:bg-lightHover dark:hover:bg-[#292d34]"
      data-testid="trendComp"
      onClick={() => {
        window.location.href = `/search?q=${name.replace(/#/g, "%23")}`
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

// WidgetsTrendComponent.propTypes = {
//   /**
//    * The numerical index of the trend
//    */
//   index: React.PropTypes.number.isRequired,
//   /**
//    * The category of the trend
//    */
//   category: React.PropTypes.string.isRequired,
//   /**
//    * The name of the trend
//    */
//   name: React.PropTypes.string.isRequired,
//   /**
//    * The number of posts associated with the trend
//    */
//   numberOfPosts: React.PropTypes.number.isRequired,
// }

export default WidgetsTrendComponent
