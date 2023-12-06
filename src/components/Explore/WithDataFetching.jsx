import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import TrendsContainer from "./TrendsContainer"

const useDataFetching = (type) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const userToken = useSelector((state) => state.user.token)

  useEffect(() => {
    switch (type) {
      case "trending":
        axios
          .get("http://backend.gigachat.cloudns.org/api/trends/all", {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            // console.log(res.data.data)
            setData(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
        break
      case "news":
        axios
          .get("http://localhost:3001/api/trends/news", {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            console.log(res)
            setData(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
        break
      case "sports":
        axios
          .get("http://localhost:3001/api/trends/sports", {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            console.log(res)
            setData(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
        break
      case "entertainment":
        axios
          .get("http://localhost:3001/api/trends/entertainment", {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            console.log(res)
            setData(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
        break
      default:
    }
  }, [type, userToken])

  return { data, loading }
}

const WithDataFetching = (Component, type) => {
  const { data, loading } = useDataFetching(type)

  return <Component data={data} loading={loading} type={type.charAt(0).toUpperCase() + type.slice(1)} />
}

const WithConditionalDataFetching = (t) => {
  return WithDataFetching(TrendsContainer, t)
}

export default WithConditionalDataFetching
