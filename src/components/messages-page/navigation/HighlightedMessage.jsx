import React from "react"
import Typography from "@mui/material/Typography"

const HighlightedMessage = ({ mainText, subText }) => {
  return (
    <Typography variant="body1" component="div">
      {mainText.includes(subText) ? (
        <span>
          {mainText.toUpperCase().split(subText.toUpperCase()).map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="MuiTypography-marked">{subText}</span>}
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
