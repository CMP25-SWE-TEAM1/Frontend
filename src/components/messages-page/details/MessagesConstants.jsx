// Socket server
// ================
export const SOCKET_ON = false
export const TENOR_API_KEY = "AIzaSyDE0FD8utv75fMWO_i0DzKDXyLR9-hn77o"

export const SOCKET_IO = {
  mock: "http://localhost:3001",
  actual: "http://gigachat.com??..",
}

// APIs
// ================
const MOCK_DOMAIN = "https://ca224727-23e8-4fb6-b73e-dc8eac260c2d.mock.pstmn.io"
const ACTUAL_DOMAIN = "http://backend.gigachat.cloudns.org/api"

export const APIs = {
  mock: {
    // postMedia: MOCK_DOMAIN + "/media",
  },
  actual: {
    postMedia: ACTUAL_DOMAIN + "/media",
  },
}
