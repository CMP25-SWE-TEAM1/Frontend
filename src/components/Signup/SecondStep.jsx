import ReCAPTCHA from "react-google-recaptcha"

import { useState } from "react"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"

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

export default SecondStep
