import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Management = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = JSON.parse(atob(token?.split(".")[1]));
  }
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="border-r h-screen w-1/4 flex flex-col">
        <h1 className="border-b flex items-center justify-end h-[60px] px-5">
          <NavLink
            to={"/"}
            className={"font-medium text-xl mr-3"}>
            Dashboard
          </NavLink>
          <i className="fa-solid fa-bars cursor-pointer text-2xl"></i>
        </h1>
        <div className="flex-1 py-5">
          <ul>
            <li className="hover:bg-gray-300 transition-all cursor-pointer underline">
              <NavLink
                className={"pl-10 w-full py-3 block"}
                to={"user"}>
                Quản lý người dùng
              </NavLink>
            </li>
            <li className="hover:bg-gray-300 transition-all cursor-pointer underline">
              <NavLink
                className={"pl-10 w-full py-3 block"}
                to={"location"}>
                Quản lý thông tin vị trí
              </NavLink>
            </li>
            <li className="hover:bg-gray-300 transition-all cursor-pointer underline">
              <NavLink
                className={"pl-10 w-full py-3 block"}
                to={"room"}>
                Quản lý thông tin phòng
              </NavLink>
            </li>
            <li className="hover:bg-gray-300 transition-all cursor-pointer underline">
              <NavLink
                className={"pl-10 w-full py-3 block"}
                to={"bookroom"}>
                Quản lý đặt phòng
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <div className="h-[60px] border-b flex items-center justify-end pr-20">
          <div
            className="relative cursor-pointer flex items-center justify-around w-20 h-12 bg-gray-300 rounded-xl "
            onClick={() => setIsOpen(!isOpen)}>
            {!isLogin && <i className="fa-solid fa-bars"></i>}
            <i className="fa-solid fa-user"></i>
            {isOpen && (
              <div className="flex transition-all flex-col w-40 absolute right-0 top-full bg-white text-black shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
                {!isLogin && (
                  <>
                    <NavLink
                      to="/register"
                      className={"px-5 py-3 hover:bg-gray-300"}>
                      Đăng ký
                    </NavLink>
                    <NavLink
                      to="/signin"
                      className={"px-5 py-3 hover:bg-gray-300"}>
                      Đăng nhập
                    </NavLink>
                  </>
                )}
                {isLogin && (
                  <>
                    <button
                      className="px-5 py-3 hover:bg-gray-300 text-left"
                      onClick={() => {
                        localStorage.removeItem("user_id");
                        navigate("/");
                      }}>
                      Đăng xuất
                    </button>
                    <NavLink
                      to={`/userinfo/${decoded.id}`}
                      className={"px-5 py-3 hover:bg-gray-300"}>
                      Tài khoản
                    </NavLink>
                  </>
                )}
                <NavLink
                  to={`/management/user`}
                  className={"px-5 py-3 hover:bg-gray-300"}>
                  Quản lý
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Management;
