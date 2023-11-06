import GoogleLogin from "@leecheuk/react-google-login"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = ()=> {
    const [nickName, setNickName        ] = useState("")
    const [email,    setEmail           ] = useState("")
    const [date,     setDate            ] = useState("")
    const [password, setPassword        ] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const siteKey = "6Ldxlf4oAAAAAKjm3gXBNjq-GBJ4hM79g6NYk7KG";
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    function responseGoogle(response)
    {
     console.log(response);
    }
    const handleCaptchaVerification = (response) => {
        console.log("Captcha response: ", response);
    }
    function nextShow(position)
    {
        const JoinGigaChat = document.getElementById('Join GigaChat');
        const FirstStep    = document.getElementById('First Step');
        const SecondStep   = document.getElementById('Second Step');
        const ThirdStep    = document.getElementById('Third Step');
        switch(position)
        {
            case 0:
                JoinGigaChat.style.display='none';
                FirstStep.style.display='flex';
                break;
            case 1:
                FirstStep.style.display='none';
                SecondStep.style.display='flex';
                break;
            case 2:
                SecondStep.style.display='none';
                ThirdStep.style.display='flex'; 
                break;
            default:
                break;
        }

    }
    return (
        <div className="m-auto bg-black text-white md:rounded-2xl">
            <span>
            <Link to="/" className="text-white">
                <button className="relative left-2 top-2 h-10 w-10 rounded-3xl text-2xl no-underline hover:bg-zinc-900">x</button>
            </Link>
            </span>

            <div id="Join GigaChat" className="pop-up">

                <h1>Join GigaChat today</h1>

                <GoogleLogin
            clientId="40488454700-g3rk7h26t89sb83do0dbdeinvke0tmrj.apps.googleusercontent.com"
            onSuccess={() => responseGoogle()}
            onFailure={() => responseGoogle()}
            render={(renderProps) => (
                <button onClick={renderProps.onClick} className="btn">
                Sign Up with Google
                </button>
                )}
               />

                <div className="flex h-10 items-center justify-center">
                    <div className="flex w-48 items-center">
                        <hr className="w-48" />
                    </div>
                    &nbsp; or &nbsp;
                    <div className="flex w-48 items-center">
                        <hr className="w-48" />
                    </div>
                </div>

                <button className="btn" onClick={() => {nextShow(0)}}>Create Account</button>

                    <span>have an account already ? 
                    <Link to="/Login" className="text-white">
                    Log in
                    </Link>
                    </span>
            </div>


            <div id = "First Step" className="pop-up hidden">
                <p className="hash-span relative">
                Step 1 of 3
                </p>
                <h1 className="hash-span ">Create your account</h1>
                <div className="input-container">
                    <input className={nickName === "" ? "form-input" : "form-input filled-input"} type="text" name="name" id="name" autoComplete="off" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                    <label className="input-label" htmlFor="name">
                        Name
                    </label>
                </div>
                <div className="input-container">
                    <input className={email === "" ? "form-input" : "form-input filled-input"} type="text" name="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="input-label" htmlFor="email">
                        Email 
                    </label>
                </div>
               <div className="input-containter">
                    <div >
                        <p className="text-bold">Date of birth </p> 
                        <p className="date-text">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        <br></br>
                    </div>
                    <input type="date" className="text-black date-input" value= {date} onChange={(e) => {setDate(e.target.value)
                        console.log(e.target.value)}}>
                    </input>
               </div>
                <button className="btn" id= "next" onClick={() => {nextShow(1)}} disabled= {email === "" || nickName=== "" || date === ""}>Next</button>
            </div>

            <div id = "Second Step" className="pop-up hidden">
                <p className="hash-span">
                Step 2 of 3
                </p>
                <ReCAPTCHA
                sitekey={siteKey}
                 onChange={handleCaptchaVerification()}
                />
                <button className="btn" onClick={() => {nextShow(2)}}>Next</button>
            </div>

            <div id = "Third Step" className="pop-up hidden">
                <p className="hash-span">
                Step 3 of 3
                </p>
                <div className="input-container">
                    <input className={password === "" ? "form-input" : "form-input filled-input"} type={showPassword ? 'text' : 'password'} name="password" id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="input-label" htmlFor="password">
                        Password
                    </label>
                    <span
                        className={`toggle-password ${showPassword ? 'active' : ''}`}
                        onClick={togglePasswordVisibility}
                     >
                    👁️
                    </span>
                    
                </div>
                <div >                
                    <Link to="/home" className="text-white">
                        <button className="btn px-4 py-2 " disabled={password.length <= 8 }>Next</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SignUp;