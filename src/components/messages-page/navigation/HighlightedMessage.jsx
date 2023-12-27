import React from "react"
import Typography from "@mui/material/Typography"

/**
 * HighlightedMessage component displays a highlighted version of the main text with matching subtext.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.mainText - The main text to be displayed
 * @param {string} props.subText - The subtext to be highlighted within the main text
 * @returns {JSX.Element} JSX element representing the HighlightedMessage component
 */
const HighlightedMessage = ({ mainText, subText }) => {
  return (
    <Typography
      variant="body1"
      component="div"
      className="text-sm text-gray-500"
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2, // Limit to two lines
      }}
    >
      {mainText.toLowerCase().includes(subText.toLowerCase()) ? (
        <span>
          {mainText.split(new RegExp(`(${subText})`, "i")).map((part, index) => (
            <React.Fragment key={index}>
              {index % 2 === 1 && <span className="bg-yellow-400">{part}</span>}
              {index % 2 === 0 && part}
            </React.Fragment>
          ))}
        </span>
      ) : (
        mainText
      )}
    </Typography>
  )
}

export default HighlightedMessage
