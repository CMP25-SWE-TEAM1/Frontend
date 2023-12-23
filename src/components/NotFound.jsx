import { Link } from "react-router-dom"
import { getColor } from "../constants"
import { useSelector } from "react-redux"

const NotFound = () => {
  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div className="ml-auto mr-auto flex flex-col items-center justify-center">
      Hmm...this page doesn&apos;t exist. Try searching for something else.
      <Link to="/explore">
        <button className={`btn ml-auto mt-6 w-20 ${"bg-"+getColor(themeColor)} !text-white hover:brightness-90`}>Search</button>
      </Link>
    </div>
  )
}

export default NotFound
