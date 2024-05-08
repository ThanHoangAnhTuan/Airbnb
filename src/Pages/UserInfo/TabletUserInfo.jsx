import { useDispatch, useSelector } from "react-redux";
import {
  getBookedRoomByUserIdApi,
  getRoomDetailListApi,
  getUserByIdApi,
  putUserByIdApi,
} from "../../Redux/UserInfo/UserInfo";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";

const TabletUserInfo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const toast = useRef(null);
  const [open, setOpen] = useState(false);
  const { userInfo, bookedRoom, bookedRoomDetail } = useSelector(
    (state) => state.UserInfo
  );
  const [userInfoUpdate, setUserInfoUpdate] = useState({
    avatar: "",
    birthday: "",
    email: "",
    gender: true,
    id: 0,
    name: "",
    password: "",
    phone: "",
    role: "",
  });
  const { avatar, name } = userInfo;
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = JSON.parse(atob(token?.split(".")[1]));
  }
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByIdApi(params.userId));
    dispatch(getBookedRoomByUserIdApi(params.userId));
  }, [dispatch, params.userId]);

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      let birdthDayUpdate = new Date(userInfo.birthday);
      if (birdthDayUpdate.toString() === "Invalid Date") {
        const [day, month, year] = userInfo.birthday.split("/"); // Chia chuỗi ngày thành ngày, tháng, năm
        const formattedDate = new Date(year, month - 1, day); // Tạo đối tượng Date mới
        birdthDayUpdate = formattedDate.toString();
      } else {
        birdthDayUpdate = userInfo.birthday;
      }
      setUserInfoUpdate({
        avatar: userInfo.avatar,
        birthday: birdthDayUpdate,
        email: userInfo.email,
        gender: userInfo.gender,
        id: userInfo.id,
        name: userInfo.name,
        password: userInfo.password,
        phone: userInfo.phone,
        role: userInfo.role,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (Object.keys(bookedRoom).length !== 0) {
      const arrayBookedRoomId = bookedRoom.map((item) => item.maPhong);
      dispatch(getRoomDetailListApi(arrayBookedRoomId));
    }
  }, [dispatch, bookedRoom]);

  const handleOk = async () => {
    const result = await dispatch(putUserByIdApi(userInfoUpdate));
    if (result.response?.status === 403) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.response.data.content,
      });
      setOpen(true);
    } else {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Chỉnh sửa thành công",
      });
      dispatch(getUserByIdApi(params.userId));
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  function handleChange(e) {
    if (e.target.name === "gender") {
      const setGender = e.target.value === "nam" ? true : false;
      setUserInfoUpdate({
        ...userInfoUpdate,
        [e.target.name]: setGender,
      });
    } else {
      setUserInfoUpdate({
        ...userInfoUpdate,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <PrimeReactProvider>
      <header>
        <nav className="flex items-center justify-between pt-5 px-10 pb-10">
          <div className="flex">
            <NavLink
              to="/"
              className="text-4xl text-pink-500">
              <i className="fa-brands fa-airbnb"></i>
              <span> airbnb</span>
            </NavLink>
          </div>
          <div className="flex items-center justify-between text-black">
            <NavLink className="text-lg">Đón tiếp khách</NavLink>
            <NavLink className="mx-5">
              {" "}
              <i className="fa-solid fa-globe"></i>
            </NavLink>
            <div
              className="relative cursor-pointer flex items-center justify-around w-20 h-12 bg-gray-300 rounded-xl"
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
        </nav>
      </header>
      <div className="flex gap-10 px-10 py-10">
        <div className="w-1/3 border p-5 h-fit">
          <div className="flex flex-col items-center">
            <img
              className="h-28 w-28 rounded-full"
              src={avatar}
              alt="avatar"
            />
            <div className="underline">Cập nhật ảnh</div>
          </div>
          <div>
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div className="font-bold">Xác minh danh tính</div>
          <div className="my-3">
            Xác thực danh tính của bạn với huy hiệu xác minh danh tính
          </div>
          <button className="border px-7 py-3 rounded-lg border-black">
            Nhận huy hiệu
          </button>
          <div className="font-bold py-5 border-t mt-5">{name} đã xác nhận</div>
          <div>
            <i className="fa-solid fa-check mr-3"></i>
            Địa chỉ email
          </div>
        </div>
        <div className="w-2/3">
          <h1 className="font-bold text-3xl">Xin chào, tôi là {name}</h1>
          <p className="text-gray-400 my-3">Bắt đầu tham gia 2021</p>
          <button
            className="underline"
            onClick={showModal}>
            Chỉnh sửa hồ sơ
          </button>
          <Modal
            title="Chỉnh sửa thông tin người dùng"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}>
            <div className="flex flex-row items-center justify-between mb-3">
              <label htmlFor="name">Name</label>
              <input
                value={userInfoUpdate.name}
                name="name"
                type="text"
                className="ml-5 border outline-none w-[380px] p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-row items-center justify-between mb-3">
              <label htmlFor="email">Email</label>
              <input
                value={userInfoUpdate.email}
                name="email"
                type="text"
                className="ml-5 border outline-none w-[380px] p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-row items-center justify-between mb-3">
              <label htmlFor="birthday">Birth day</label>
              <Calendar
                value={new Date(userInfoUpdate.birthday)}
                name="birthday"
                className="w-[380px]"
                onChange={(e) => handleChange(e)}
                dateFormat="dd/mm/yy"
              />
            </div>
            <div className="flex flex-row items-center justify-between mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                value={userInfoUpdate.phone}
                name="phone"
                type="text"
                className="ml-5 border outline-none w-[380px] p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-row items-center justify-between mb-3">
              <div>Gender</div>
              <div className="flex items-center w-[380px]">
                <div className="flex items-center mr-10">
                  <label
                    className="mr-3"
                    htmlFor="nam">
                    Nam
                  </label>
                  <input
                    value="nam"
                    id="nam"
                    checked={userInfoUpdate.gender}
                    name="gender"
                    type="radio"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex items-center mr-10">
                  <label
                    className="mr-3"
                    htmlFor="nu">
                    Nữ
                  </label>
                  <input
                    value="nu"
                    id="nu"
                    checked={!userInfoUpdate.gender}
                    name="gender"
                    type="radio"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mb-3">
              <label htmlFor="role">Choose a role</label>
              <select
                name="role"
                className="w-[380px] outline-none border p-3"
                defaultValue={userInfoUpdate.role}
                onChange={(e) => handleChange(e)}
                id="role">
                <option value="ADMIN">Amin</option>
                <option value="USER">User</option>
              </select>
            </div>
          </Modal>
          <Toast ref={toast} />
          <h1 className="mt-5 text-2xl font-bold">Phòng đã thuê</h1>
          <div>
            {bookedRoomDetail.map((room) => {
              return (
                <div
                  key={uuidv4()}
                  className="w-full flex mb-5">
                  <div className="w-2/5 mr-5">
                    <img
                      className="rounded-md h-[150px] object-cover"
                      src={room.hinhAnh}
                      alt="mo ta"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-3/5">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h1 className="text-xl font-medium">{room.tenPhong}</h1>
                        <p>
                          {room.khach} khách - {room.phongTam} phòng tắm -{" "}
                          {room.phongNgu} phòng ngủ
                        </p>
                        <p>
                          {room.wifi ? "Wifi" : ""} - {room.bep ? "Bếp" : ""} -{" "}
                          {room.dieuHoa ? "Điều hoà" : ""} -{" "}
                          {room.mayGiat ? "Máy giặt" : ""}
                        </p>
                      </div>{" "}
                      <div className="relative right-0">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">${room.giaTien}</span> / đêm
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default TabletUserInfo;
