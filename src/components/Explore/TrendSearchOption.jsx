import React from "react"


/**
 * Renders a single trend search option, allowing navigation to the search results page for the selected trend.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.option - Trend data to display
 * @param {Object} props.props - Additional props passed to the underlying element
 * @returns {JSX.Element} JSX element representing the trend search option
 */
const TrendSearchOption = ({ option, ...props }) => {
  return (
    <div {...props} className="flex cursor-pointer p-3 hover:bg-lightHover">
      <div
        className="ml-3"
        onClick={() => {
          window.location.href = `search?q=${option.title.replace(/#/g, "%23")}`
        }}
      >
        <div className="text-sm text-secondary">{option.title}</div>
      </div>
    </div>
  )
}

// TrendSearchOption.propTypes = {
//   /**
//    * The trend data to display
//    */
//   option: React.PropTypes.object.isRequired,
//   /**
//    * Additional props passed to the underlying element
//    */
//   props: React.PropTypes.object,
// }
export default TrendSearchOption
