import React from "react";

const Header = () => {
  return (
    <header className="bg-black">
      <nav className="flex  items-center justify-between p-6 lg:px-8 ">
        <div className="flex flex-none">
          <a href="/" className="-m-1 p-1.5 text-4xl text-pink-500">
            <i className="fa-brands fa-airbnb"></i>
            <span> airbnb</span>
          </a>
        </div>
        <div className="flex lg:flex-none mx-0.5 text-slate-100 ">
          <a href="/" className="-m-1 p-1.5 mx-3 text-lg ">
            Nơi ở
          </a>
          <a href="#" className="-m-1 p-1.5 mx-3 text-lg">
            Trải nghiệm
          </a>
          <a href="#" className="-m-1 p-1.5 mx-3 text-lg">
            Trải nghiệm trực tuyến
          </a>
        </div>
        <div className="flex lg:flex-3 items-center justify-between text-slate-100">
          <a href="#" className="-m-1 p-1.5 mx-2 text-lg ">
            Đón tiếp khách
          </a>
          <a href="#" className="-m-1 p-1.5 mx-1">
              {" "}
              <i className="fa-solid fa-globe"></i>
            </a>
          <div className="login">
           

            <a href="/register" className="-m-1 p-1.5 mx-1">
              <i className="fa-solid fa-bars"></i>
            </a>
            <a href="/signin"><i className="fa-solid fa-user"></i></a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
