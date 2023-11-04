import HorizontalNavbar from "./HorizontalNavbar";
import "../styles/home.css";
import PostsContainer from "./PostsContainer";

const Home = () => {
  const homeNavLinks = [
    { title: "For you", location: "foryou" },
    { title: "Following", location: "following" },
  ];

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

  return (
    <div className="text-center shrink-0 w-[45%] border ml-0 mr-1 max-w-[600px] border-t-0 border-b-0 dark:border-gray-600 border-gray-100 overflow-y-scroll home">
      <div className="sticky top-0 z-50 bg-white bg-opacity-[87%] dark:bg-opacity-[99%] border-0 border-b border-b-gray-100 dark:border-b-gray-600 mb-3  backdrop-blur-sm dark:bg-inherit ">
        {/* <div className="h-[53px] flex justify-start items-center">
          <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
            Home
          </h2>
        </div> */}
        <div className="h-[53px] flex items-center">
          <HorizontalNavbar urls={homeNavLinks} originalUrl={"/home"} />
        </div>
      </div>
      <PostsContainer posts={postsTst} />
    </div>
  );
};

export default Home;
