import React, {useState, useEffect} from 'react'
import HorizontalNavbar from '../General/HorizontalNavbar'
import Widgets from '../Widgets'
import WestIcon from '@mui/icons-material/West'
import Person from './Person'
import axios from 'axios'
import { useSelector } from "react-redux"
import { useLocation, Link } from "react-router-dom"

function PostEngagement() {
  const [navbarActiveLink, setNavbarActiveLink] = useState("Reposts");
  const [reposters, setReposters] = useState([]);
  const [likers, setLikers] = useState([]);

  const userToken = useSelector((state) => state.user.token)
  const location = useLocation();
  const postId = location.pathname.slice(location.pathname.match(/\/status\/.*\//).index+8,location.pathname.match(/\/retweets|\/likes/).index);
  const userTag = location.pathname.slice(1,location.pathname.match(/\/status\/.*\//).index);
  // console.log(location.pathname.slice(location.pathname.match(/\/status\/.*\//).index+8,location.pathname.match(/\/retweets|\/likes/).index));
  
  const repostsHandler = () =>{
    setNavbarActiveLink("Reposts");
  }
  const likesHandler = () =>{
    setNavbarActiveLink("Likes");
  }
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
        page:1,
        count:5
      },
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    ).then((response) => {
      console.log("reposters success", response)
      setReposters(response);
    })
    .catch((error) => {
      console.log("reposters fail", error)
    })

    axios.get(APIs.actual.likers,
      {
        page:1,
        count:5
      },
      {
        headers: {
          authorization: "Bearer " + userToken,
        },
      }
    ).then((response) => {
      console.log("likers success", response)
      setLikers(response);
    })
    .catch((error) => {
      console.log("likers fail", error)
    })
  },[])
  const engagementNavLinks = [{title :"Reposts" , location:"retweets"},{ title: "Likes", location: "likes" }];
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
  return (
    <div className="flex flex-1">
    <div className="ml-0 mr-1 max-w-[620px] shrink-0 flex-grow overflow-y-scroll border border-b-0 border-t-0 border-lightBorder dark:border-darkBorder sm:w-[600px]">
      <div className="sticky top-0 z-50 mb-3 border-0 border-b border-lightBorder dark:border-darkBorder bg-white bg-opacity-[87%] backdrop-blur-sm dark:bg-inherit dark:bg-opacity-[99%] ">
        <div className="flex h-[53px] items-center">
          <Link to="/home">
        <div className="ml-2 mr-5 flex h-8 w-8 items-center justify-center rounded-full hover:bg-lightHover dark:hover:bg-darkHover">
        <WestIcon/> 
        </div>
        </Link>
        <div><b>Post engagements</b></div>
        </div>
        <div className="flex h-[53px] items-center">
        <HorizontalNavbar urls={engagementNavLinks} originalUrl={`/${userTag}/status/${postId}`} handlers={[repostsHandler,likesHandler]}/>
        </div>
      </div>
      {/* {(navbarActiveLink==="Reposts"? reposters:likers).map((person)=><Person nickname={person.nickname} username={person.username} profileImage={person.profileImage} bio={person.bio? person.bio:null} key={person.id} />)} */}
      {persons.map((person)=><Person nickname={person.nickname} username={person.username} profileImage={person.profileImage} bio={person.bio? person.bio:null} key={person.id} />)}
    </div>
    <Widgets />
  </div>
  )
}

export default PostEngagement
