import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const ChangePassword = () => {

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings/account">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Change your password</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">Change your password at any time.</p>
    </div>
  )
}

export default ChangePassword
