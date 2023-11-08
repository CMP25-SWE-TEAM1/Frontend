import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const Muted = () => {

  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../privacy_and_safety">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Muted Accounts</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Here&apos;s everyone you muted. You can add or remove them from this list.</p>
    </div>
  )
}

export default Muted
