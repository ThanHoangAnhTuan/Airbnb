import { useEffect, useState } from "react";
import api from "../../utils/config";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TabletRoomList = () => {
  const { cityName } = useParams();
  const [arrListRoom, setArrListRoom] = useState([]);
  const [sortOrder, setSortOrder] = useState(true); // true: asc, false: desc
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    const getApiListRoom = async () => {
      try {
        const { data } = await api.get("/vi-tri");
        const filterLocation = data.content.filter((item) => {
          if (
            item.tenViTri
              .toLowerCase()
              .includes(cityName.trim().toLowerCase()) ||
            item.tinhThanh
              .toLowerCase()
              .includes(cityName.trim().toLowerCase()) ||
            item.quocGia.toLowerCase().includes(cityName.trim().toLowerCase())
          ) {
            return item;
          }
        });
        const requests = filterLocation.map((location) =>
          api.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${location.id}`)
        );
        Promise.all(requests).then((responses) => {
          let result = [];
          responses.forEach((response) => {
            result = result.concat(response.data.content);
          });
          setArrListRoom(result);
        });
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    getApiListRoom();
  }, [cityName]);

  useEffect(() => {
    let sortRooms = [...arrListRoom];
    sortRooms.sort((a, b) =>
      sortOrder ? a.giaTien - b.giaTien : b.giaTien - a.giaTien
    );
    setArrListRoom(sortRooms);
  }, [sortOrder]);

  return (
    <div>
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
            <NavLink className="text-base">Đón tiếp khách</NavLink>
            <NavLink className="mx-5">
              {" "}
              <i className="fa-solid fa-globe"></i>
            </NavLink>
            <div
              className="relative cursor-pointer flex items-center justify-around w-20 h-10 bg-gray-300 rounded-xl"
              onClick={() => setIsOpen(!isOpen)}>
              {!isLogin && <i className="fa-solid fa-bars"></i>}
              <i className="fa-solid fa-user"></i>
              {isOpen && (
                <div className="flex transition-all flex-col w-40 absolute right-0 top-full bg-white text-black shadow-[0_3px_18px_rgba(0,0,0,0.3)]">
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
                      {
                        decoded?.role === "ADMIN" && (
                          <NavLink
                            to={`/management/user`}
                            className={"px-5 py-3 hover:bg-gray-300"}>
                            Quản lý
                          </NavLink>
                        )
                      }
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="flex gap-x-5">
        <div className="w-full m-4 mt-9">
          <p className="p_list text-sm">Hơn 350 chỗ ở 16 thg 4 - 14 thg 6</p>
          <h3 className="text-2xl font-medium">Chỗ ở tại khu vực đã chọn</h3>
          <div className="my-3">
            <button className="btn mr-5 bt_list text-sm">Loại nơi ở</button>
            <button
              className="btn mr-5 bt_list"
              onClick={() => setSortOrder(!sortOrder)}>
              Giá
            </button>
            <button className="btn mr-5 bt_list text-sm">Đặt ngay</button>
            <button className="btn mr-5 bt_list text-sm">Phòng và phòng ngủ</button>
            <button className="btn mr-5 bt_list text-sm">Bộ lọc khác</button>
          </div>
          {arrListRoom.map((room) => {
            return (
              <NavLink
                key={room.id}
                to={`/detail/${room.id}`}
                className="block py-4 border-t cursor-pointer">
                <div className="flex gap-x-5">
                  <div className="w-2/5">
                    <img
                      className="h-56 object-cover"
                      src={room.hinhAnh}
                      alt="hinh anh phong"
                    />
                  </div>
                  <div className="w-3/5 relative">
                    <h2 className="opacity-70 text-sm">{room.tenPhong}</h2>
                    <h2 className="text-xl font-medium">
                      {room.moTa.length > 70
                        ? room.moTa.slice(0, 70) + "..."
                        : room.moTa}
                    </h2>
                    <h1>
                      {room.khach} khách - {room.giuong} giường -{" "}
                      {room.phongNgu} phòng ngủ - {room.phongTam} phòng tắm
                    </h1>
                    <h2 className="absolute text-right text-base font-bold text bottom-0 right-0">
                      ${room.giaTien}/Tháng
                    </h2>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
        {/* <div className="w-2/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.765283363988!2d106.67772000445909!3d10.775218526262998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1714403318166!5m2!1svi!2s"
            className="h-screen w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div> */}
      </div>
      <div className="px-20 mt-10 bg-slate-100">
        <div className="p-5 grid grid-cols-2 gap-2">
          <div className="">
            <h2 className="font-semibold uppercase text-sm">Giới thiệu</h2>
            <div className="flex-col text-xs">
              <p className="mt-2">Phương thức hoạt động của Airbnb</p>
              <p className="mt-2">Trang tin tức</p>
              <p className="mt-2">Nhà đầu tư</p>
              <p className="mt-2">Airbnb Plus</p>
              <p className="mt-2">Airbnb Luxe</p>
              <p className="mt-2">Hotel Tonight</p>
              <p className="mt-2">Airban for Work</p>
              <p className="mt-2">Nhờ Host mọi thứ đều có thể</p>
              <p className="mt-2">Cơ hội nghề nghiệp</p>
              <p className="mt-2">Thư của nhà sáng lập</p>
            </div>
          </div>
          <div className="">
            <h2 className="font-semibold uppercase text-sm">Cộng đồng</h2>
            <div className="flex-col text-xs">
              <p className="mt-2">Sự đa dạn và cảm giác thân thuộc</p>
              <p className="mt-2">Tiện nghi phù hợp cho người khuyết tật</p>
              <p className="mt-2">Đối tác liên kết Airbnb</p>
              <p className="mt-2">Chỗ ở cho tuyến đầu</p>
              <p className="mt-2">Lượt giới thiệu của khách</p>
              <p className="mt-2">Airbnb.org</p>
            </div>
          </div>
          <div className="">
            <h2 className="font-semibold uppercase text-sm">Đón tiếp khách</h2>
            <div className="flex-col text-xs">
              <p className="mt-2">Cho thuê nhà</p>
              <p className="mt-2">Tổ chức Trải nghiệm trực tuyến</p>
              <p className="mt-2">Tổ chức Trải nghiệm</p>
              <p className="mt-2">Đón tiếp khách có trách nhiệm</p>
              <p className="mt-2">Trung tâm tài nguyên</p>
              <p className="mt-2">Trung tâm cộng đồng</p>
            </div>
          </div>
          <div className="">
            <h2 className="font-semibold uppercase text-sm">Hỗ trợ</h2>
            <div className="flex-col text-xs">
              <p className="mt-2">
                Biện pháp đối phó với đại dịch COVID-19 của chúng tôi
              </p>
              <p className="mt-2">Trung tâm trợ giúp</p>
              <p className="mt-2">Các tùy chọn hủy</p>
              <p className="mt-2">Hỗ trợ khu dân cư</p>
              <p className="mt-2">Tin cậy và an toàn</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex">
          <p className="text-xs basis-3/4">
            © 2021 Airbnb, Inc. All rights reserved - Quyền riêng tư - Điều
            khoản - Sơ đồ trang web
          </p>
          <div className="basis-1/4 text-end">
            <i className="fa-brands fa-facebook mr-3"></i>
            <i className="fa-brands fa-twitter mr-3"></i>
            <i className="fa-brands fa-instagram mr-3"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletRoomList;
