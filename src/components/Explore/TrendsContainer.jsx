//fetch
import { useEffect, useState } from "react"
import TrendComponent from "./TrendComponent"
import axios from "axios"

import { useSelector } from "react-redux"
import PostsContainer from "../Home/PostsContainer"

import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const tst = [
  {
    categoray: "Egypt",
    name: "Trend",
    numberOfPosts: "125k",
  },
]

const TrendsContainer = ({ data, loading, type }) => {
  const userToken = useSelector((state) => state.user.token)
  const [trends, setTrends] = useState([])
  const [trendTweets, setTrendTweets] = useState([])

  // console.log(data)

  // const fetchTrends = () => {
  //   axios
  //     .get("http://backend.gigachat.cloudns.org/api/trends/all", {
  //       headers: {
  //         authorization: "Bearer " + userToken,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res.data.data)
  //       setTrends(res.data.data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const fetchTrendTweets = (trend) => {
    axios
      .get(`http://backend.gigachat.cloudns.org/api/trends/${trend}`, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
          console.log(res.data.data)
        setTrendTweets(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // useEffect(() => {
  //   fetchTrends()
  // }, [])

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
          <div>
            <TrendComponent key={index} index={index + 1} categoray={type} name={trend.title} numberOfPosts={trend.count} fetchTrendTweets={fetchTrendTweets} />
            <div>
              <PostsContainer posts={trendTweets} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TrendsContainer
