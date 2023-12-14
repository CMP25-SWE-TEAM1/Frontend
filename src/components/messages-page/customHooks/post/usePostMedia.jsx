import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

// handleUploadMedia: Uploads media to server and get its URL
const usePostMedia = (mediaFile) => {
  const formData = new FormData()
  formData.append("media", mediaFile)

  axios
    .post(SERVER_ON ? APIs.actual.postMedia : APIs.mock.postMedia, formData)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default usePostMedia
