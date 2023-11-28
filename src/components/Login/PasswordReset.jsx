import { useState } from "react"
import { Link } from "react-router-dom"
import lightLogo from "../../assets/imgs/giga-chat-logo-dark-removebg-preview.png"


const PasswordReset = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")

  function handleNext1() {
    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")

    page1.style.display = "none"
    page2.style.display = "block"
  }

  function handleNext2() {
    const page2 = document.getElementById("page2")
    const page3 = document.getElementById("page3")

    page2.style.display = "none"
    page3.style.display = "block"
  }

  function handleNext3() {
    //Send the confirmation email to the email input by the user then proceed
  }

  return (
    <div className="flex h-[100vh] w-full bg-[#242d34]">
      <div className="pop-up m-auto bg-white dark:bg-black md:rounded-2xl">
        <Link to="/" className="!text-white">
          <button className="relative left-[-80px] top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover">x</button>
        </Link>
        <img src={lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />

        {/* --------------------------------------First Password Reset Page------------------------------------- */}
        <div id="page1">
          <div>
            <h1>Find your Gigachat account</h1>
            <p className="text-sm text-zinc-600 ">Enter the email, phone number, or username associated with your account to change your password.</p>
            <div className="input-container">
              <input className={userName === "" ? "form-input" : "form-input filled-input"} type="text" name="username" id="username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <label className="input-label" htmlFor="username">
                Phone, email or username
              </label>
            </div>
            <button type="button" id="next1" className="btn " onClick={handleNext1} disabled={userName === ""}>
              Next
            </button>
          </div>
        </div>

        {/* --------------------------------------Second Password Reset Page------------------------------------- */}
        <div id="page2" className="hidden">
          <div>
            <h1>Confirm your email</h1>
            <p className="text-sm text-zinc-600 ">Verify your identity by entering the email address associated with your X account.</p>
            <div className="input-container">
              <input className={email === "" ? "form-input" : "form-input filled-input"} type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="input-label" htmlFor="email">
                Email
              </label>
            </div>
            <button type="button" id="next2" className="btn" onClick={handleNext2} disabled={email === ""}>
              Next
            </button>
          </div>
        </div>

        {/* --------------------------------------Third Password Reset Page------------------------------------- */}
        <div id="page3" className="hidden">
          <div>
            <h1>Where should we send a confirmation code?</h1>
            <p className="text-sm text-zinc-600 ">Before you can change your password, we need to make sure it&apos;s really you.</p>
            <p className="text-sm text-zinc-600 ">Start by choosing where to send a confirmation code.</p>
            Send an email to {email}.
            <button type="button" id="next3" className="btn" onClick={handleNext3}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset