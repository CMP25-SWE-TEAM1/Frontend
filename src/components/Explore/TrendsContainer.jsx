//fetch
import { useEffect, useState } from "react"
import TrendComponent from "./TrendComponent"
import axios from "axios"

import { useSelector } from "react-redux"
import PostsContainer from "../Home/Posts/PostsContainer"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

import React from "react"

const tst = [
  {
    categoray: "Egypt",
    name: "Trend",
    numberOfPosts: "125k",
  },
]

/**
 * Renders a container for displaying a list of trends, handling loading states and fetching tweets for individual trends.
 *
 * @component
 * @param {Object[]} props.data - List of trend objects to display
 * @param {boolean} props.loading - Indicates whether trends are currently loading
 * @param {string} props.type - Type of trends being displayed (e.g., "Worldwide", "Local")
 * @returns {JSX.Element} JSX element representing the trends container
 */
const TrendsContainer = ({ data, loading, type }) => {
  const userToken = useSelector((state) => state.user.token)
  const [trends, setTrends] = useState([])
  const [trendTweets, setTrendTweets] = useState([])

  const fetchTrendTweets = (trend) => {
    axios
      .get(`https://backend.gigachat.cloudns.org/api/trends/${trend}`, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.data)
        setTrendTweets([
          ...res.data.data.map((post) => ({
            tweetDetails: post,
            followingUser: post.tweet_owner,
          })),
        ])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   console.log(trendTweets)
  // }, [trendTweets])

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
            <TrendComponent key={index} index={index + 1} categoray={type} name={trend.title} numberOfPosts={trend.count} fetchTrendTweets={fetchTrendTweets} />
          </div>
        )
      })}
    </div>
  )
}

// TrendsContainer.propTypes = {
//   /**
//    * The list of trends to display
//    */
//   data: React.PropTypes.array.isRequired,
//   /**
//    * Indicates whether trends are currently loading
//    */
//   loading: React.PropTypes.bool.isRequired,
//   /**
//    * The type of trends being displayed (e.g., "Worldwide", "Local")
//    */
//   type: React.PropTypes.string.isRequired,
// }
export default TrendsContainer
