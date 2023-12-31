import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"

/**
 * Renders a horizontally-aligned navbar with customizable links, highlighting the active section and optionally executing click handlers.
 *
 * @component
 */
const HorizontalNavbar = ({ urls, originalUrl, handlers }) => {
  const location = useLocation() // once ready it returns the 'window.location' object
  const [urlLocation, setUrlLocation] = useState(null)

  useEffect(() => {
    setUrlLocation(location.pathname)
  }, [location])

  return (
    <>
      {urls.map((url, index) => {
        return (
          <Link className="relative flex h-[100%] flex-1 flex-col transition-colors hover:bg-lightHover dark:hover:bg-darkHover dark:hover:backdrop-blur-xl" key={url.title} to={`${originalUrl}/${url.location}`} id="mahmoud_for_you_and_everyone" onClick={handlers && handlers[index]}>
            <span className={`m-auto font-medium ${urlLocation === `${originalUrl}/${url.location}` ? "" : "text-gray-600 dark:text-gray-400"}`}>{url.title}</span>
            <div className={`absolute bottom-0 h-1 w-12 self-center rounded-sm ${urlLocation === `${originalUrl}/${url.location}` || (urlLocation === `${originalUrl}` && url.title === urls[0].title) ? "bg-primary" : "bg-inherit"}`}></div>
          </Link>
        )
      })}
    </>
  )
}

// HorizontalNavbar.propTypes = {
//   /**
//    * Array of objects containing URL information for the navbar links
//    */
//   urls: React.PropTypes.arrayOf(
//     React.PropTypes.shape({
//       title: React.PropTypes.string.isRequired,
//       location: React.PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   /**
//    * Base URL for the navbar links
//    */
//   originalUrl: React.PropTypes.string.isRequired,
//   /**
//    * Array of click handlers for each link (optional)
//    */
//   handlers: React.PropTypes.arrayOf(React.PropTypes.func),
// }

export default HorizontalNavbar
