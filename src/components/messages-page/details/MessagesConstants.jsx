export const TENOR_API_KEY = "AIzaSyDE0FD8utv75fMWO_i0DzKDXyLR9-hn77o"

// Socket server
// ================
export const SOCKET_ON = true

export const SOCKET_IO = {
  mock: "http://localhost:3001",
  actual: "http://gigachat.com??..",
}

// APIs
// ================
// flags
export const BACKEND_ON = false // flag for using APIs(true) or not(false)
export const SERVER_ON = false // flag for using Mock(false) or actual(true)
// domains
const MOCK_DOMAIN = "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io"
const ACTUAL_DOMAIN = "http://backend.gigachat.cloudns.org/api"
// sub-domains
export const APIs = {
  mock: {
    // postMedia: MOCK_DOMAIN + "/media",
    getChat: MOCK_DOMAIN + "user/chat",
  },
  actual: {
    postMedia: ACTUAL_DOMAIN + "/media",
    getChat: ACTUAL_DOMAIN + "user/chat",
  },
}
