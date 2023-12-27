import { screen, render, act, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import SidebarOption from "../../../components/Sidebar/SidebarOption"
import user from "@testing-library/user-event"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"

describe("testing SidebarOption component", () => {
  test("rendering elements correctly", () => {
    render(
      <BrowserRouter>
        <SidebarOption />
      </BrowserRouter>
    )

    const SidebarOptionLink = screen.getByTestId("link")
    expect(SidebarOptionLink).toBeInTheDocument()
  })
  test("rendering elements correctly with props", () => {
    render(
      <BrowserRouter>
        <SidebarOption icon={<HomeOutlinedIcon />} link="/home" name="Home" />
      </BrowserRouter>
    )

    const SidebarOptionLink = screen.getByTestId("link")
    expect(SidebarOptionLink).toBeInTheDocument()
    const SidebarOptionName = screen.getByText("Home")
    expect(SidebarOptionName).toBeInTheDocument()
    const SidebarOptionIcon = screen.getByTestId("icon")
    expect(SidebarOptionIcon).toBeInTheDocument()
  })
  test("changing the url correctly on click", async () => {
    render(
      <BrowserRouter>
        <SidebarOption icon={<HomeOutlinedIcon />} link="/home" name="Home" />
      </BrowserRouter>
    )

    const SidebarOptionLink = screen.getByTestId("link")
    expect(SidebarOptionLink).toBeInTheDocument()

    await user.click(SidebarOptionLink)
    expect(location.pathname).toBe("/home")
  })
})
