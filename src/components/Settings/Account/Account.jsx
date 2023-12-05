import { Link } from "react-router-dom"

const Account = () => {
  return (
    <div>
      <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Your Account</h1>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">See information about your account, download an archive of your data, or learn about your account deactivation options</p>
      <Link to="/settings/account_information">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_account_information">
          {/* icon */}
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Account information</div>
            <p className="text-xs text-secondary">View and update your account information, like your username and email address.</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
      <Link to="/settings/change_password">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_change_password">
          {/* icon */}
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Change your password</div>
            <p className="text-xs text-secondary">Change your password at anytime.</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
    </div>
  )
}

export default Account
