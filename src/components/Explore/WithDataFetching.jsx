import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import TrendsContainer from "./TrendsContainer"

const useDataFetching = (type) => {
  const [data, setData] = useState([])
  const [sports, setSports] = useState([])
  const [news, setNews] = useState([])
  const [entertainment, setEntertainment] = useState([])
  const [trends, setTrends] = useState([])

  const [loading, setLoading] = useState(true)
  const userToken = useSelector((state) => state.user.token)

  const [pageNumber, setPageNumber] = useState(1)
  const [finshed, setFinished] = useState(false)

  const fetchTrends = () => {
    axios
      .get("https://backend.gigachat.cloudns.org/api/trends/all", {
        params: {
          page: 1,
          count: 1000,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.data)
        setTrends(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchNews = () => {
    axios
      .get("http://localhost:3001/api/trends/news", {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res)
        setNews(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.message !== "Network Error") console.log(err)
      })
  }

  const fetchSports = () => {
    axios
      .get("http://localhost:3001/api/trends/sports", {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res)
        setSports(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.message !== "Network Error") console.log(err)
      })
  }

  const fetchEntertainment = () => {
    axios
      .get("http://localhost:3001/api/trends/entertainment", {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res)
        setEntertainment(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.message !== "Network Error") console.log(err)
      })
  }

  useEffect(() => {
    setData([...trends, ...news, ...sports, ...entertainment])
  }, [news, sports, entertainment, trends])

  useEffect(() => {
    switch (type) {
      case "trending":
        fetchTrends()
        break
      case "news":
        fetchNews()
        break
      case "sports":
        fetchSports()
        break
      case "entertainment":
        fetchEntertainment()
        break
      case "foryou":
        fetchTrends()
        fetchNews()
        fetchSports()
        fetchEntertainment()
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
