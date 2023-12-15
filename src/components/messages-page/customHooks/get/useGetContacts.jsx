import { APIs, SERVER_ON } from "./../../MessagesConstants"
import axios from "axios"

const useGetContacts = () => {
  return (
    axios
      // .get(SERVER_ON ? APIs.actual.getChatAll : APIs.mock.getChatAll)
      .get(true ? APIs.actual.getChatAll : APIs.mock.getChatAll, {
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQ2ZjA0NGUyOGRlYTYyMDY5M2I4MSIsImlhdCI6MTcwMjEyOTQ3MiwiZXhwIjoxNzA5OTA1NDcyfQ.hn1CqfcPfGvFZuDn7PBhNfIpjv_ObO2SfZre3v0Y6FQ",
        },
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
  )
}

export default useGetContacts
