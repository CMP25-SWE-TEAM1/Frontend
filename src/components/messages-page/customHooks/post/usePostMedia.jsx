import { APIs, SERVER_ON } from "./../../constants/MessagesConstants"
import axios from "axios"

// handleUploadMedia: Uploads media to server and get its URL
const usePostMedia = async (mediaFile, userToken) => {
  const mediaFormData = new FormData()
  mediaFormData.append(`media`, mediaFile)

  try {
    const res = await axios.post(SERVER_ON ? APIs.actual.postMedia : APIs.mock.postMedia, mediaFormData, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    console.log(res.data)
    return { response: res.data, error: null } // syntax err
  } catch (err) {
    console.log(err)
    return { response: null, error: err } // syntax err
  }
}

export default usePostMedia
