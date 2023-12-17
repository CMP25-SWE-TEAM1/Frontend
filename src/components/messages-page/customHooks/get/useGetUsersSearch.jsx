import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetUsersSearch = async (searchQuery, userToken) => {
  try {
    const res = await axios.get(SERVER_ON ? APIs.actual.getUsersSearch : APIs.mock.getUsersSearch, {
      params: {
        word: searchQuery,
        type: "user",
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

export default useGetUsersSearch
