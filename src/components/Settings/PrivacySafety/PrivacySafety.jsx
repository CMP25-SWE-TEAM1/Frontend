import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const PrivacySafety = () => {
  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings">
          <ArrowBackIcon className="h-8 w-8 rounded-2xl p-[6px] hover:bg-lightHover dark:hover:bg-darkHover lg:hidden"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Privacy and Safety</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Manage what information you see and share on Gigachat.</p>
      <Link to="/settings/blocked">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_blocked_contacts">
          {/* icon */}
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Blocked accounts</div>
            <p className="text-xs text-secondary">Manage the accounts that you have blocked.</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
      <Link to="/settings/muted">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_muted_accounts">
          {/* icon */}
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Muted accounts</div>
            <p className="text-xs text-secondary">Manage the accounts that you have muted.</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
    </div>
  )
}

export default PrivacySafety
