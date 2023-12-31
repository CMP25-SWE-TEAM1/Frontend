import { Cancel } from "@mui/icons-material"
import CropIcon from "@mui/icons-material/Crop"
import { Box, Button, DialogActions, DialogContent, Slider } from "@mui/material"
import React, { useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./utils/CropImage"

/**
 * Presents a user interface for cropping images, enabling adjustments to zoom, rotation, and cropping area.
 *
 * @component
 */
const Crop = ({ photoURL, setOpenCrop, setPhotoURL, setFile, aspect, originalPhoto }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropImage = () => {
    getCroppedImg(photoURL, croppedAreaPixels, rotation)
      .then((res) => {
        // console.log(res)
        setFile(res.file)
        setPhotoURL(res.url)
        setOpenCrop(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <DialogContent
        dividers
        sx={{
          position: "relative",
          width: "auto",
          gap: 0,
          //   minWidth: { sm: 500 },
          overflowY: "",
          height: 400,
          margin: 0,
        }}
      >
        <div className="!mt-0 !h-fit">
          <Cropper image={photoURL} crop={crop} zoom={zoom} rotation={rotation} aspect={aspect} onZoomChange={setZoom} onRotationChange={setRotation} onCropChange={setCrop} onCropComplete={cropComplete} />
        </div>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", mx: 3 }}>
        <div className="!mt-0 !h-fit w-full">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex" }}>
              <span className="mr-5 w-32 text-left">Zoom: </span>
              <Slider valueLabelDisplay="auto" valueLabelFormat={zoomPercent} min={1} max={3} step={0.1} value={zoom} onChange={(e, zoom) => setZoom(zoom)} />
            </Box>
            <Box sx={{ display: "flex" }}>
              <span className="mr-5 w-32 text-left">Rotation: {rotation + "°"}</span>
              <Slider valueLabelDisplay="auto" min={0} max={360} value={rotation} onChange={(e, rotation) => setRotation(rotation)} />
            </Box>
          </Box>
        </div>
        <div className="!m-0 !mt-5 !h-fit w-full">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => {
                setPhotoURL(originalPhoto)
                setOpenCrop(false)
              }}
              className="mr-5 "
            >
              Cancel
            </Button>
            <Button variant="outlined" startIcon={<CropIcon />} onClick={handleCropImage}>
              Crop
            </Button>
          </Box>
        </div>
      </DialogActions>
    </>
  )
}
// Crop.propTypes = {
//   /**
//    * The URL of the photo to be cropped
//    */
//   photoURL: React.PropTypes.string.isRequired,
//   /**
//    * Function to close the crop modal
//    */
//   setOpenCrop: React.PropTypes.func.isRequired,
//   /**
//    * Function to update the photo URL after cropping
//    */
//   setPhotoURL: React.PropTypes.func.isRequired,
//   /**
//    * Function to set the cropped image file
//    */
//   setFile: React.PropTypes.func.isRequired,
//   /**
//    * The desired aspect ratio for cropping (e.g., "16:9")
//    */
//   aspect: React.PropTypes.string,
//   /**
//    * The original photo URL, for resetting if needed
//    */
//   originalPhoto: React.PropTypes.string,
// }

export default Crop

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
}
