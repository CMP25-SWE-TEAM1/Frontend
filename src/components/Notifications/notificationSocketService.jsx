import { io } from "socket.io-client"
import { SOCKET_IO } from "../../constants/notificationConstants"
let socket

export const initializeSocket = (userToken) => {
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

  return socket
  // Clean up event listeners when the component unmounts
  // return () => {
  //   socket.off("connect", handleConnect)
  //   socket.off("reconnect_failed", handleReconnectFailed)
  // }
}

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.")
  }

  return socket
}
