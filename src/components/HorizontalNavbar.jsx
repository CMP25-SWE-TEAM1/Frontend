import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const HorizontalNavbar = ({ urls, originalUrl }) => {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [urlLocation, setUrlLocation] = useState(null);

  useEffect(() => {
    setUrlLocation(location.pathname);
  }, [location]);

  return (
    <>
      {urls.map((url) => {
        return (
          <div
            className="relative h-[100%] flex-1 flex flex-col hover:bg-gray-100 dark:hover:bg-[#1C1C1C] dark:hover:backdrop-blur-xl transition-colors"
            key={url.title}
          >
            <Link
              className={`m-auto font-medium ${
                urlLocation === `${originalUrl}/${url.location}`
                  ? ""
                  : "text-gray-600 dark:text-gray-400"
              }`}
              to={`${originalUrl}/${url.location}`}
            >
              {url.title}
            </Link>
            <div
              className={`absolute bottom-0 rounded-sm self-center h-1 w-12 ${
                urlLocation === `${originalUrl}/${url.location}`
                  ? "bg-primary"
                  : "bg-inherit"
              }`}
            ></div>
          </div>
        );
      })}
    </>
  );
};

export default HorizontalNavbar;
