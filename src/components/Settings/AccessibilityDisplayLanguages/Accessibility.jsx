import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const Accessibility = () => {
  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="../accessibility_display_and_languages">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px]"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Accessibility</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Manage how X content is displayed to you.</p>
    </div>
  )
}

export default Accessibility
