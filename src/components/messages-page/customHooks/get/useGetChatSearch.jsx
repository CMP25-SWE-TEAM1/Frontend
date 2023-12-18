import { APIs, SERVER_ON } from "./../../constants/MessagesConstants"
import axios from "axios"

const useGetChatSearch = async (searchQuery, userToken) => {
  try {
    const res = await axios.get(SERVER_ON ? APIs.actual.getChatAllSearch : APIs.mock.getChatAllSearch, {
      params: {
        word: searchQuery,
        page: 1,
        count: 10,
      },
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    console.log("res", res)
    return res.data
  } catch (err) {
    // Handle errors
    console.log(err)
    return []
  }
}

export default useGetChatSearch
