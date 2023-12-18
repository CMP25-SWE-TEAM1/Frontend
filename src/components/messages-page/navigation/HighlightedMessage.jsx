import React from "react"
import Typography from "@mui/material/Typography"

const HighlightedMessage = ({ mainText, subText }) => {
  return (
    <Typography variant="body1" component="div" className="text-sm text-gray-500">
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
