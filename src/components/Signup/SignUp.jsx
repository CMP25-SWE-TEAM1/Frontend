import { useState } from "react"
import {  useNavigate } from "react-router-dom"

import { Modal, Box } from "@mui/material"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loginUser, signupUser } from "../../store/UserSlice.js"

import UploadProfilePicture from "./UploadProfilePicture.jsx"
import FirstStep from "./FirstStep.jsx"
import SecondStep from "./SecondStep.jsx"
import ThirdStep from "./ThirdStep.jsx"

import { styles } from "../../styles.js"
import lightLogo from "../../assets/imgs/logo-light.jpg"
import darkLogo from "../../assets/imgs/logo-dark.jpg"

import { EMAIL_REGEX } from "../../constants/signupConstants.js"
import ForthStep from "./ForthStep.jsx"
import FifthStep from "./FifthStep.jsx"
import TagStep from "./TagStep.jsx"
import ErrorPage from "./ErrorPage.jsx"
import PreStep from "./PreStep.jsx"

const SignUp = ({ openModal, handleCloseModal }) => {
  const mock = true

  const darkMode = useSelector((state) => state.theme.darkMode)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nickName, setNickName] = useState("")
  const [email, setEmail] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [userToken, setUserToken] = useState("")
  const [user, setUser] = useState()
  const [userTag, setUserTag] = useState()
  const [originalUsername, setOriginalUsername] = useState("")

  const [password, setPassword] = useState("")

  const [emailExistError, setEmailExistError] = useState(false)
  const [openBirthdateErrorModal, setOpenBirthdateErrorModal] = useState(false)

  function nextShow(position) {
    const JoinGigaChat = document.getElementById("Join GigaChat")
    const FirstStep = document.getElementById("First Step")
    const SecondStep = document.getElementById("Second Step")
    const ThirdStep = document.getElementById("Third Step")
    const ForthStep = document.getElementById("Forth Step")
    const FifthStep = document.getElementById("Fifth Step")
    const TagStep = document.getElementById("Tag Step")
    const PictureStep = document.getElementById("Picture Step")

    switch (position) {
      case 0:
        JoinGigaChat.style.display = "none"
        FirstStep.style.display = "block"
        break
      case 1:
        FirstStep.style.display = "none"
        SecondStep.style.display = "block"
        break
      case 2:
        SecondStep.style.display = "none"
        ThirdStep.style.display = "block"
        break
      case 3:
        ThirdStep.style.display = "none"
        ForthStep.style.display = "block"
        break
      case -1:
        ThirdStep.style.display = "none"
        FirstStep.style.display = "block"
        break
      case 4:
        ForthStep.style.display = "none"
        FifthStep.style.display = "block"
        break
      case 5:
        FifthStep.style.display = "none"
        TagStep.style.display = "block"
        break
      case 6:
        TagStep.style.display = "none"
        PictureStep.style.display = "block"
        break
      default:
        break
    }
  }

  function validEmail(emeil) {
    return EMAIL_REGEX.test(emeil)
  }

  const handleCloseBirthdateErrorModal = () => setOpenBirthdateErrorModal(false)
  const handleOpenBirthdateErrorModal = () => setOpenBirthdateErrorModal(true)

  const handleOpenBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page")
    const ThirdStep = document.getElementById("Third Step")

    ThirdStep.style.display = "none"
    ErrorPage.style.display = "block"

    handleOpenBirthdateErrorModal()
  }

  const handleCompleteSignup = (user) => {
    handleCloseModal()

    let userCredentials = {
      email: email,
      password: password,
    }
    // dispatch(signupUser({ user: user, token: userToken, navigate }))

    dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
      // console.log(result)
      if (result.payload) {
        setEmail("")
        setPassword("")
        handleCloseModal()
        navigate("/home")
      }
    })
  }

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} className="w-[90%]" disableEscapeKeyDown disablePortal>
        <Box style={styles.modalStyle}>
          <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
            <button className="relative left-[-80px] top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>

            <img src={darkMode ? darkLogo : lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />

            <PreStep handleCloseModal={handleCloseModal} nextShow={nextShow} />

            <FirstStep nickName={nickName} setNickName={setNickName} email={email} setEmail={setEmail} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} nextShow={nextShow} emailExistError={emailExistError} setEmailExistError={setEmailExistError} validEmail={validEmail} mock={mock} />

            <SecondStep nextShow={nextShow} />

            <ThirdStep nickName={nickName} email={email} month={month} day={day} year={year} emailExistError={emailExistError} validEmail={validEmail} mock={mock} nextShow={nextShow} handleOpenBirthdateError={handleOpenBirthdateError} />

            <ForthStep setUser={setUser} setUserToken={setUserToken} nextShow={nextShow} handleOpenBirthdateError={handleOpenBirthdateError} mock={mock} email={email} />

            <FifthStep mock={mock} user={user} setUser={setUser} setUserTag={setUserTag} userToken={userToken} setOriginalUsername={setOriginalUsername} nextShow={nextShow} password={password} setPassword={setPassword} />

            <TagStep mock={mock} userTag={userTag} setUserTag={setUserTag} originalUsername={originalUsername} userToken={userToken} user={user} setUser={setUser} nextShow={nextShow} />

            <UploadProfilePicture userR={user} setUser={setUser} handleCompleteSignup={handleCompleteSignup} handleCloseModal={handleCloseModal} fromSwitch={false} />

            <ErrorPage setDay={setDay} setMonth={setMonth} setYear={setYear} setNickName={setNickName} setEmail={setEmail} openBirthdateErrorModal={openBirthdateErrorModal} handleCloseBirthdateErrorModal={handleCloseBirthdateErrorModal} />
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default SignUp
