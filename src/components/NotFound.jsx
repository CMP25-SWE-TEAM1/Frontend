import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center ml-auto mr-auto">
      Hmm...this page doesn&apos;t exist. Try searching for something else.
      <Link to="/explore">
        <button className="btn ml-auto mt-6 w-20 !bg-primary !text-white hover:brightness-90">
          Search
        </button>
      </Link>
    </div>
  )
}

export default NotFound