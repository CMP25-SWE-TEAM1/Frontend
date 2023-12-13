import React,{useState,useEffect} from "react"
import Person from './Person'
import axios from 'axios'
import { useSelector } from "react-redux"
import NoReposts from "./NoReposts"
import NoLikes from "./NoLikes"

function PersonsContainer({postId,userTag,navbarActiveLink}){
    const [reposters, setReposters] = useState([]);
    const [likers, setLikers] = useState([]);

    const userToken = useSelector((state) => state.user.token)
    
    const APIs = {
        mock: {
          likers: `/api/tweets/likers/${postId}`,
          reposters: `/api/tweets/retweeters/${postId}`
        },
        actual: {
          likers: `http://backend.gigachat.cloudns.org/api/tweets/likers/${postId}`,
          reposters: `http://backend.gigachat.cloudns.org/api/tweets/retweeters/${postId}`
        },
      }
      useEffect(()=>{
        console.log("token",userToken)
        axios.get(APIs.actual.reposters,
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        ).then((response) => {
          console.log("reposters success", response)
          setReposters(response.data.data);
        })
        .catch((error) => {
          console.log("reposters fail", error)
        })
    
        axios.get(APIs.actual.likers,
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        ).then((response) => {
          console.log("likers success", response)
          setLikers(response.data.data);
        })
        .catch((error) => {
          console.log("likers fail", error)
        })
      },[])
      const persons = [
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"1",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"2"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"3"},
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"11",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"22"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"33"},
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"111",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"222"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"333"},
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"1111",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"2222"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"3333"},
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"11111",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"22222"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"33333"},
        {username:"is2",nickname:"ismail ramadan",profileImage:"r",id:"12",bio:"hi"},
        {username:"is3",nickname:"ismail ramadan2",profileImage:"r",id:"21"},
        {username:"is4",nickname:"ismail ramadan3",profileImage:"r",id:"31"},
      ]
    return(
        <>
        {(navbarActiveLink==="Reposts"?
         (reposters.length!==0?
          reposters.map((person)=><Person nickname={person.nickname} username={person.username} profileImage={person.profileImage} bio={person.bio? person.bio:null} isFollowed={person.isFollowed} key={person.id} />)
          :
          <NoReposts />
          ) 
         :
         (likers.length!==0?
          likers.map((person)=><Person nickname={person.nickname} username={person.username} profileImage={person.profileImage} bio={person.bio? person.bio:null} isFollowed={person.isFollowed} key={person.id} />)
          :
          <NoLikes />
         )
        )}
        {/* {persons.map((person,index)=><Person nickname={person.nickname} username={person.username} profileImage={person.profileImage} bio={person.bio? person.bio:null} index={index} key={person.id} />)} */}
        </>
    )
}
export default PersonsContainer