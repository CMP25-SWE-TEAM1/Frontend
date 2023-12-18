import { APIs, SERVER_ON } from "./../../constants/MessagesConstants"
import axios from "axios"

// handleUploadMedia: Uploads media to server and get its URL
const usePostMedia = (mediaFile) => {
  const formData = new FormData()
  formData.append(`media`, mediaFile)

  return axios
    .post(SERVER_ON ? APIs.actual.postMedia : APIs.mock.postMedia, formData)
    .then((res) => {
      console.log(res.data)
      console.log(res.data.urls[0])
      return res.data
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export default usePostMedia
