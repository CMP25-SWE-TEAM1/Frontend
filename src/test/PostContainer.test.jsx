import { screen, render } from "@testing-library/react";
import PostsContainer from "../components/PostsContainer";
import { BrowserRouter } from "react-router-dom";

const postsTst = [
  {
    userName: "Mohamed Samir",
    userTag: "MSamir245",
    date: "Thu Oct 26 2023 2:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "23K",
    repostCount: "45K",
    likeCount: "64K",
    viewCount: "1M",
  },
  {
    userName: "Mohamed Taher",
    userTag: "MTaher25",
    date: "Thu Oct 26 2023 22:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "2",
    repostCount: "45",
    likeCount: "4",
    viewCount: "10",
  },
  {
    userName: "Ismail Ramadan",
    userTag: "IRamadan",
    date: "Thu Oct 26 2023 14:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "23",
    repostCount: "12",
    likeCount: "40",
    viewCount: "250",
  },
  {
    userName: "Youssif Haggag",
    userTag: "YH1212",
    date: "Thu Oct 26 2023 19:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "52",
    repostCount: "15",
    likeCount: "156",
    viewCount: "1K",
  },
  {
    userName: "Hefney",
    userTag: "MHefny441",
    date: "Thu Oct 26 2023 11:28:01 GMT+0200 (Eastern European Standard Time)",
    replyCount: "21",
    repostCount: "55",
    likeCount: "64",
    viewCount: "156",
  },
];

describe("Post Container", () => {
  beforeEach(() => {
    jest.spyOn(document, "getElementById").mockReturnValue({
      classList: {
        contains: jest.fn().mockReturnValue(true),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Posts Render Correctly", () => {
    render(
      <BrowserRouter>
        <PostsContainer posts={postsTst} />
      </BrowserRouter>
    );

    const posts = screen.getAllByTestId("postId");
    expect(posts).toHaveLength(postsTst.length);
  });
});
