import {useState, useEffect } from 'react';
import Post from '../Home/Posts/Post';
import { useSelector } from "react-redux";
import axios from "axios"

function Reply({reply}) {
  const [cascading, setCascading] = useState([reply]);
  const APIs = {
    mock: {},
    actual: {
      getPost: `https://backend.gigachat.cloudns.org/api/tweets/${reply.id}`,
      getPostReplies: `https://backend.gigachat.cloudns.org/api/tweets/replies/${reply.id}`,
    },
  }
  const userToken = useSelector((state) => state.user.token)

  useEffect(()=>{
    axios
      .get(APIs.actual.getPostReplies, {
        params: { page: 1, count: 1 },
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log("get reply reply success", response)
        setCascading([...cascading,response.data.data])
        // console.log(postReplies)
      })
      .catch((error) => {
        console.log("get reply reply fail", error)
      })
  },[])
  return (
    <>
    {cascading.map((reply,index)=>{
      return(<div className="w-full">
      <Post
      cascade={index===0?true:false}
      userProfilePicture={reply.tweet_owner.profile_image}
      userName={reply.tweet_owner.nickname}            
      userTag={reply.tweet_owner.username}
      id={reply.id}
      date={reply.creation_time}
      media={reply.media}
      description={reply.description}
      replyCount={reply.repliesNum}
      repostCount={reply.repostsNum}
      likeCount={reply.likesNum}
      viewCount={reply.viewsNum}
      isLiked={reply.isLiked}
      isReposted={reply.isRetweeted}
      key={reply.id}
      />
    </div>)}
      )
    }
    </>
  )
}

export default Reply
