import { APIs, SERVER_ON } from "./../../constants/MessagesConstants"
import axios from "axios"

const useGetChat = async (chatId, userToken) => {
  try {
    const res = await axios.get(SERVER_ON ? `${APIs.actual.getChat}/${chatId}` : `${APIs.mock.getChat}/${chatId}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    console.log("getChat res", res)
    return res.data
  } catch (err) {
    // Handle errors
    console.log(err)
    return []
  }
}

export default useGetChat
