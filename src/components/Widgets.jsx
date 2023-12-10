import SearchComponent from "./Explore/SearchComponent"

const Widgets = ({ parent }) => {
  return (
    <div className="hidden max-w-[400px] flex-1 text-center lg:block">
      <div className={`${parent === "explore" ? "hidden" : ""}`}>
        <SearchComponent />
      </div>
    </div>
  )
}

export default Widgets
