import GoogleLoginButton from "../General/GoogleLoginButton"

import { Link } from "react-router-dom"


const PreStep = ({handleCloseModal,nextShow}) => {
  return (
    <div id="Join GigaChat">
      <div className="m-auto max-w-[350px]">
        <h1 className="mb-4 mt-3">Join GigaChat today</h1>
        <GoogleLoginButton handleCloseModal={handleCloseModal} />
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
          className="mb-2 h-10 w-full rounded-3xl font-semibold !text-white !bg-black hover:!bg-darkHover dark:!bg-primary dark:!text-white dark:hover:!bg-[#1a8cd8]"
          onClick={() => {
            nextShow(0)
          }}
        >
          Create Account
        </button>
        <span className="text-xs text-secondary">
          By signing up, you agree to the <a href="/#">Terms of Service</a> and <a href="/#">Privacy Policy</a>, including <a href="/#">Cookie Use</a>.
        </span>
        <span className="mt-3 text-sm text-secondary">
          Have an account already ?&nbsp;
          <Link to="/login" className="text-white">
            Log in
          </Link>
        </span>
      </div>
    </div>
  )
}

export default PreStep
