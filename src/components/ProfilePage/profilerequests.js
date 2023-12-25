import axios from "axios"
import { DefaultCoverPage } from "../../constants"
class ProfileRequests{
    static  getOtherprofile = (mock,APIs,tag,setProfile,token,setProfilePicURL,setCoverPicURL,setDetailsPos,setButtonstate,setViewPost) => {
      //cl(APIs);
        axios
        .get(mock ? APIs.mock.getProfileAPI + `${tag}` : APIs.actual.getProfileAPI + `${tag}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if(setDetailsPos !== undefined)
            {
            res.data.user.is_wanted_user_followed? setDetailsPos(`right-[140px]`):setDetailsPos(`right-[100px]`)
            if(res.data.user.is_curr_user_blocked) setDetailsPos('right-[25px]')
            }
          if(setViewPost !== undefined) 
            res.data.user.is_wanted_user_blocked? setViewPost(false) : setViewPost(true)
          if(setProfilePicURL !== undefined)
            setProfilePicURL(res.data.user.profile_image)
            const banner_image = res.data.user.banner_image ? res.data.user.banner_image : DefaultCoverPage
            if(setCoverPicURL !== undefined)
            setCoverPicURL(banner_image)
            const newUser = {...res.data.user, banner_image:banner_image }
            if(setButtonstate !== undefined)   
            setButtonstate(res.data.user.is_wanted_user_followed? `Following`:`Follow`)
            setProfile(newUser)
          }
        })
        .catch((err) => {
          //cl(err)
          ////cl(tag)
          ////cl(err)
        })
    }
    static getMyprofile = (mock,APIs,token,setProfile,setProfilePicURL,setCoverPicURL) =>{
        axios
            .get(mock ? APIs.mock.getProfileAPI : APIs.actual.getProfileAPI, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                //cl(res)
                
                // ////cl(`Bearer ${token}`)
               // ////cl(res)
                setProfilePicURL(res.data.user.profile_image)
                const banner_image = res.data.user.banner_image ? res.data.user.banner_image : DefaultCoverPage
                setCoverPicURL(banner_image)
                const newUser = {...res.data.user, banner_image:banner_image,is_curr_user:true }   
                setProfile(newUser)
              }
            })
            .catch((err) => {
              ////cl(tag)
              ////cl(err)
            })

    }
    static  block = (mock,APIs,token) =>  {
        axios.patch(
          mock? APIs.blockmock.Block : APIs.blockactual.Block,
          {},
          {
              headers:{
                  authorization : "Bearer " + token,
              },
          }
      ).then((res)=>{
        //cl(res)
        window.location.reload()
      })
      .catch((err) => {
        //cl(err)
      })
  }
  static unblock = (mock, APIs, token) => {
    axios
      .patch(
        mock ? APIs.blockmock.Block : APIs.unblockactual.unBlock,
        {},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        //cl(res)
        window.location.reload()
      })
      .catch((err) => {
        //cl("hello")
        //cl(err)
      })
  }
  static mute = (mock, APIs, token) => {
    axios
      .patch(
        mock ? APIs.blockmock.Block : APIs.muteactual.mute,
        {},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        //cl(res)
        window.location.reload()
      })
      .catch((err) => {
        //cl("hello")
        //cl(err)
      })
  }
  static unmute = (mock, APIs, token,tag) => {
    //cl(APIs)
    axios
      .patch(
        mock ? APIs.blockmock.Block : `${APIs.unmuteactual.unmute}/${tag}/unmute`,
        {},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        //cl(res)
        window.location.reload()
      })
      .catch((err) => {
        //cl("hello")
        //cl(err)
      })
  }
  static follow = (mock, APIs, token, setbuttonstate, setDetailsPos) => {
    axios
      .post(
        mock ? APIs.followmock.postfollowProfileAPI : APIs.followactual.postfollowProfileAPI,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setbuttonstate("Following")
          setDetailsPos("right-[140px]")
        }
      })
      .catch((err) => {
        //cl(err)
      })
  }
  static unfollow = (mock, APIs, token, setbuttonstate, setDetailsPos) => {
    axios
      .post(
        mock ? APIs.unfollowmock.postfollowProfileAPI : APIs.unfollowactual.postfollowProfileAPI,
        {},
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setbuttonstate("Follow")
          setDetailsPos("right-[100px]")
        }
      })
      .catch((err) => {
        //cl(err)
      })
  }
}
export default ProfileRequests
