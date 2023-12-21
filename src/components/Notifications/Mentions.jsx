import NotificationsContainer from "./NotificationsContainer"

import logoDark from "../../assets/imgs/gigachatLogoOne_dark-removebg-preview.png"
import logoLight from "../../assets/imgs/gigachatLogoOne_light_v2-removebg-preview.png"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import PostsContainer from "../Home/Posts/PostsContainer"
import axios from "axios"
import { APIs } from "../../constants/signupConstants"

const Mentions = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)

  const userToken = useSelector((state) => state.user.token)

  const [mentions, setMentions] = useState([])

  useEffect(() => {
    axios
      .get(APIs.actual.getMentions, {
        params: {
          page: 1,
          count: 100,
        },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        console.log(res)
        setMentions(res.data.tweetList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      {!mentions[0] && <NotificationsContainer list={[]} type={"mentions"} />}
      <PostsContainer posts={mentions} setPosts={setMentions} />
    </div>
  )
}

export default Mentions
