import { useSelector } from "react-redux"
import moment from "moment"

const NotificationComponent = ({ logo, text, date }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)

  const timestamp = new Date(date)
  const day = timestamp.getDate()
  const month = timestamp.getMonth() + 1 // Months are zero-indexed
  const year = timestamp.getFullYear()
  const hour = timestamp.getHours()
  const minute = timestamp.getMinutes()

  const formattedDate = `${hour}:${minute} on ${day}/${month}/${year}`


  return (
    <div className="flex min-h-[64px] cursor-pointer pb-3 pl-4 pr-4 pt-3 hover:bg-lightHover dark:hover:bg-darkHover">
      <div className="logo mr-3 h-10 w-10">
        <img src={logo} alt="" />
      </div>
      <div className="text flex-1 pr-5">
        <span className=" text-sm">
          {text} at {formattedDate}
        </span>
      </div>
    </div>
  )
}

export default NotificationComponent
