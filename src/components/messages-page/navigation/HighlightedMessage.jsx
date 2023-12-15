import React from "react"
import Typography from "@mui/material/Typography"

const HighlightedMessage = ({ mainText, subText }) => {
  return (
    <Typography variant="body1" component="div" className="text-gray-500 text-sm">
      {mainText.includes(subText) ? (
        <span>
          {mainText.split(subText).map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="bg-yellow-400">{subText}</span>}
              {part}
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
