import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import WidgetsTrendsContainer from "./WidgetsTrendsContainer"
import { useNavigate } from "react-router-dom"
import { getColor } from "../../constants"

/**
 * Generates WidgetsTrends component, fetching and displaying trending topics:
 * - Retrieves trending topics from the server using axios.
 * - Manages loading state while data is being fetched.
 * - Passes fetched trends to WidgetsTrendsContainer for visual representation.
 * - Provides a "Show more" button to navigate users to the Explore page for further exploration.
 * - Integrates with Redux for user token access and theme color selection.
 * - Adapts visual styling for light and dark themes.
 *
 * @component
 */
const WidgetsTrends = () => {
  const userToken = useSelector((state) => state.user.token)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const [trends, setTrends] = useState([])
  useEffect(() => {
    axios
      .get("https://backend.gigachat.cloudns.org/api/trends/all", {
        params: {
          page: 1,
          count: 5,
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
  }, [])

  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div className=" m-5 rounded-xl bg-[#f7f9f9] dark:bg-[#16181c]">
      <div className="p-3 text-start text-lg font-semibold">What’s happening</div>
      <WidgetsTrendsContainer data={trends} loading={loading} type={"trending"} />
      <div
        className={`rounded-xl rounded-t-none p-3 text-start ${"text-" + getColor(themeColor)} hover:cursor-pointer hover:bg-lightHover dark:hover:bg-[#292d34]`}
        onClick={() => {
          navigate("/explore")
        }}
      >
        Show more
      </div>
    </div>
  )
}

export default WidgetsTrends
