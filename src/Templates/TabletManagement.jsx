import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const TabletManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = JSON.parse(atob(token?.split(".")[1]));
  }
  const navigate = useNavigate();

  return (
    <div>
      <div className="border-b h-[60px] px-5 flex items-center justify-between">
        <NavLink
          to={"/"}
          className={"font-medium text-xl mr-3"}>
          Dashboard
        </NavLink>
        <ul className="flex">
          <li className="hover:bg-gray-300 transition-all cursor-pointer underline px-5 py-3">
            <NavLink
              to={"user"}>
              Người dùng
            </NavLink>
          </li>
          <li className="hover:bg-gray-300 transition-all cursor-pointer underline px-5 py-3">
            <NavLink
              to={"location"}>
              Vị trí
            </NavLink>
          </li>
          <li className="hover:bg-gray-300 transition-all cursor-pointer underline px-5 py-3">
            <NavLink
              to={"room"}>
              Phòng
            </NavLink>
          </li>
          <li className="hover:bg-gray-300 transition-all cursor-pointer underline px-5 py-3">
            <NavLink
              to={"bookroom"}>
              Đặt phòng
            </NavLink>
          </li>
        </ul><div
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
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default TabletManagement;
