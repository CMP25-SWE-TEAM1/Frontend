import ReCAPTCHA from "react-google-recaptcha"

import { useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import React from "react"

/**
 * Generates SecondStep component which integrates reCAPTCHA for security during signup:
 * - Displays a clear "Step 2 of 5" progress indicator.
 * - Presents the reCAPTCHA challenge for user verification.
 * - Enables progression to the next step only upon successful reCAPTCHA completion.
 * - Provides a back button for returning to the previous step.
 *
 * @component
 */
const SecondStep = ({ nextShow }) => {
  const [captchaIsDone, setCaptchaIsDone] = useState(false)
  const siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //testing
  // const siteKey = "6LfH3AgpAAAAAC3AH4ytvhBY1eXoStTZnqaif6tE" //actual

  const handleCaptchaVerification = () => {
    setCaptchaIsDone(true)
  }

  const handleBack = () => {
    const FirstStep = document.getElementById("First Step")
    const SecondStep = document.getElementById("Second Step")

    FirstStep.style.display = "block"
    SecondStep.style.display = "none"
  }

  return (
    <div id="Second Step" className="m-auto -mt-10 hidden w-[320px]">
      <ArrowBackIcon className="cursor-pointer" onClick={handleBack} />

      <div className="!h-fit">
        <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 2 of 5</p>
        <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification} />
        <button
          className="btn bg-black dark:bg-white"
          onClick={() => {
            nextShow(2)
          }}
          disabled={captchaIsDone ? false : true}
        >
          Next
        </button>
      </div>
    </div>
  )
}

// SecondStep.propTypes = {
//   /**
//    * Function to navigate to the next step
//    */
//   nextShow: React.PropTypes.func.isRequired,
// }

export default SecondStep
