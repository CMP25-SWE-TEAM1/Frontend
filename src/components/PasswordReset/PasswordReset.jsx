import { useState } from "react"
import { Link } from "react-router-dom"
import lightLogo from "../../assets/imgs/giga-chat-logo-dark-removebg-preview.png"

import { Alert } from "@mui/material"

import axios from "axios"
import { APIs } from "../../constants/signupConstants"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

const PasswordReset = () => {
  const mock = false

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [maskedEmail, setMaskedEmail] = useState("")

  const [emailExistError, setEmailExistError] = useState(false)

  const [choosed, setChoosed] = useState("email")
  const handleOptionChange = (event) => {
    setChoosed(event.target.value)
  }

  const nextShow = (select, emailExist = true) => {
    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")
    const page3 = document.getElementById("page3")

    switch (select) {
      case 1:
        if (emailExist) {
          page1.style.display = "none"
          page2.style.display = "block"
        } else {
          setEmailExistError(true)
          setTimeout(() => {
            setEmailExistError(false)
          }, 3000)
        }
        break
      case 2:
        page2.style.display = "none"
        page3.style.display = "block"
        break
      case 3:
      default:
    }
  }

  const handleEmailExistCheck = () => {
    axios
      .post(mock ? APIs.mock.emailExistAPI : APIs.actual.emailExistAPI, { email: email })
      .then((res) => {
        setEmailExistError(res.data.message === "Email is existed")
        setMaskedEmail(maskEmail())
        nextShow(1)
      })
      .catch((err) => {
        // setEmailExistError(false)
        nextShow(1, false)
        // console.log(err)
      })
  }

  function maskEmail() {
    // Split the email address into local and domain parts
    const [localPart, domainPart] = email.split("@")

    // Mask the local part
    const maskedLocalPart = localPart.substring(0, 2) + "*".repeat(localPart.length - 4) + localPart.slice(-2)

    // Mask the domain part
    const maskedDomainPart = domainPart.substring(0, 1) + "*".repeat(domainPart.length - 2) + domainPart.slice(-1)

    // Combine the masked local and domain parts with '@' in between
    const maskedEmail = `${maskedLocalPart}@${maskedDomainPart}`

    return maskedEmail
  }

  // function handleNext1() {
  //   const page1 = document.getElementById("page1")
  //   const page2 = document.getElementById("page2")

  //   page1.style.display = "none"
  //   page2.style.display = "block"
  // }

  // function handleNext2() {
  //   const page2 = document.getElementById("page2")
  //   const page3 = document.getElementById("page3")

  //   page2.style.display = "none"
  //   page3.style.display = "block"
  // }

  // function handleNext3() {
  //   //Send the confirmation email to the email input by the user then proceed
  // }

  return (
    <div className="flex h-[100vh] w-full bg-[#242d34]">
      <div className="pop-up m-auto min-w-[350px] bg-white dark:bg-black md:rounded-2xl">
        <Link to="/" className="!text-white">
          <button className="relative  top-4 h-10 w-10 rounded-3xl bg-transparent bg-white text-2xl text-black no-underline hover:bg-lightHover dark:bg-black dark:text-white dark:hover:bg-darkHover">x</button>
        </Link>
        <img src={lightLogo} alt="GigaChat Logo" className="-mt-4 ml-[45%] w-[40px]" />

        {/* --------------------------------------First Password Reset Page------------------------------------- */}
        <div id="page1" className="m-auto w-[320px]">
          <div>
            <h1>Find your Gigachat account</h1>
            <p className="text-sm text-zinc-600 ">Enter the email, phone number, or username associated with your account to change your password.</p>
            <div className="input-container">
              <input className={email === "" ? "form-input" : "form-input filled-input"} type="text" name="username" id="username" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="input-label" htmlFor="username">
                Phone, email or username
              </label>
            </div>
            <button type="button" id="next1" className="btn " onClick={handleEmailExistCheck} disabled={email === ""}>
              Next
            </button>
            <Alert severity="error" data-testid="emailExistError" className={`${emailExistError ? "" : "hidden"}`}>
              sorry we couldn't find your email
            </Alert>
          </div>
        </div>

        {/* --------------------------------------Second Password Reset Page------------------------------------- */}
        <div id="page2" className="m-auto hidden w-[320px]">
          <div>
            <h1>Confirm your username</h1>
            <p className="text-sm text-zinc-600 ">Verify your identity by entering the username associated with your X account.</p>
            <div className="input-container">
              <input className={userName === "" ? "form-input" : "form-input filled-input"} type="email" name="email" id="email" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <label className="input-label" htmlFor="email">
                Username
              </label>
            </div>
            <button
              type="button"
              id="next2"
              className="btn"
              onClick={() => {
                nextShow(2)
              }}
              disabled={userName === ""}
            >
              Next
            </button>
          </div>
        </div>

        {/* --------------------------------------Third Password Reset Page------------------------------------- */}
        <div id="page3" className="m-auto hidden w-[320px]">
          <div id="mahmoud_signature">
            <h1>Where should we send a confirmation code?</h1>
            <p className="text-sm text-zinc-600 ">Before you can change your password, we need to make sure it&apos;s really you.</p>
            {/* <p className="text-sm text-zinc-600 ">Start by choosing where to send a confirmation code.</p> */}
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label" className="text-secondary">
                Start by choosing where to send a confirmation code.
              </FormLabel>
              <RadioGroup
                onChange={handleOptionChange}
                value={choosed}
                sx={{
                  ".MuiButtonBase-root": {
                    color: "#1d9bf0",
                  },
                }}
                name="options"
              >
                <FormControlLabel
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: 15,
                    },
                  }}
                  value="email"
                  control={<Radio />}
                  label={`Send an email to ${maskedEmail}`}
                />
                <FormControlLabel
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: 15,
                    },
                  }}
                  value="phone"
                  control={<Radio />}
                  label={`Send a message to phone number ending with 27`}
                />
              </RadioGroup>
            </FormControl>

            <button
              type="button"
              id="next3"
              className="btn"
              onClick={() => {
                nextShow(3)
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
