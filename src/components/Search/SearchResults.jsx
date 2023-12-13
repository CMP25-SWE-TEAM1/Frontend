import Widgets from "../Widgets"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router"
import HorizontalNavbar from "../General/HorizontalNavbar"
import axios from "axios"
import UsersContainer from "./UsersContainer"
import { Routes, Route } from "react-router-dom"


const SearchResults = () => {
  const { user, token } = useSelector((state) => state.user)
  const [results, setResults] = useState([])

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const word = queryParams.get("q")

  const APIs = {
    mock: { searchAPI: "http://localhost:3001/blockedAccounts" },
    actual: { searchAPI: "http://backend.gigachat.cloudns.org/api/user/search" },
  }

  const searchNavLinks = [
    { title: "Top", location: "top" },
    { title: "People", location: "people" },
  ]

  useEffect(() => {
    axios
      .get(APIs.actual.searchAPI, {
        params: {
          word: word,
          type: "user",
          page: 1,
          count: 5,
        },
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data.users)
        setResults(res.data.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="flex flex-1 flex-grow-[8]  max-xs:max-w-[475]">
      <div className="no-scrollbar ml-0 mr-1 max-w-[620px] flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder max-xs:w-fit max-xs:max-w-[475px] sm:w-fit md:shrink-0">
        <div className="flex h-[53px] items-center">
          <HorizontalNavbar urls={searchNavLinks} originalUrl={`/search?q=${word}`} />
        </div>
        <Routes>
          <Route path="top" element={<UsersContainer results={results}/>}></Route>
          <Route path="people" element={<UsersContainer results={results}/>}></Route>
          <Route path="" element={<UsersContainer results={results}/>}></Route>
        </Routes>
      </div>
      {user && <Widgets />}
    </div>
  )
}

export default SearchResults
