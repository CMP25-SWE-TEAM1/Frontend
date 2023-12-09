import { Link } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const AccessibilityDisplayLanguages = () => {
  return (
    <div>
      <div className="flex items-center pl-4">
        <Link to="/settings">
          <ArrowBackIcon className="hover:bg-lightHover dark:hover:bg-darkHover h-8 w-8 rounded-2xl p-[6px] lg:hidden"></ArrowBackIcon>
        </Link>
        <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Accessibility, display, and languages</h1>
      </div>
      <p className="mb-4 pl-4 text-xs text-secondary">Manage how Gigachat content is displayed to you.</p>
      <Link to="/settings/display">
        <div className="flex p-2 hover:cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover" id="mahmoud_display">
          {/* icon */}
          <div className="flex h-[57px] flex-col justify-center p-[11px]">
            <div className="w-[90%] text-sm">Display</div>
            <p className="text-xs text-secondary">Manage your font size, color, and background. These settings affect all the X accounts on this browser.</p>
          </div>
          <div className="m-auto mr-3 text-2xl">&gt;</div>
        </div>
      </Link>
    </div>
  )
}

export default AccessibilityDisplayLanguages
