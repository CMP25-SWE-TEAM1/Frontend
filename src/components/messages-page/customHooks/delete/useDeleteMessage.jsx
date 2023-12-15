import { APIs, SERVER_ON } from "../../MessagesConstants"
import axios from "axios"

const useDeleteMessage = (id) => {
  return axios
    .delete(SERVER_ON ? `${APIs.actual.deleteMessage}/${id}` : `${APIs.mock.deleteMessage}/${id}`)
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
