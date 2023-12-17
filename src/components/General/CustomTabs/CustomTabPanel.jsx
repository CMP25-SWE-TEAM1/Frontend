import Box from "@mui/material/Box"

import PropTypes from "prop-types"

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

export default CustomTabPanel