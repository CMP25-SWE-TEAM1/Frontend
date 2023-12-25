export const TENOR_API_KEY = "AIzaSyDE0FD8utv75fMWO_i0DzKDXyLR9-hn77o"

// Socket server
// ================
export const SOCKET_ON = true

export const SOCKET_IO = {
  mock: "http://localhost:3001",
  actual: "http://51.116.199.56:5750",
}

// APIs
// ================
// flags
export const BACKEND_ON = true // flag for using APIs(true) or not(false)
export const SERVER_ON = true // flag for using Mock(false) or actual(true)
// domains
const MOCK_DOMAIN = "http://localhost:3001/api"
const ACTUAL_DOMAIN = "https://backend.gigachat.cloudns.org/api"
// sub-domains
export const APIs = {
  mock: {
    postMedia: MOCK_DOMAIN + "/media",
    getChat: MOCK_DOMAIN + "/user/chat",
    getChatAll: MOCK_DOMAIN + "/user/chat/all",
    deleteMessage: MOCK_DOMAIN + "/user/chat/message",
    getUsersSearch: MOCK_DOMAIN + "/user/search",
  },
  actual: {
    postMedia: ACTUAL_DOMAIN + "/media",
    getChat: ACTUAL_DOMAIN + "/user/chat",
    getChatAll: ACTUAL_DOMAIN + "/user/chat/all",
    getChatAllSearch: ACTUAL_DOMAIN + "/user/chat/search",
    deleteMessage: ACTUAL_DOMAIN + "/user/chat/message",
    getUsersSearch: ACTUAL_DOMAIN + "/user/search",
  },
}
