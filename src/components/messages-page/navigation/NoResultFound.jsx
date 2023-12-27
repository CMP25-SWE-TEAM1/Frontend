import "./no-result-found.css"

/**
 * Renders a component to display a message when no search results are found (used in cotacts list).
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.searchValue - The search value entered by the user.
 * @return {JSX.Element} A JSX element representing the "NoResultFound" component.
 */
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
