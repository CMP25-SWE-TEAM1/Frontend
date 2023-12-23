import { useState } from "react"
import WidgetsTrendComponent from "./WidgetsTrendComponent"
import axios from "axios"

import { useSelector } from "react-redux"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const WidgetsTrendsContainer = ({ data, loading, type }) => {
  const userToken = useSelector((state) => state.user.token)
  const [trends, setTrends] = useState([])
  const [trendTweets, setTrendTweets] = useState([])

  const fetchTrendTweets = (trend) => {
    axios
      .get(`http://backend.gigachat.cloudns.org/api/trends/${trend}`, {
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
            <WidgetsTrendComponent key={index} index={index + 1} categoray={type} name={trend.title} numberOfPosts={trend.count} fetchTrendTweets={fetchTrendTweets} />
          </div>
        )
      })}
    </div>
  )
}

export default WidgetsTrendsContainer
