import { useState, useEffect } from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"

import axios from "axios"
import googleLogo from "../../assets/imgs/search.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { loginUser } from "../../store/UserSlice"
import { APIs } from "../../constants/signupConstants"

const GoogleLoginButton = ({ handleCloseModal, message }) => {
  const [user, setUser] = useState()
  const [profile, setProfile] = useState()

  const [birthday, setBirthday] = useState()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (res) => {
      // console.log(res)
      setUser(res)
      logOut()
    },
    onError: (error) => console.log("Login Failed:", error),
  })
  ///auth/user.birthday.read
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          // console.log(res)
          setProfile(res.data)
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem("user")
          sessionStorage.removeItem("passwordIsConfirmed")
        })

      axios
        .get(`https://people.googleapis.com/v1/people/me?personFields=birthdays,genders&access_token=${user.accessToken}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          const birthdays = response.data.birthdays
          let found = false
          for (let i = 0; i < birthdays.length; i++) {
            const b = birthdays[i].date
            if (b.day && b.month && b.year) {
              setBirthday(`${b.month}-${b.day}-${b.year}`)
              found = true
              break
            }
          }
          if (found) {
            console.log("in found")
          }
          // console.log(response.data.birthdays)
        }) //You will get data here
        .catch((error) => {
          console.warn(error)
        })
    }
  }, [user])

  useEffect(() => {
    if (profile && birthday) {
      // console.log({
      //   access_token: user.access_token,
      //   name: profile.name,
      //   email: profile.email,
      //   id: profile.id,
      //   profile_image: profile.picture,
      //   birthDate: birthday,
      // })
      axios
        .post(APIs.actual.googleAuth, {
          access_token: user.access_token,
          name: profile.name,
          email: profile.email,
          id: profile.id,
          profile_image: profile.picture,
          birthDate: birthday,
        })
        .then((res) => {
          console.log(res)
          dispatch(loginUser({ userCredentials: res.data, isgoogle: true })).then((result) => {
            if (result.payload) {
              navigate("/home")
              handleCloseModal()
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [profile])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <div id="signInButton">
      {
        <button onClick={() => login()} className="border-ternary flex h-[2.5rem] w-full items-center justify-center rounded-3xl border bg-white text-black transition-colors">
          <img src={googleLogo} alt="google logo" className="mr-2" />
          <span className="text-sm font-semibold">{message}</span>
        </button>
      }
    </div>
  )
}

export default GoogleLoginButton
