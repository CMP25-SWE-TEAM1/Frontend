import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import React from "react"

import { Modal, Box } from "@mui/material"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { signupUser } from "../../store/UserSlice.js"

import UploadProfilePicture from "./UploadProfilePicture.jsx"
import FirstStep from "./FirstStep.jsx"
import SecondStep from "./SecondStep.jsx"
import ThirdStep from "./ThirdStep.jsx"

import lightLogo from "../../assets/imgs/logo-light.jpg"
import darkLogo from "../../assets/imgs/logo-dark.jpg"

import { EMAIL_REGEX } from "../../constants/signupConstants.js"
import ForthStep from "./ForthStep.jsx"
import FifthStep from "./FifthStep.jsx"
import TagStep from "./TagStep.jsx"
import ErrorPage from "./ErrorPage.jsx"
import PreStep from "./PreStep.jsx"

/**
 * Generates SignUp component, orchestrating the multi-step signup process:
 * - Presents a welcome screen with signup options (PreStep).
 * - Guides users through email, nickname, birthdate, reCAPTCHA, and password collection (FirstStep, SecondStep, ThirdStep, ForthStep, FifthStep).
 * - Facilitates user tag creation and profile picture upload (TagStep, UploadProfilePicture).
 * - Handles signup completion, dispatching relevant actions and navigating to the home page (handleCompleteSignup).
 * - Manages a mock mode for testing purposes.
 * - Adapts modal styling to different window widths.
 * - Manages error scenarios, including invalid emails and birthdates (ErrorPage).
 * - Integrates with Redux for user state management and signup actions.
 *
 * @component
 */
const SignUp = ({ openModal, handleCloseModal }) => {
  /**
   * @type boolean
   * @description Flag to enable/disable mock mode for testing.
   */
  const mock = false

  /**
   * @type boolean
   * @description True if the user's preferred theme is dark mode.
   */
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

  /**
   * @description Navigates to the next step of the registration process.
   * @method
   * @param {number} position - The position of the step to show.
   */
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

  /**
   * Validates the email format using a regular expression.
   *
   * @param {string} emeil - The email to validate.
   * @returns {boolean} - Whether the email is valid.
   */
  function validEmail(emeil) {
    return EMAIL_REGEX.test(emeil)
  }

  /**
   * Handles closing the birthdate error modal.
   *
   * @returns {void}
   */
  const handleCloseBirthdateErrorModal = () => setOpenBirthdateErrorModal(false)

  /**
   * Handles opening the birthdate error modal.
   *
   * @returns {void}
   */
  const handleOpenBirthdateErrorModal = () => setOpenBirthdateErrorModal(true)

  const handleOpenBirthdateError = () => {
    const ErrorPage = document.getElementById("Error Page")
    const ThirdStep = document.getElementById("Third Step")

    ThirdStep.style.display = "none"
    ErrorPage.style.display = "block"

    handleOpenBirthdateErrorModal()
  }

  /**
   * Handles the completion of the signup process.
   *
   * @param {Object} user - The user object.
   * @returns {void}
   */
  const handleCompleteSignup = (user) => {
    handleCloseModal()

    // let userCredentials = {
    //   email: email,
    //   password: password,
    // }
    dispatch(signupUser({ user: user, token: userToken, navigate }))

    // dispatch(loginUser({ userCredentials, isgoogle: null })).then((result) => {
    //   // console.log(result)
    //   if (result.payload) {
    //     setEmail("")
    //     setPassword("")
    //     handleCloseModal()
    //     navigate("/home")
    //   }
    // })
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update the window width when the component mounts
  useEffect(() => {
    /**
     * Handles resizing the window and updating the window width state.
     *
     * @returns {void}
     */
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const modalStyle = {
    position: "absolute",

    backgroundColor: "transparent",
    border: "1px solid #767C86",
    borderRadius: "16px",
  }

  if (windowWidth < 700) {
    modalStyle.width = "100vw"
    modalStyle.height = "100vh"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  } else {
    modalStyle.width = "601.6px"
    modalStyle.height = "651.6px"
    modalStyle.top = "50%"
    modalStyle.left = "50%"
    modalStyle.transform = "translate(-50%, -50%)"
    modalStyle.maxWidth = "none" // optional, to remove any max-width constraints
  }
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal} data-testid="signupModal" disableEscapeKeyDown disablePortal>
        <Box style={modalStyle}>
          <div className="pop-up m-auto min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
            <button className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover" onClick={handleCloseModal}>
              x
            </button>

            <img src={darkMode ? darkLogo : lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />

            <PreStep handleCloseModal={handleCloseModal} nextShow={nextShow} />

            <FirstStep nickName={nickName} setNickName={setNickName} email={email} setEmail={setEmail} month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} nextShow={nextShow} emailExistError={emailExistError} setEmailExistError={setEmailExistError} validEmail={validEmail} mock={mock} />

            <SecondStep nextShow={nextShow} />

            <ThirdStep nickName={nickName} email={email} month={month} day={day} year={year} emailExistError={emailExistError} validEmail={validEmail} mock={mock} nextShow={nextShow} handleOpenBirthdateError={handleOpenBirthdateError} />

            <ForthStep setUserTag={setUserTag} setOriginalUsername={setOriginalUsername} setUser={setUser} setUserToken={setUserToken} nextShow={nextShow} handleOpenBirthdateError={handleOpenBirthdateError} mock={mock} email={email} />

            <FifthStep mock={mock} userToken={userToken} userTag={userTag} setUser={setUser} nextShow={nextShow} password={password} setPassword={setPassword} />

            <TagStep mock={mock} userTag={userTag} setUserTag={setUserTag} originalUsername={originalUsername} userToken={userToken} user={user} setUser={setUser} nextShow={nextShow} />

            <UploadProfilePicture userR={user} setUser={setUser} handleCompleteSignup={handleCompleteSignup} handleCloseModal={handleCloseModal} fromSwitch={false} email={email} password={password} />

            <ErrorPage setDay={setDay} setMonth={setMonth} setYear={setYear} setNickName={setNickName} setEmail={setEmail} openBirthdateErrorModal={openBirthdateErrorModal} handleCloseBirthdateErrorModal={handleCloseBirthdateErrorModal} />
          </div>
        </Box>
      </Modal>
    </>
  )
}

// SignUp.propTypes = {
//   /**
//    * Function used to handle the Closing of the Edit profile modal, so it doesn't appear when needed
//    */
//   handleCloseModal: React.Proptypes.func,
//   /**
//    * The state of the sign up modal, if false then it's not shown else it's shown
//    */
//   openModal: React.Proptypes.bool,
// }
export default SignUp
