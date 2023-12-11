import { act, render, screen } from "@testing-library/react"
import HorizontalNavbar from "../components/HorizontalNavbar"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

const navLinks = [
  { title: "For you", location: "foryou" },
  { title: "Following", location: "following" },
]
const oUrl = "/home"

describe("Horizontal Navbar", () => {
  test("Renders Props Links", () => {
    render(
      <BrowserRouter>
        <HorizontalNavbar urls={navLinks} originalUrl={oUrl} handlers={[]} />
      </BrowserRouter>
    )

    for (const link of navLinks) {
      const linkElement = screen.getByText(link.title)
      expect(linkElement).toBeInTheDocument()
    }
  })

  test("Navigating Correctly through Links", async () => {
    render(
      <BrowserRouter>
        <HorizontalNavbar urls={navLinks} originalUrl={oUrl} handlers={[]} />
      </BrowserRouter>
    )

    for (const link of navLinks) {
      const linkElement = screen.getByRole("link", {
        name: link.title,
      })

      await act(async () => {
        await user.click(linkElement)
      })

      const location = window.location.pathname

      expect(location).toBe(oUrl + "/" + link.location)
    }
  })
})
