import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import MessageCompose from "./MessageCompose"
import store from "../../../store"
import { BrowserRouter } from "react-router-dom"

// Mock search hook
jest.mock("../customHooks/get/useGetUsersSearch", () => jest.fn())

describe.only("testing ComposeMessage", () => {
  // Mock props (Data/Functions)
  const props = {
    setSelectedContact: jest.fn(),
    setContacts: jest.fn(),
    contacts: [],
    composeModalOpen: true,
    handleComposeModalClose: jest.fn(),
  }

  beforeEach(() => {
    // Reset mocks and provide initial state or props as needed
    jest.clearAllMocks()
  })

  test("renders correctly", async () => {
    // Render the component
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MessageCompose {...props} />
        </Provider>
      </BrowserRouter>
    )

    // expect that the modal is initially open
    expect(screen.getByTestId("compose-message-modal")).toBeInTheDocument()

    // expect existance of elements
    expect(screen.getByText("Next")).toBeInTheDocument()
    expect(screen.getByTitle("Close")).toBeInTheDocument()

    expect(screen.getByText("Next")).not.toHaveClass("active")
    fireEvent.click(screen.getByTitle("Close"))
  })
})
