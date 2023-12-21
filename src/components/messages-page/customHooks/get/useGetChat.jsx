import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetChat = async (chatId, userToken) => {
  try {
    const res = await axios.get(SERVER_ON ? `${APIs.actual.getChat}/${chatId}` : `${APIs.mock.getChat}/${chatId}`, {
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

export default useGetChat
