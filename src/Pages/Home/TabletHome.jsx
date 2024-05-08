import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../utils/config";

const TabletHome = () => {
  const searchRef = useRef();
  const [showTable, setShowTable] = useState(false);
  const [arrLocation, setArrLocation] = useState([]);
  const [findLocation, setFindLocation] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = JSON.parse(atob(token?.split(".")[1]));
  }
  const navigate = useNavigate();
  const [nearbyLocation, setNearbyLocation] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      const { data } = await api.get("/vi-tri");
      const result = await api.get(
        "/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=10"
      );
      setNearbyLocation(result.data.content.data);
      setArrLocation(data.content);
    };
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setShowTable(false);
      setFindLocation([]);
    } else {
      const findLocationFilter = arrLocation.filter((location) => {
        if (
          location.tenViTri
            .toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          location.tinhThanh
            .toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          location.quocGia.toLowerCase().includes(value.trim().toLowerCase())
        ) {
          return location;
        }
      });
      searchRef.current = value.trim();
      setShowTable(findLocationFilter.length > 0 ? true : false);
      setFindLocation([...findLocationFilter]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (findLocation.length > 0) {
      navigate(`search/${searchRef.current}`);
    } else {
      alert("Không tìm thấy vị trí phù hợp");
    }
  };

  return (
    <div>
      <div className="bg-black h-screen px-10 relative">
        <header className="pb-12">
          <nav className="flex items-center justify-between pt-5 px-10">
            <div className="flex">
              <NavLink
                to=""
                className="text-4xl text-pink-500">
                <i className="fa-brands fa-airbnb"></i>
              </NavLink>
            </div>
            <div className="flex items-center justify-between text-white">
              <NavLink className="text-base">Đón tiếp khách</NavLink>
              <NavLink className="mx-5">
                {" "}
                <i className="fa-solid fa-globe"></i>
              </NavLink>
              <div
                className="relative cursor-pointer flex items-center justify-around w-20 h-10 bg-gray-400 rounded-xl z-20"
                onClick={() => setIsOpen(!isOpen)}>
                {!isLogin && <i className="fa-solid fa-bars"></i>}
                <i className="fa-solid fa-user"></i>
                {isOpen && (
                  <div className="flex transition-all flex-col w-40 absolute right-0 top-full bg-white text-black">
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
          <div className="text-white flex justify-center">
            <NavLink className="mx-5 text-base">Nơi ở</NavLink>
            <NavLink className="mx-5 text-base">Trải nghiệm</NavLink>
            <NavLink className="mx-5 text-base">Trải nghiệm trực tuyến</NavLink>
          </div>
        </header>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex place-content-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white w-40 h-16 pl-4 pt-1 rounded-l-3xl">
            <span>Địa điểm: </span>
            <br />
            <input
              className="focus:outline-none w-32"
              type="text"
              placeholder="Bạn sắp đi đâu?"
              onChange={handleInputChange}
            />
            {showTable && (
              <div className="bg-white rounded-md p-2 w-max">
                <table>
                  <tbody>
                    {findLocation.map((location) => (
                      <tr key={location.id}>
                        <td>
                          <NavLink to={`/search/${location.tinhThanh}`}>
                            {location.tenViTri}, {location.tinhThanh},{" "}
                            {location.quocGia}
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="bg-white w-40 h-16 pl-4 pt-1">
            <span>Nhận phòng: </span>
            <br />
            <input
              className="focus:outline-none w-32"
              type="tetxt"
              placeholder="Thêm ngày"
            />
          </div>
          <div className="bg-white w-40 h-16 pl-4 pt-1">
            <span>Trả phòng: </span>
            <br />
            <input
              className="focus:outline-none w-32"
              type="text"
              placeholder="Thêm ngày"
            />
          </div>
          <div className="bg-white w-40 h-16 pl-4 pt-1">
            <span>Khách: </span>
            <br />
            <input
              className="focus:outline-none w-32 "
              type="text"
              placeholder="Thêm khách"
            />
          </div>
          <div className="bg-white pr-4 rounded-r-3xl pt-2">
            <button type="submit">
              <i className="fa fa-search icon_search w-10 h-10 bg-[#ff385c] p-3 rounded-3xl text-white"></i>
            </button>
          </div>
        </form>
        <img
          className="w-full h-[75%] object-cover"
          src="./img/daLat.jpg"
          alt=""
        />
      </div>
      <div className="px-20 mt-10">
        <h4 className="text-2xl mb-5">Khám phá những điểm đến gần đây</h4>
        <div className="grid grid-cols-3 gap-3">
          {nearbyLocation.map((location, index) => (
            <div
              className="inline-flex"
              key={index}>
              <img
                className="w-20 h-20 rounded-xl"
                src={location.hinhAnh}
                alt=""
              />
              <div className="ml-2 mt-3">
                <p className="font-semibold">{location.tinhThanh}</p>
                <span>15 phút lái xe</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-20 mt-10">
        <h4 className="text-2xl mb-5">Ở bất cứ đâu</h4>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              className="m-1"
              key={index}>
              <img
                className="w-full h-80 rounded-xl border"
                src={`./img/p${index + 1}.jpg`}
                alt=""
              />
              <p className="font-semibold mt-3">Toàn bộ nhà</p>
            </div>
          ))}
        </div>
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
export default TabletHome;
