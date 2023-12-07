import { useSelector } from "react-redux"

const NotificationComponent = ({ logo, text }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div className="flex min-h-[64px] cursor-pointer pb-3 pl-4 pr-4 pt-3 hover:bg-lightHover dark:hover:bg-darkHover">
      <div className="logo mr-3 h-10 w-10">
        <img src={logo} alt="" />
      </div>
      <div className="text flex-1 pr-5">
        <span className=" text-sm">{text}</span>
      </div>
    </div>
  )
}

export default NotificationComponent
