const TrendSearchOption = ({ option, ...props }) => {
  return (
    <div {...props} className="flex cursor-pointer p-3 hover:bg-lightHover">
      <div
        className="ml-3"
        onClick={() => {
          window.location.href = `search?q=${option.title.replace(/#/g, "%23")}`
        }}
      >
        <div className="text-sm text-secondary">{option.title}</div>
      </div>
    </div>
  )
}

export default TrendSearchOption
