import Box from "@mui/material/Box"

import PropTypes from "prop-types"

/**
 * Renders content for a specific tab panel within a tabbed interface, conditionally displaying based on the selected tab.
 *
 * @component
 */
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" className="h-[100vh]" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{}}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

// CustomTabPanel.propTypes = {
//   /**
//    * The content to display within the tab panel
//    */
//   children: PropTypes.node,
//   /**
//    * The index of the tab panel (must be a unique number for each panel)
//    */
//   index: PropTypes.number.isRequired,
//   /**
//    * The value of the currently selected tab (must match the index of the visible panel)
//    */
//   value: PropTypes.number.isRequired,
//   /**
//    * Additional props to be spread onto the underlying div element
//    */
//   other: PropTypes.object,
// }

export default CustomTabPanel
