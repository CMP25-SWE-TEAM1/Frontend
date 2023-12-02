import ReCAPTCHA from "react-google-recaptcha"

import { useState } from "react"

const SecondStep = ({nextShow}) => {
  const [captchaIsDone, setCaptchaIsDone] = useState(false)
  const siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //testing
  // const siteKey = "6LfH3AgpAAAAAC3AH4ytvhBY1eXoStTZnqaif6tE" //actual


  const handleCaptchaVerification = () => {
    setCaptchaIsDone(true)
  }

  return (
    <div id="Second Step" className="w-[320px] -mt-10 m-auto hidden">
      <div  className="!h-fit">
        <p className="relative -ml-2 mt-3 text-lg font-semibold">Step 2 of 5</p>
        <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaVerification} />
        <button
          className="btn"
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
