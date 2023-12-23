import { APIs, SERVER_ON } from "../../constants/MessagesConstants"
import axios from "axios"

const useDeleteMessage = (messageId) => {
  return axios
    .delete(SERVER_ON ? `${APIs.actual.deleteMessage}/${messageId}` : `${APIs.mock.deleteMessage}/${messageId}`)
    .then((res) => {
      // Handle the successful response
      //   console.log(res.data)
      return res.data
    })
    .catch((err) => {
      // Handle errors
      console.log(err)
      // throw err;
    })
}

export default useDeleteMessage
