// Style
import "./img-crop-tool.css"
// Components
import Crop from "../../../General/Crop/Crop"
import ReactEmojiPicker from "./ReactEmojiPicker"
import GifPicker, { ContentFilter } from "gif-picker-react"
// MUI
import { createTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
// Const
import { TENOR_API_KEY } from "../../constants/MessagesConstants"
// Hooks
import { useState } from "react"
import usePostMedia from "../../customHooks/post/usePostMedia"
// Functions
// Redux
import { useSelector } from "react-redux"

const MessageInput = (props) => {
  // ==============  Props   ==============
  const handleSendMessage = props.handleSendMessage

  // ==============  Redux   ==============
  // User
  const userToken = useSelector((state) => state.user.token)

  // ==============  Data   ==============
  const spacingTheme = createTheme({
    spacing: 1,
  })
  // Message input
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false)
  const [emojiPickerVisibiltyStyle, setEmojiPickerVisibiltyStyle] = useState("none")
  const [newMessageText, setNewMessageText] = useState("")
  const [sndMsgActv, setSndMsgActv] = useState("")
  // Media Input
  const [newMessageMedia, setNewMessageMedia] = useState()
  const [newMessageMediaType, setNewMessageMediaType] = useState()

  const [messageImg, setMessageImg] = useState()
  const [messageImgURL, setMessageImgURL] = useState()
  // Crop modal
  const [openCrop, setOpenCrop] = useState(false)
  // GIF modal
  const [messageGIFURL, setMessageGIFURL] = useState()
  const [GIFsModalOpen, setGIFsModalOpen] = useState(false)

  // ==============  Hooks   ==============
  // -------- Custom --------
  const handlePostMedia = usePostMedia

  // ==============  Functions   ==============
  // -------- Submission --------
  const handleSndMsg = () => {
    if (newMessageText !== "" || newMessageMedia !== undefined) {
      // handleSendMessage(newMessageText, newMessageMedia, newMessageMediaType)
      if (newMessageMedia || messageImg) {
        if (newMessageMediaType === "Img") {
          handlePostMedia(messageImg, userToken).then((response) => {
            console.log(response)
            handleSendMessage(newMessageText, response.data.usls[0], newMessageMediaType)
          }) // upload media
          // handleSendMessage(newMessageText, "https://cdn.forumcomm.com/dims4/default/b339688/2147483647/strip/true/crop/800x800+0+0/resize/1066x1066!/quality/90/?url=https%3A%2F%2Ffcc-cue-exports-brightspot.s3.us-west-2.amazonaws.com%2Ffccnn%2Fbinary%2Fpepe_binary_796212.jpg", newMessageMediaType)
        } else handleSendMessage(newMessageText, newMessageMedia, newMessageMediaType)
      } else handleSendMessage(newMessageText)
    }
    // Reset values
    setNewMessageText("")
    setSndMsgActv("")
    setNewMessageMedia()
    setNewMessageMediaType()
    setMessageImg()
    setMessageImgURL()
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleSndMsg()
    }
  }
  // -------- Text --------
  const handleTextChange = (event) => {
    setNewMessageText(event.target.value)
    event.target.value === "" ? setSndMsgActv("") : setSndMsgActv("active")
  }
  // -------- Media --------

  const handleMediaUpload = (event, MediaType) => {
    const file = event.target.files[0]
    setMessageImg(file)
    setMessageImgURL(URL.createObjectURL(file))

    // Validate if file is an image file
    if (file && isImageFile(file)) {
      // Change state
      setNewMessageMedia(file)
      setNewMessageMediaType(MediaType)
      setSndMsgActv("active")
      console.log(file)
    } else {
      setNewMessageMedia()
      setNewMessageMediaType()
      setSndMsgActv("")
      return
    }
  }

  const handleMediaCancel = () => {
    setNewMessageMedia()
    setNewMessageMediaType()
    setMessageImg()
    setMessageImgURL()
    setSndMsgActv("")
  }
  const handleMediaEdit = () => {
    setOpenCrop(true)
  }

  const isImageFile = (file) => {
    // Get the file's MIME type
    const mimeType = file.type

    // Check if the MIME type starts with "image/"
    return mimeType.startsWith("image/")
  }

  // -------- GIF --------
  // GIFs modal
  const handleGIFsModalOpen = () => setGIFsModalOpen(true)
  const handleGIFsModalClose = () => setGIFsModalOpen(false)
  // GIF selection
  const handleGIFSelect = (e, MediaURL, MediaType) => {
    setNewMessageMedia(MediaURL)
    setNewMessageMediaType(MediaType)
    setMessageGIFURL(MediaURL)
    setSndMsgActv("active")
    handleGIFsModalClose()
  }
  const tenorMp4FromGIF = (TenorGIFLink) => {
    // change url
    var lastIndex = TenorGIFLink.lastIndexOf("/")
    var charsToChange = TenorGIFLink.substring(lastIndex - 2, lastIndex)
    var newURL = TenorGIFLink.replace(charsToChange, "Po")
    // Change extenstion
    newURL = newURL.slice(0, -3) + "mp4"
    // return
    return newURL
  }
  const onGifClick = (TenorImage) => {
    const newURL = tenorMp4FromGIF(TenorImage.url)
    handleGIFSelect(null, newURL, "GIF")
  }

  // -------- Emoji --------
  const handleAddEmoji = (emoji) => {
    setNewMessageText(newMessageText + emoji)
    setSndMsgActv("active")
  }
  const handleEmojiPickerVisibilty = () => {
    !emojiPickerVisible ? setEmojiPickerVisibiltyStyle("block") : setEmojiPickerVisibiltyStyle("none")
    setEmojiPickerVisible(!emojiPickerVisible)
  }

  return (
    <div className="keyboard">
      <div className="content">
        {/* Left icons (Media - GIF - Emoji) */}
        {!messageImgURL && !messageGIFURL && (
          <div className="icons">
            <div className="media-icon" title="Media">
              <input type="file" id="mahmoud_file_upload" accept="image/*" onChange={(e) => handleMediaUpload(e, "Img")} />
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                </g>
              </svg>
            </div>
            <div className="gif-icon" title="GIF" onClick={handleGIFsModalOpen}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path>
                </g>
              </svg>
            </div>
            <div style={{ position: "relative" }}>
              <div
                className="giga-bglock"
                onClick={() => {
                  handleEmojiPickerVisibilty()
                }}
                style={{ display: emojiPickerVisibiltyStyle }}
              ></div>
              <ReactEmojiPicker visibiltyStyle={emojiPickerVisibiltyStyle} handleAddEmoji={handleAddEmoji} />
              <div
                className="emoji-icon"
                onClick={() => {
                  handleEmojiPickerVisibilty()
                }}
                title="Emoji"
                id="mahmoud_emoji_picker"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {/* Message text */}
        <div className="message-text">
          {(messageImgURL || messageGIFURL) && (
            <div className="new-message-media-attach">
              <div>
                <div className="cancel-btn" title="Remove" onClick={handleMediaCancel}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                    </g>
                  </svg>
                </div>
                <div className="edit-btn" title="edit" onClick={handleMediaEdit}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M22.21 2.793c-1.22-1.217-3.18-1.26-4.45-.097l-10.17 9.32C5.02 12.223 3 14.376 3 17v5h5c2.62 0 4.78-2.022 4.98-4.593L22.3 7.239c1.17-1.269 1.12-3.229-.09-4.446zM8 20H5v-3c0-1.657 1.34-3 3-3s3 1.343 3 3-1.34 3-3 3zM20.83 5.888l-8.28 9.033c-.5-1.09-1.38-1.971-2.47-2.47l9.03-8.28c.48-.44 1.22-.424 1.68.036s.48 1.201.04 1.681z"></path>
                    </g>
                  </svg>
                </div>
                {newMessageMediaType === "Img" && <img src={messageImgURL} alt="attached media" />}
                {
                  newMessageMediaType === "GIF" && (
                    // <div className="relative cursor-pointer overflow-hidden rounded-md">
                    <video src={messageGIFURL} alt="attached media" loop autoPlay muted preload="auto" playsInline type="video/mp4" className="max-w-full"></video>
                  )
                  // </div>
                }
              </div>
            </div>
          )}
          <div className="input-area">
            <TextField
              fullWidth
              multiline
              maxRows={6}
              value={newMessageText}
              variant="standard"
              // placeholder cause error in runtime (no solution found for now!)
              // placeholder="Start a new message"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                px: spacingTheme.spacing(4),
                py: spacingTheme.spacing(7),
              }}
              id="message-input-field"
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {/* Send message icon */}
        <div className={`send-message ${sndMsgActv}`} id="mahmoud_send_message">
          <div
            className="send-icon"
            onClick={() => {
              handleSndMsg()
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <Modal open={GIFsModalOpen} onClose={handleGIFsModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <div>
            <GifPicker tenorApiKey={TENOR_API_KEY} ContentFilter={ContentFilter.HIGH} onGifClick={onGifClick} />
          </div>
        </Box>
      </Modal>
      <Modal
        open={openCrop}
        onClose={() => {
          setOpenCrop(false)
        }}
      >
        <Box sx={modalStyle}>
          <Crop photoURL={messageImgURL} setPhotoURL={setMessageImgURL} setOpenCrop={setOpenCrop} setFile={setMessageImg} aspect={1} />
        </Box>
      </Modal>
    </div>
  )
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxWidth: 600,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default MessageInput
