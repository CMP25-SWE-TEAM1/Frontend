import { Link } from "react-router-dom"

const AccessibilityDisplayLanguages = () => {
  return (
    <div>
      <h1 className="mb-4 mt-4 pl-4 text-lg font-bold">Display</h1>
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
