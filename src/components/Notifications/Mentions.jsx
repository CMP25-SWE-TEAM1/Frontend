import NotificationsContainer from "./NotificationsContainer"


import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import PostsContainer from "../Home/Posts/PostsContainer"
import axios from "axios"
import { APIs } from "../../constants/signupConstants"

import React from "react"

/**
 * Fetches and displays mentions of the current user in a user-friendly format, ensuring seamless integration with the PostsContainer for a unified experience.
 *
 * @component
 */
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

// Mentions.propTypes = {
//   /**
//    * Function used to handle the Closing of the Edit profile modal, so it doesn't appear when needed
//    */
//   handleCloseModal: React.PropTypes.func,
//   /**
//    * The state of the mentions modal, if false then it's not shown else it's shown
//    */
//   openModal: React.PropTypes.bool,
// }

export default Mentions
