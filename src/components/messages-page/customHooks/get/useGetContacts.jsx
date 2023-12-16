import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetContacts = async (userToken) => {
  try {
    const res = await axios.get(SERVER_ON ? APIs.actual.getChatAll : APIs.mock.getChatAll, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    return res.data
  } catch (err) {
    // Handle errors
    console.log(err)
    return []
  }
}

export default useGetContacts
