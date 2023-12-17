function getUser() {
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
  } else {
    user = null
  }
  return user
}

export default getUser

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

const currentYear = new Date().getFullYear()
export const last120Years = []

for (let i = 0; i < 120; i++) {
  const year = currentYear - i
  last120Years.push(year)
}
export const DefaultCoverPage = "https://wallpaperaccess.com/full/2969070.jpg";