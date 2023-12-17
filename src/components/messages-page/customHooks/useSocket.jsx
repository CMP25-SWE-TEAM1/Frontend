// useSocket.js
import { useEffect } from "react"
import io from "socket.io-client"
import { SOCKET_IO } from "../MessagesConstants"

const useSocket = (userToken) => {
  const socketURL = SOCKET_IO.actual
  const maxRetries = 3
  const initialDelay = 1000 // 1 second
  const maxDelay = 5000 // 5 seconds

  const socket = io(socketURL, {
    withCredentials: true,
    extraHeaders: {
      token: userToken,
    },
    reconnectionAttempts: maxRetries,
    reconnectionDelay: initialDelay,
    reconnectionDelayMax: maxDelay,
  })

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected successfully")
      // You can perform additional actions upon successful connection
    }

    const handleReconnectFailed = () => {
      console.error("Connection failed after max retries")
      // Handle the failure, e.g., show an error message to the user
    }

    // Set up event listeners
    socket.on("connect", handleConnect)
    socket.on("reconnect_failed", handleReconnectFailed)

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("connect", handleConnect)
      socket.off("reconnect_failed", handleReconnectFailed)
    }
  }, [socket]) // Dependencies array ensures this effect runs only once

  return socket
}

export default useSocket
