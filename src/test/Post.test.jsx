import { render, screen, act } from "@testing-library/react"
// import Post from "../components/Post"
import { BrowserRouter } from "react-router-dom"
import user from "@testing-library/user-event"

const postTst = {
  userName: "Mohamed Samir",
  userTag: "MSamir245",
  date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
  replyCount: "23K",
  repostCount: "45K",
  likeCount: "64K",
  viewCount: "1M",
}

describe("Post", () => {
  beforeEach(() => {
    jest.spyOn(document, "getElementById").mockReturnValue({
      classList: {
        contains: jest.fn().mockReturnValue(true),
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("Post render correctly", () => {
    // render(
    //   <BrowserRouter>
    //     <Post userName={postTst.userName} userTag={postTst.userTag} date={postTst.date} replyCount={postTst.replyCount} repostCount={postTst.repostCount} likeCount={postTst.likeCount} viewCount={postTst.viewCount} />
    //   </BrowserRouter>
    // )

    // const nameElement = screen.getByRole("link", {
    //   name: new RegExp(postTst.userName, "i"),
    // })
    // expect(nameElement).toBeInTheDocument()

    // const tagElement = screen.getByRole("link", {
    //   name: new RegExp(postTst.userTag, "i"),
    // })
    // expect(tagElement).toBeInTheDocument()

    // const replyCount = screen.getByText(new RegExp(postTst.replyCount, "i"))
    // expect(replyCount).toBeInTheDocument()

    // const repostCount = screen.getByText(new RegExp(postTst.repostCount, "i"))
    // expect(repostCount).toBeInTheDocument()

    // const likeCount = screen.getByText(new RegExp(postTst.likeCount, "i"))
    // expect(likeCount).toBeInTheDocument()

    // const viewCount = screen.getByText(new RegExp(postTst.likeCount, "i"))
    // expect(viewCount).toBeInTheDocument()

    // const menuButton = screen.getByTestId("menu-button")
    // expect(menuButton).toBeInTheDocument()

    // const postTest = screen.getByTestId("post-text-id")
    // expect(postTest).toBeInTheDocument()
  })

  // test("Menu Renders Correctly", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Post userName={postTst.userName} userTag={postTst.userTag} date={postTst.date} replyCount={postTst.replyCount} repostCount={postTst.repostCount} likeCount={postTst.likeCount} viewCount={postTst.viewCount} />
  //     </BrowserRouter>
  //   )

  //   const menuButton = screen.getByTestId("menu-button")
  //   await act(() => {
  //     user.click(menuButton)
  //   })

  //   const notInterested = screen.getByText(/not interested in this post/i)
  //   expect(notInterested).toBeInTheDocument()

  //   const followTag = screen.getByText(new RegExp("follow @" + postTst.userTag, "i"))
  //   expect(followTag).toBeInTheDocument()

  //   const muteTag = screen.getByText(new RegExp("mute @" + postTst.userTag, "i"))
  //   expect(muteTag).toBeInTheDocument()

  //   const blockTag = screen.getByText(new RegExp("block @" + postTst.userTag, "i"))
  //   expect(blockTag).toBeInTheDocument()

  //   const postEngagement = screen.getByText(/view post engagements/i)
  //   expect(postEngagement).toBeInTheDocument()
  // })
})
