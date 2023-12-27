import { screen, render, act } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Button from "../../../components/Sidebar/Button"
import user from "@testing-library/user-event"

describe("testing Button component", () => {
  test("rendering elements correctly", () => {
    render(<Button link="/" name="Post" />)

    const theLinkContainer = screen.getByRole("link")
    expect(theLinkContainer).toBeInTheDocument()

    const theDivContainer = screen.getByTitle("buttonNameContainer")
    expect(theDivContainer).toBeInTheDocument()

    const buttonName = screen.getByText("Post")
    expect(buttonName).toBeInTheDocument()
  })
  test("the href is correct", async () => {
    render(<Button link="/compose/tweet" name="Post" />)

    const button = screen.getByRole("link")
    expect(button).toHaveAttribute("href", "/compose/tweet")
  })
})
