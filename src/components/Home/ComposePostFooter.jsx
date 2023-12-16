import React from 'react'
import GeneralButton from "../Sidebar/Button"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined"
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined"
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import CircularProgress from '@mui/material/CircularProgress';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ComposePostFooter({handleUploadMediaClick, handleUploadMedia, hiddenUploadMediaInput, mediaDisabled, GIFDisabled, pollDisabled, postDisabled, progressCircleSize, charsCount, charsProgressColor, progressCircleValue, handleSubmit}) {
  return (
    <div className="flex justify-between pt-3">
          <div className="flex bg-transparent">
            <button onClick={handleUploadMediaClick}>
            <GeneralButton name={<InsertPhotoOutlinedIcon fontSize="small" />} title="Media" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="" disabled={mediaDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]"/>
            </button>
            <input
              type="file"
              onChange={handleUploadMedia}
              ref={hiddenUploadMediaInput}
              style={{ display: "none" }}
            />
            <GeneralButton name={<GifBoxOutlinedIcon fontSize="small" />} title="GIF" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={GIFDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]"/>
            <GeneralButton name={<BallotOutlinedIcon fontSize="small" />} title="Poll" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={pollDisabled} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]"/>
            <GeneralButton name={<SentimentSatisfiedOutlinedIcon fontSize="small" />} title="Emoji" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" />
            <GeneralButton name={<EditCalendarIcon fontSize="small" />} title="Schedule"color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={false} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
            <GeneralButton name={<LocationOnOutlinedIcon fontSize="small" />} title="Location" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-8" width="w-8" link="/compose/tweet" disabled={true} disabledColor="text-[#b0dbf9] dark:text-[#0D4A73]" />
          </div>
          <div className="flex items-center">
            <div className={`circleProgress-addIcon flex items-center ${postDisabled? "hidden":""}`}>
          <Box sx={{ position: 'relative',top: '4px',border:'1.5px'}}>
          <CircularProgress variant="determinate" sx={{ color:"grey.200"}} size={progressCircleSize} value={charsCount<100? 100:0} />
          <CircularProgress variant="determinate" sx={{ position: 'absolute',left: 0, color: charsProgressColor}} size={progressCircleSize} value={charsCount<100? charsCount:charsCount<2900/28? 100:0} />
          <Box 
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {progressCircleValue}
        </Typography>
      </Box>
          </Box>
          <div className="px-3 py-1 border-l ml-3 border-gray-300">
          <GeneralButton name={<AddRoundedIcon fontSize="small" />} title="Add" color="text-[#1D9BF0]" hoverBgColor="bg-[#e7f5fd]" darkHoverBgColor="bg-[#031018]" height="h-6" width="w-6 border-[1.5px] border-gray-300 rounded-full" link="/compose/tweet" />
          </div>
          </div>
          <button onClick={handleSubmit} className={`rounded-full bg-[#1D9BF0] p-0 ${postDisabled? "pointer-events-none":""}`}>
            <GeneralButton name="Post" color="text-white" backgroundColor="bg-[#1D9BF0]" height="h-8" width="w-16" disabled={postDisabled} disabledColor="bg-[#b0dbf9] dark:bg-[#0D4A73]"/>
          </button>
          </div>
        </div>
  )
}

export default ComposePostFooter