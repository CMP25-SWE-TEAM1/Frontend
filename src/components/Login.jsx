import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const firstPage = document.getElementById("firstPage");
    const secondPage = document.getElementById("secondPage");
    document.getElementById("next").addEventListener("click", () => {
      firstPage.style.display = "none";
      secondPage.style.display = "flex";
    });
  }, []);

  return (
    <div className="m-auto bg-black text-white pop-up">
      <Link to="/" className="text-white">
        <button className="relative top-4 left-6 text-xl w-10 h-10 rounded-3xl no-underline hover:bg-slate-900">
          x
        </button>
      </Link>
      {/* --------------------------------------First Login Page------------------------------------- */}
      <div id="firstPage" className="fb pop-up">
        <h1 className="text-4xl">Sign in to Gigachat</h1>
        <button id="googleSignin" className="btn">
          Sign in with Google
        </button>
        <button id="appleSignin" className="btn">
          Sign in with Apple
        </button>
        <span className="flex">
          <div className="fb w-32">
            <hr className="w-28" />
          </div>
          or
          <div className="fb w-32">
            <hr className="w-28" />
          </div>
        </span>
        <input
          type="text"
          name="username"
          placeholder="Phone, email or username"
          className="form-input"
          autoComplete="off"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="button" id="next" className="btn">
          Next
        </button>
        <button className="btn bg-black text-white border-white border">
          Forgot Password?
        </button>
        <span className="text-slate-400">
          Don't have an account? <Link to={"/Signup"}>Sign Up</Link>{" "}
        </span>
      </div>

      {/* --------------------------------------Second Login Page------------------------------------- */}
      <div id="secondPage" className="fb pop-up hidden">
        <h1 className="text-4xl">Enter your password</h1>
        <form action="/" method="post" className="fb flex-col gap-5" autoComplete="off">
          <input
            type="text"
            name="username"
            value={userName}
            placeholder="Phone, email or username"
            className="form-input bg-neutral-900 border-0"
            disabled
          />
          <input
            type="password"
            name="username"
            placeholder="Password"
            className="form-input"
          />
          <button id="login" type="submit" className="btn mt-52 w-96 h-14 rounded-3xl">
            Log in
          </button>
        </form>
        <span className="text-slate-400">
          Don't have an account? <Link to={"/Signup"}>Sign Up</Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
