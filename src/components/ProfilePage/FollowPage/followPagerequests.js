import axios from "axios"
class followPagerequests 
{
    static follow = (mock, APIs, token, setFollow,Follow,targetid) => {
        axios
          .post(
            mock ? APIs.followmock.postfollowProfileAPI : `${APIs.followactual.postfollowProfileAPI}/${targetid}/follow`,
            {},
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 204) {
                let follow = [...Follow];
    
                for(let i =0 ; i < Follow.length;i++)
                {
                  if(Follow[i].username === targetid)
                  {
                    follow[i].Followstate="Following"
                    
                  }
                }
                setFollow(follow)
            }
          })
          .catch((err) => {
            console.log(err)
          })
    }

      static unfollow = (mock, APIs, token,setFollow,Follow,targetid) => {
        axios
          .post(
            mock ? APIs.unfollowmock.postfollowProfileAPI : `${APIs.unfollowactual.postfollowProfileAPI}/${targetid}/unfollow`,
            {},
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            if (res.status === 204) {
                let follow = [...Follow];
    
                for(let i =0 ; i < Follow.length;i++)
                {
                  if(Follow[i].username === targetid)
                  {
                    follow[i].Followstate="Follow"
                    
                  }
                }
                setFollow(follow)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
      
      static getfollowings = (mock,APIs,token,setFollowings,page,count) =>{
        axios
            .get(mock ? APIs.mock.getProfileAPI : APIs.actual.getFollowings, {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                  params: {
                    page: 1,
                    count: 10000
                  }
                })
                .then((res) => {
                  if (res.status === 200) {
                    res.data.users.forEach(user =>{
                      user.Followstate = user.isFollowed? 'Following' : 'Follow' 
                    })
                    console.log(res.data.users)
                    setFollowings(res.data.users)
                  }
                })
                .catch((err) => {
                  //console.log(tag)
                  //console.log(err)
                })
      }
    static getfollowers = (mock,APIs,token,setFollowers,page,count) =>{
        axios.get(mock ? APIs.mock.getProfileAPI : APIs.actual.getFollowers, 
          {
              headers: {
                authorization: `Bearer ${token}`,
              },
              params: {
                page: 1,
                count: 10000
              }
            })
            .then((res) => {
              if (res.status === 200) {
               
                res.data.users.forEach(user =>{
                    user.Followstate = user.isFollowed? 'Following' : 'Follow' 
                  })
                setFollowers(res.data.users)
              }
            })
            .catch((err) => {
              //console.log(tag)
              //console.log(err)
            })
      }
}
export default followPagerequests;