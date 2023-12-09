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

const TrendsContainer = ({ type }) => {
  const userToken = useSelector((state) => state.user.token)
  const [trends, setTrends] = useState([])
  const [trendTweets, setTrendTweets] = useState([])

  const fetchTrends = () => {
    axios
      .get("http://backend.gigachat.cloudns.org/api/trends/all", {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.data)
        setTrends(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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

  useEffect(() => {
    fetchTrends()
  }, [])

  return trends.map((trend, index) => {
    return (
      <div>
        <TrendComponent key={index} index={index + 1} categoray={"Egypt"} name={trend.title} numberOfPosts={trend.count} fetchTrendTweets={fetchTrendTweets} />
        <div>
          <PostsContainer posts={trendTweets} />
        </div>
      </div>
    )
  })
}

export default TrendsContainer
