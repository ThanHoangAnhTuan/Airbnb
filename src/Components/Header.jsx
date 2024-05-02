import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [screenWidth]);

  return (
    <>
      {screenWidth >= 1200 && (
        <header>
          <nav className="flex items-center justify-between pt-5 px-10 pb-10">
            <div className="flex">
              <NavLink
                to=""
                className="text-4xl text-pink-500">
                <i className="fa-brands fa-airbnb"></i>
                <span> airbnb</span>
              </NavLink>
            </div>
            <div className="flex items-center text-white ">
              <NavLink className="mx-5 text-lg">Nơi ở</NavLink>
              <NavLink className="mx-5 text-lg">Trải nghiệm</NavLink>
              <NavLink className="mx-5 text-lg">Trải nghiệm trực tuyến</NavLink>
            </div>
            <div className="flex items-center justify-between text-white">
              <NavLink className="text-lg">Đón tiếp khách</NavLink>
              <NavLink className="mx-5">
                {" "}
                <i className="fa-solid fa-globe"></i>
              </NavLink>
              <div className="flex items-center justify-around w-20 h-12 bg-gray-400 rounded-xl">
                <NavLink to="/register">
                  <i className="fa-solid fa-bars"></i>
                </NavLink>
                <NavLink to="/signin">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </div>
            </div>
          </nav>
        </header>
      )}
      {screenWidth >= 768 && screenWidth < 1200 && (
        <header className="bg-black">
          <nav className="flex  items-center justify-between p-6 lg:px-8 ">
            <div className="flex flex-none">
              <a
                href="/"
                className="-m-1 p-1.5 text-4xl text-pink-500">
                <i className="fa-brands fa-airbnb"></i>
                <span> airbnb</span>
              </a>
            </div>
            <div className="flex lg:flex-none mx-0.5 text-slate-100 ">
              <a
                href="/"
                className="-m-1 p-1.5 mx-3 text-lg ">
                Nơi ở
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-3 text-lg">
                Trải nghiệm
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-3 text-lg">
                Trải nghiệm trực tuyến
              </a>
            </div>
            <div className="flex lg:flex-3 items-center justify-between text-slate-100">
              <a
                href="#"
                className="-m-1 p-1.5 mx-2 text-lg ">
                Đón tiếp khách
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-1">
                {" "}
                <i className="fa-solid fa-globe"></i>
              </a>
              <div className="login">
                <a
                  href="/register"
                  className="-m-1 p-1.5 mx-1">
                  <i className="fa-solid fa-bars"></i>
                </a>
                <a href="/signin">
                  <i className="fa-solid fa-user"></i>
                </a>
              </div>
            </div>
          </nav>
        </header>
      )}
      {screenWidth < 768 && (
        <header className="bg-black">
          <nav className="flex  items-center justify-between p-6 lg:px-8 ">
            <div className="flex flex-none">
              <a
                href="/"
                className="-m-1 p-1.5 text-4xl text-pink-500">
                <i className="fa-brands fa-airbnb"></i>
                <span> airbnb</span>
              </a>
            </div>
            <div className="flex lg:flex-none mx-0.5 text-slate-100 ">
              <a
                href="/"
                className="-m-1 p-1.5 mx-3 text-lg ">
                Nơi ở
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-3 text-lg">
                Trải nghiệm
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-3 text-lg">
                Trải nghiệm trực tuyến
              </a>
            </div>
            <div className="flex lg:flex-3 items-center justify-between text-slate-100">
              <a
                href="#"
                className="-m-1 p-1.5 mx-2 text-lg ">
                Đón tiếp khách
              </a>
              <a
                href="#"
                className="-m-1 p-1.5 mx-1">
                {" "}
                <i className="fa-solid fa-globe"></i>
              </a>
              <div className="login">
                <a
                  href="/register"
                  className="-m-1 p-1.5 mx-1">
                  <i className="fa-solid fa-bars"></i>
                </a>
                <a href="/signin">
                  <i className="fa-solid fa-user"></i>
                </a>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
