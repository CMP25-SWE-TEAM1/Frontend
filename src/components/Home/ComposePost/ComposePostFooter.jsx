import React from "react"
import GeneralButton from "../../Sidebar/Button"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined"
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined"
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import CircularProgress from "@mui/material/CircularProgress"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useSelector } from "react-redux"
import { getColor } from "../../../constants"
function ComposePostFooter({ buttonName, handleUploadMediaClick, handleUploadMedia, hiddenUploadMediaInput, mediaDisabled, GIFDisabled, pollDisabled, postDisabled, progressCircleSize, charsCount, charsProgressColor, progressCircleValue, handleSubmit }) {
  const themeColor = useSelector((state) => state.theme.color)

  return (
    <div data-testid="ComposePostFooter" className="flex items-center justify-between pt-3">
      <div className="flex bg-transparent">
        <button onClick={handleUploadMediaClick}>
          <GeneralButton name={<InsertPhotoOutlinedIcon fontSize="small" />} title="Media" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={mediaDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
        </button>
        <input type="file" onChange={handleUploadMedia} ref={hiddenUploadMediaInput} style={{ display: "none" }} />
        <GeneralButton name={<GifBoxOutlinedIcon fontSize="small" />} title="GIF" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={GIFDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
        {/* <GeneralButton name={<BallotOutlinedIcon fontSize="small" />} title="Poll" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={pollDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" other={`${buttonName === "Post" ? "" : "hidden"}`} /> */}
        <GeneralButton name={<SentimentSatisfiedOutlinedIcon fontSize="small" />} title="Emoji" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" />
        <GeneralButton name={<EditCalendarIcon fontSize="small" />} title="Schedule" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={false} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" other={`${buttonName === "Post" ? "" : "hidden"}`} />
        <GeneralButton name={<LocationOnOutlinedIcon fontSize="small" />} title="Location" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={true} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
      </div>
      <div className="flex items-center">
        <div data-testid="circleProgress-addIcon" className={` flex items-center `}>
          <Box sx={{ position: "relative", top: "4px", border: "1.5px", mr: "12px" }}>
            <CircularProgress variant="determinate" className="text-lightBorder dark:text-darkBorder" size={progressCircleSize} value={charsCount < 100 ? 100 : 0} />
            <CircularProgress variant="determinate" sx={{ position: "absolute", left: 0, color: charsProgressColor }} size={progressCircleSize} value={charsCount < 100 ? charsCount : charsCount < 2900 / 28 ? 100 : 0} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" component="div" className={`${charsCount < 100 ? "text-gray-800 dark:text-gray-600" : "text-[#f4212e]"}`}>
                {progressCircleValue}
              </Typography>
            </Box>
          </Box>
          <div className={`border-l border-lightBorder px-3 py-1 dark:border-darkBorder ${buttonName === "Post" ? "" : "hidden"}`}>
            <GeneralButton name={<AddRoundedIcon fontSize="small" />} title="Add" color={"text-" + getColor(themeColor)} hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-6" width="w-6" other="border-[1.5px] border-lightBorder dark:border-darkBorder rounded-full" link="/compose/tweet" />
          </div>
        </div>
        <button onClick={handleSubmit} className={`rounded-full  p-0 ${postDisabled ? "pointer-events-none" : ""}`}>
          <GeneralButton name={buttonName} color="text-white" backgroundColor={"bg-" + getColor(themeColor)} height="h-8" width="w-16" disabled={postDisabled} disabledColor="bg-[#b0dbf9] dark:bg-[#0D4A73]" />
        </button>
      </div>
    </div>
  )
}

export default ComposePostFooter
