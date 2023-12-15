import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetChat = (chatid) => {
  return axios
    .get(SERVER_ON ? APIs.actual.getChat : APIs.mock.getChat, {
      params: { chatid },
    })
    .then((res) => {
      // Handle the successful response
      // console.log(res.data)
      return res.data
    })
    .catch((err) => {
      // Handle errors
      console.log(err)
      return []
    })
}

export default useGetChat
