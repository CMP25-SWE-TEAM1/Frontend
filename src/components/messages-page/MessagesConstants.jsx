export const TENOR_API_KEY = "AIzaSyDE0FD8utv75fMWO_i0DzKDXyLR9-hn77o"

// Socket server
// ================
export const SOCKET_ON = false

export const SOCKET_IO = {
  mock: "http://localhost:3001",
  actual: "http://gigachat.com??..",
}

// APIs
// ================
// flags
export const BACKEND_ON = true // flag for using APIs(true) or not(false)
export const SERVER_ON = false // flag for using Mock(false) or actual(true)
// domains
const MOCK_DOMAIN = "http://localhost:3001/api"
const ACTUAL_DOMAIN = "http://backend.gigachat.cloudns.org/api"
// sub-domains
export const APIs = {
  mock: {
    postMedia: MOCK_DOMAIN + "/media",
    getChat: MOCK_DOMAIN + "/user/chat",
    getChatAll: MOCK_DOMAIN + "/user/chat/all",
    deleteMessage: MOCK_DOMAIN + "/user/chat/message",
  },
  actual: {
    postMedia: ACTUAL_DOMAIN + "/media",
    getChat: ACTUAL_DOMAIN + "/user/chat",
    getChatAll: ACTUAL_DOMAIN + "/user/chat/all",
    deleteMessage: ACTUAL_DOMAIN + "/user/chat/message",
  },
}
