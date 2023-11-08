import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const Blocked = () => {

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../privacy_and_safety">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Blocked Accounts</h1>
      </div>
      <p className="mb-4 pl-4 pr-10 text-xs text-secondary">When you block someone, that person won&apos;t be able to follow or message you, and you won&apos;t see notifications from them.</p>
    </div>
  )
}

export default Blocked
