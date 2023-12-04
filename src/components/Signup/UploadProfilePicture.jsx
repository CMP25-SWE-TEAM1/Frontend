import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined"

import { useEffect, useRef, useState } from "react"

import defaultProfilePic from "../../assets/imgs/Default_Profile_Picture.png"

import axios from "axios"

import { APIs } from "../../constants/signupConstants"

import { changeProfilePicture } from "../../store/UserSlice"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const UploadProfilePicture = ({ userR, setUser, handleCompleteSignup, handleCloseModal, fromSwitch }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const user = useSelector((state) => state.user.user)
  const userToken = useSelector((state) => state.user.token)

  const dispatch = useDispatch()

  const hiddenFileInput = useRef(null)
  const skipForNowButton = useRef(null)
  const completeSignupButton = useRef(null)

  const [profilePic, setProfilePic] = useState(user ? user.profileImage : defaultProfilePic)
  const [profilePicURL, setProfilePicURL] = useState(user ? user.profileImage : defaultProfilePic)

  // const [mediaUrls, setMediaUrls] = useState([])

  const handlePictureClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handlePictureChange = (event) => {
    const fileUploaded = event.target.files[0]

    setProfilePic(fileUploaded)
    setProfilePicURL(URL.createObjectURL(event.target.files[0]))
    skipForNowButton.current.style.display = "none"
    completeSignupButton.current.style.display = "block"
  }

  // const handleUploadMedia = () => {
  //   const formData = new FormData()
  //   formData.append("media", profilePic)

  //   axios
  //     .post(APIs.actual.uploadMedia, formData, {
  //       headers: {
  //         authorization: "Bearer " + userToken,
  //       },
  //     })
  //     .then((res) => {
  //       setMediaUrls(res.data.data.usls)
  //       console.log(res.data.data.usls)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleAssignProfilePicture = async () => {
    const mediaFormData = new FormData()
    mediaFormData.append("media", profilePic)
    let newuser

    axios
      .post(APIs.actual.uploadMedia, mediaFormData, {
        headers: {
          authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        // console.log(res.data.data.usls[0])
        // console.log(userToken)
        if (fromSwitch) {
          newuser = {
            ...user,
            // picture: profilePicURL,
            profileImage: res.data.data.usls[0],
          }
        } else {
          newuser = {
            ...userR,
            // picture: profilePicURL,
            profileImage: res.data.data.usls[0],
          }
        }
        // console.log(newuser)

        return axios.patch(
          APIs.actual.changeProfilePicture,
          { profile_image: res.data.data.usls[0] },
          {
            headers: {
              authorization: "Bearer " + userToken,
            },
          }
        )
      })
      .then((res) => {
        console.log("Profile picture changed successfully")
        setUser(newuser)

        // console.log(res)

        setTimeout(() => {
          if (fromSwitch) {
            dispatch(changeProfilePicture({ user: newuser, token: userToken }))
          } else {
            handleCompleteSignup(newuser)
          }
        }, 1000)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (fromSwitch) {
      const PictureStep = document.getElementById("Picture Step")
      PictureStep.style.display = "block"
    }
  })

  return (
    <div id="Picture Step" className="m-auto -mt-10 hidden w-[320px]">
      <div className="!h-fit">
        <h1>Pick a profile picture</h1>

        <p className="-mt-1 text-xs text-secondary">Have a favorite selfie? Upload it now.</p>
        <div className="relative m-auto w-fit rounded-full border-2 border-black dark:border-white">
          <div className="w-fit rounded-full border border-white dark:border-black">
            <img src={profilePicURL ? profilePicURL : defaultProfilePic} alt="profile" className="h-[200px] w-[200px] rounded-full" />
          </div>
          <button className="absolute left-[50%] top-[50%] m-auto h-[47px] w-[47px] -translate-x-[50%] -translate-y-[50%] rounded-full bg-darkHover hover:bg-darkBorder dark:bg-gray-600 dark:hover:bg-darkHover" onClick={handlePictureClick}>
            <AddAPhotoOutlinedIcon className={`-ml-[3px] -mt-[5px] ${darkMode ? "text-white" : "text-black"}`} />
            <input
              type="file"
              onChange={handlePictureChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </button>
        </div>

        <button
          className="btn mt-3"
          ref={skipForNowButton}
          onClick={() => {
            console.log(userR)
            handleCompleteSignup(userR)
            handleCloseModal()
          }}
        >
          Skip for now
        </button>
        <button
          className="btn mt-3 hidden"
          ref={completeSignupButton}
          onClick={() => {
            handleAssignProfilePicture()
            handleCloseModal()
          }}
        >
          Complete sign up
        </button>
      </div>
    </div>
  )
}

export default UploadProfilePicture
