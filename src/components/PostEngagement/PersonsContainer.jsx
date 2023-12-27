import React, { useState, useEffect } from "react"
import Person from "./Person"
import axios from "axios"
import { useSelector } from "react-redux"
import NoReposts from "./NoReposts"
import NoLikes from "./NoLikes"

function PersonsContainer({ postId, userTag, navbarActiveLink }) {
  const [reposters, setReposters] = useState([])
  const [likers, setLikers] = useState([])

  const userToken = useSelector((state) => state.user.token)

  const APIs = {
    mock: {
      likers: `/api/tweets/likers/${postId}`,
      reposters: `/api/tweets/retweeters/${postId}`,
    },
    actual: {
      likers: `https://backend.gigachat.cloudns.org/api/tweets/likers/${postId}`,
      reposters: `https://backend.gigachat.cloudns.org/api/tweets/retweeters/${postId}`,
    },
  }
  useEffect(() => {
    axios
      .get(APIs.actual.reposters, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("reposters success", response)
        setReposters(response.data.data)
      })
      .catch((error) => {
        console.log("reposters fail", error)
      })

    axios
      .get(APIs.actual.likers, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("likers success", response)
        setLikers(response.data.data)
      })
      .catch((error) => {
        console.log("likers fail", error)
      })
  }, [])

  return <>{navbarActiveLink === "Reposts" ? reposters.length !== 0 ? reposters.map((person) => <Person nickname={person.nickname} username={person.username} profile_image={person.profile_image} bio={person.bio ? person.bio : null} isFollowed={person.isFollowed} key={person._id} />) : <NoReposts /> : likers.length !== 0 ? likers.map((person) => <Person nickname={person.nickname} username={person.username} profile_image={person.profile_image} bio={person.bio ? person.bio : null} isFollowed={person.isFollowed} key={person._id} />) : <NoLikes />}</>
}
export default PersonsContainer
