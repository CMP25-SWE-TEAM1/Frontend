import { useState, useEffect } from "react"
import { googleLogout, useGoogleLogin } from "@react-oauth/google"

import axios from "axios"
import googleLogo from "../assets/imgs/search.png"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { loginUser } from "../store/UserSlice"

const GoogleLoginButton = ({ handleCloseModal }) => {
  const [user, setUser] = useState()
  const [profile, setProfile] = useState()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (res) => {
      setUser(res)
      logOut()
    },
    onError: (error) => console.log("Login Failed:", error),
  })

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
          setProfile(res.data)
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem("user")
        })
    }
  }, [user])

  useEffect(() => {
    if (profile) {
      dispatch(loginUser({ userCredentials: profile, isgoogle: true })).then((result) => {
        if (result.payload) {
          navigate("/home")
          handleCloseModal()
        }
      })
    }
  }, [profile])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <div id="signInButton">
      {profile ? (
        <div>
          <img src={profile.picture} alt="profile" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()} className="flex h-[2.5rem] w-full items-center justify-center rounded-3xl bg-white text-black border border-ternary transition-colors">
          <img src={googleLogo} alt="google logo" className="mr-2" />
          <span className="text-sm font-semibold">Sign up with Google</span>
        </button>
      )}
    </div>
  )
}

export default GoogleLoginButton
