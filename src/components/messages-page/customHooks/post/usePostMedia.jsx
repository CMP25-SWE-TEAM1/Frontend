import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

// handleUploadMedia: Uploads media to server and get its URL
const usePostMedia = (mediaFiles) => {
  const formData = new FormData()
  mediaFiles.forEach((file) => {
    formData.append(`media`, file)
  })

  axios
    .post(SERVER_ON ? APIs.actual.postMedia : APIs.mock.postMedia, formData)
    .then((res) => {
      console.log(res.data)
      return res.data.urls
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export default usePostMedia
