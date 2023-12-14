import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetContacts = () => {
  return axios
    .get(SERVER_ON ? APIs.actual.getChatAll : APIs.mock.getChatAll)
    .then((res) => {
      // Handle the successful response
      //   console.log(res.data)
      return res.data
    })
    .catch((err) => {
      // Handle errors
      console.log(err)
      return []
    })
}

export default useGetContacts
