import { Cancel } from "@mui/icons-material"
import CropIcon from "@mui/icons-material/Crop"
import { Box, Button, DialogActions, DialogContent, Slider, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./utils/CropImage"

const Crop = ({ photoURL, setOpenCrop, setPhotoURL, setFile, aspect }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(photoURL, croppedAreaPixels, rotation)
      setPhotoURL(url)
      setFile(file)
      setOpenCrop(false)
      console.log(photoURL)
    } catch (error) {
      console.log(error)
    }
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
        // dividers
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
            <Button variant="outlined" startIcon={<Cancel />} onClick={() => setOpenCrop(false)} className="mr-5">
              Cancel
            </Button>
            <Button variant="contained" startIcon={<CropIcon />} onClick={handleCropImage}>
              Crop
            </Button>
          </Box>
        </div>
      </DialogActions>
    </>
  )
}

export default Crop

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
}
