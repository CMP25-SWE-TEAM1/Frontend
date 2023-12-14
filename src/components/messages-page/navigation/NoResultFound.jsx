import "./noResultFound.css"

const NoResultFound = (props) => {
  const searchValue = props.searchValue
  return (
    <div id="no-result-found">
      <div className="title">No results for "{searchValue}"</div>
      <div className="body">The term you entered did not bring up any results</div>
      <div>
        <a href="/messages/compose">Start new message</a>
      </div>
    </div>
  )
}

export default NoResultFound
