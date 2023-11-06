import { useState } from "react"
import { Link } from "react-router-dom"

const PasswordReset = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  function handleNext1(){
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");

    page1.style.display = "none";
    page2.style.display = "flex";
  }

  function handleNext2(){
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    
    page2.style.display = "none";
    page3.style.display = "flex";
      
  }

  function handleNext3(){
    //Send the confirmation email to the email input by the user then proceed 
  }

  return (
    <div className="m-auto md:rounded-2xl bg-black text-white ">
      <Link to="/" className="text-white">
        <button className="relative left-2 top-2 h-10 w-10 rounded-3xl text-2xl no-underline hover:bg-zinc-900">x</button>
      </Link>
      {/* --------------------------------------First Password Reset Page------------------------------------- */}
      <div id="page1" className="pop-up">
        <h1>Find your Gigachat account</h1>
        <p className="text-zinc-600 text-sm ">Enter the email, phone number, or username associated with your account to change your password.</p>
        <div className="input-container">
          <input className={userName === ""?'form-input':'form-input filled-input'} type="text" name="username" id="username" autoComplete="off" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <label className="input-label" htmlFor="username">Phone, email or username</label>
        </div>
        <button type="button" id="next1" className="btn h-14 mt-60" onClick={handleNext1} disabled={userName === ""}>
          Next
        </button>
      </div>

      {/* --------------------------------------Second Password Reset Page------------------------------------- */}
      <div id="page2" className="pop-up hidden">
        <h1>Confirm your email</h1>
        <p className="text-zinc-600 text-sm ">Verify your identity by entering the email address associated with your X account.</p>
        <div className="input-container">
          <input className={email === ""?'form-input':'form-input filled-input'} type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="input-label" htmlFor="email">Email</label>
        </div>
        <button type="button" id="next2" className="btn h-14 mt-60" onClick={handleNext2} disabled={email === ""}>
          Next
        </button>
      </div>

       {/* --------------------------------------Third Password Reset Page------------------------------------- */}
       <div id="page3" className="pop-up hidden">
        <h1>Where should we send a confirmation code?</h1>
        <p className="text-zinc-600 text-sm ">Before you can change your password, we need to make sure it’s really you.</p>
        <p className="text-zinc-600 text-sm ">Start by choosing where to send a confirmation code.</p>
        Send an email to {email}.
        <button type="button" id="next3" className="btn h-14 mt-48" onClick={handleNext3}>
          Next
        </button>
      </div>
    </div>
  )
}

export default PasswordReset
