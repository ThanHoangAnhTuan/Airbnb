import { NavLink, Outlet } from "react-router-dom";

const Management = () => {
  return (
    <div className="flex">
      <div className="border-r h-screen w-1/4 flex flex-col">
        <h1 className="border-b flex items-center justify-end h-[60px] px-5">
          <span className="font-medium text-xl mr-3">Dashboard</span>
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
          <div>Admin</div>
          <div className="w-10 h-10 bg-gray-300 rounded-full mx-5">
            <img
              src=""
              alt=""
            />
          </div>
          <i className="fa-solid fa-caret-down text-3xl"></i>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Management;
