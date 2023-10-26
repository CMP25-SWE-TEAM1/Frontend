import HorizontalNavbar from "./HorizontalNavbar";
import "../styles/home.css";
import Post from "./Post";

const Home = () => {
  const homeNavLinks = [
    { title: "For you", location: "foryou" },
    { title: "Following", location: "following" },
  ];

  return (
    <div className="text-center shrink-0 w-[45%] border ml-0 mr-1 max-w-[600px] border-t-0 border-b-0 dark:border-gray-600 border-gray-100 overflow-y-scroll home">
      <div className="sticky top-0 z-50 bg-white bg-opacity-[86%] border-0 border-b border-b-gray-100 dark:border-b-gray-600 mb-3  backdrop-blur-sm dark:bg-inherit ">
        {/* <div className="h-[53px] flex justify-start items-center">
          <h2 className="font-semibold text-xl text-gray-800 pl-6 dark:text-white">
            Home
          </h2>
        </div> */}
        <div className="h-[53px] flex items-center">
          <HorizontalNavbar urls={homeNavLinks} originalUrl={"/home"} />
        </div>
      </div>

      <Post />
    </div>
  );
};

export default Home;
