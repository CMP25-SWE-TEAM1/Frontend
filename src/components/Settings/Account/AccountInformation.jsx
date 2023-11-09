import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const AccountInformation = () => {
  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Account information</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">View and update your account information, like your username and email address.</p>
      <Link to="/settings/change_username">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover">
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Username</div>
            <p className="text-xs text-secondary">"current username"</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
      <Link to="/settings/change_email">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover">
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Email</div>
            <p className="text-xs text-secondary">"current email"</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
    </div>
  )
}

export default AccountInformation
