import SearchComponent from "../Explore/SearchComponent"
import WidgetsTrends from "./WidgetsTrends"
import React from "react"

/**
 * Generates Widgets component, conditionally rendering widgets and footer links:
 * - Conditionally displays SearchComponent and WidgetsTrends based on parent component.
 * - Presents footer content consistently, including:
    - Links to Terms of Service, Privacy Policy, Cookie Policy, Accessibility, and Ads Info.
    - Copyright information.
 * - Uses responsive layout, hiding content on smaller screens and revealing on larger ones.
 * - Accepts a 'parent' prop to control conditional rendering.
 *
 * @component
 */
const Widgets = ({ parent }) => {
  return (
    <div className="hidden max-w-[400px] flex-1 text-center lg:block">
      <div data-testid="searchComp" className={`${parent === "explore" ? "hidden" : ""}`}>
        <SearchComponent query={""} />
      </div>
      <div className={`${parent === "explore" ? "hidden" : ""}`}>
        <WidgetsTrends />
      </div>
      <div className="m-5 flex flex-col">
        <div className="flex justify-around">
          <a href="https://twitter.com/tos" className="text-xs text-secondary hover:underline">
            Terms of Service
          </a>
          <a href="https://twitter.com/privacy" className="text-xs text-secondary hover:underline">
            Privacy Policy
          </a>
          <a href="https://support.twitter.com/articles/20170514" className="text-xs text-secondary hover:underline">
            Cookie Policy
          </a>
        </div>
        <div className="flex justify-around">
          <a href="https://help.twitter.com/resources/accessibility" className="text-xs text-secondary hover:underline">
            Accessibility
          </a>
          <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo" className="text-xs text-secondary hover:underline">
            Ads info
          </a>
          <span className="text-xs text-secondary ">© 2023 X Corp.</span>
        </div>
      </div>
    </div>
  )
}

// Widgets.propTypes = {
//   /**
//    * String indicating the parent component of this component
//    */
//   parent: React.PropTypes.string.isRequired,
// }

export default Widgets
