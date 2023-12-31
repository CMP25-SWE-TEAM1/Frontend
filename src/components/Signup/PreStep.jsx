import { useSelector } from "react-redux"
import { getColor } from "../../constants"
import GoogleLoginButton from "../General/GoogleLoginButton"

import { Link } from "react-router-dom"

import React from "react"

/**
 * Generates PreStep component which introduces GigaChat and offers initial signup options:
 * - Displays a welcome message inviting users to join GigaChat.
 * - Presents a button for Google sign-in using the GoogleLoginButton component.
 * - Provides a clear "Create Account" button to initiate the signup process.
 * - Includes links to Terms of Service, Privacy Policy, and Cookie Use.
 * - Offers a "Log in" link for existing users.
 *
 * @component
 */
const PreStep = ({ handleCloseModal, nextShow }) => {
  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div id="Join GigaChat">
      <div className="m-auto max-w-[350px]">
        <h1 className="mb-4 mt-3">Join GigaChat today</h1>
        <GoogleLoginButton handleCloseModal={handleCloseModal} message={"Sign in with Google"} />
        <div className="flex h-10 items-center justify-center">
          <div className="flex w-full items-center">
            <hr className="mr-2 w-full" />
          </div>
          &nbsp; or &nbsp;
          <div className="flex w-full items-center">
            <hr className="ml-2 w-full" />
          </div>
        </div>
        <button
          className={`mb-2 h-10 w-full rounded-3xl !bg-black font-semibold !text-white hover:!bg-darkHover dark:!bg-white dark:!text-black dark:hover:!bg-lightHover`}
          onClick={() => {
            nextShow(0)
          }}
        >
          Create Account
        </button>
        <span className="text-xs text-secondary">
          By signing up, you agree to the{" "}
          <a href="/#" className={`text-${getColor(themeColor)}`}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/#" className={`text-${getColor(themeColor)}`}>
            Privacy Policy
          </a>
          , including{" "}
          <a href="/#" className={`text-${getColor(themeColor)}`}>
            Cookie Use
          </a>
          .
        </span>
        <span className="mt-3 text-sm text-secondary">
          Have an account already ?&nbsp;
          <Link to="/login" className={`text-${getColor(themeColor)}`}>
            Log in
          </Link>
        </span>
      </div>
    </div>
  )
}

// PreStep.propTypes = {
//   /**
//    * Function used to handle the closing of the sign up modal
//    */
//   handleCloseModal: React.PropTypes.func.isRequired,

//   /**
//    * Function to navigate to the next step
//    */
//   nextShow: React.PropTypes.func.isRequired,
// }
export default PreStep
