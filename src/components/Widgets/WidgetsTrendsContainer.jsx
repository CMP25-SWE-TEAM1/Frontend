import { useState } from "react"
import WidgetsTrendComponent from "./WidgetsTrendComponent"
import axios from "axios"

import React from "react"

import { useSelector } from "react-redux"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

/**
 * Generates WidgetsTrendsContainer component, responsible for visually presenting trending topics:
 * - Receives trend data, loading state, and type from parent component.
 * - Displays a loading indicator while data is being fetched.
 * - Dynamically renders a WidgetsTrendComponent for each trend item.
 * - Manages its own internal state for potential future features (e.g., trend tweets).
 * - Integrates with Redux for user token access.
 * - Accepts props for data, loading, and type.
 *
 * @component
 */
const WidgetsTrendsContainer = ({ data, loading, type }) => {
  const userToken = useSelector((state) => state.user.token)
  const [trends, setTrends] = useState([])
  const [trendTweets, setTrendTweets] = useState([])

  return (
    <div className={`${loading ? "flex justify-center" : ""}`}>
      <Box
        sx={{
          display: loading ? "flex" : "none",
          marginTop: 3,
        }}
      >
        <CircularProgress />
      </Box>
      {data.map((trend, index) => {
        return (
          <div key={index}>
            <WidgetsTrendComponent key={index} index={index + 1} categoray={type} name={trend.title} numberOfPosts={trend.count} />
          </div>
        )
      })}
    </div>
  )
}

// WidgetsTrendsContainer.propTypes = {
//   /**
//    * Array of trend data
//    */
//   data: React.PropTypes.array.isRequired,
//   /**
//    * Boolean indicating loading state
//    */
//   loading: React.PropTypes.bool.isRequired,
//   /**
//    * String indicating the type of trends (e.g., "worldwide", "local")
//    */
//   type: React.PropTypes.string.isRequired,
// }
export default WidgetsTrendsContainer
