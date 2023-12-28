import { screen, render } from "@testing-library/react"
// import SwitchAccount from "../../../components/Home/Sidebar/SwitchAccount"
import user from "@testing-library/user-event"

describe("testing SwitchAccount component", () => {
  const userName = "Ismail Ramadan Mokhtar"
  const userTag = "ismail_sh02"
  // test("rendering elements correctly", () => {
  //   render(<SwitchAccount userName={userName} userTag={`@${userTag}`} link="/profile" />)
  //   const theLinkContainer = screen.getByRole("link")
  //   expect(theLinkContainer).toBeInTheDocument()

  //   const theDivContainer = screen.getByTitle("switchAccountContainer")
  //   expect(theDivContainer).toBeInTheDocument()

  //   const userNameDiv = screen.getByText(userName)
  //   expect(userNameDiv).toBeInTheDocument()

  //   const userTagDiv = screen.getByText(`@${userTag}`)
  //   expect(userTagDiv).toBeInTheDocument()

  //   const profilePhoto = screen.getByTitle("profileIcon")
  //   expect(profilePhoto).toBeInTheDocument()

  //   const moreIcon = screen.getByTitle("moreIcon")
  //   expect(moreIcon).toBeInTheDocument()
  // })
  test("the href is correct", async () => {
    // render(<SwitchAccount userName={userName} userTag={`@${userTag}`} link="/profile" />)
    // const button = screen.getByRole("link")
    // expect(button).toHaveAttribute("href", "/profile")
  })
})
