import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header";
import {
  NavLink,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import api from "../../utils/config";
import Footer from "../../Components/Footer";

/**
 * Nhớ thiệt kỹ trong đầu là không bao giờ được bất nhiều tab terminal
 * chỉ được bật 1 tab DUY NHẤT
 * cần import thư viện gì thì ứng dụng bằng ctrl C xong start lại
 */

const Home = () => {
  const searchRef = useRef();
  const [showTable, setShowTable] = useState(false);
  const [arrLocation, setArrLocation] = useState([]);
  const [findLocation, setFindLocation] = useState([]);
  const navigate = useNavigate();

  const getLocation = async () => {
    const dataLocation = await api.get("/vi-tri");
    setArrLocation(dataLocation.data.content);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setShowTable(false);
      setFindLocation([]);
    } else {
      // khi người dùng input vào, thì so sánh với từng location từ api xem có khớp không, nếu khớp thì trả về
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
      // nếu có location khớp thì render nó ra
      setShowTable(findLocationFilter.length > 0 ? true : false);
      setFindLocation([...findLocationFilter]);
    }
  };

  const handleSubmit = () => {
    if (findLocation.length > 0) {
      navigate(`search/${searchRef.current}`);
    } else {
      alert("Không tìm thấy vị trí phù hợp");
    }
  };

  return (
    <div>
      <div className="bg-black carousel">
        <Header />
        {/* carousel */}
        {/* E đi từ main ra là nó tới src */}
        <img className="image" src="./src/img/img1.jpg" alt="" />
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex place-content-center nav-search"
          >
            <div className="search  w-auto rounded-l-3xl pl-4">
              <span>Địa điểm: </span>
              <br />
              <input
                type="text"
                placeholder="Bạn sắp đi đâu?"
                onChange={handleInputChange}
              />
              {showTable && (
                <div className="bg-white mt-3 rounded-md p-2 w-auto">
                  <table>
                    <tbody>
                      {findLocation.map((location) => (
                        <tr key={location.id}>
                          <td>
                            <NavLink to={`/search/${location.tinhThanh}/${location.id}`}>
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
            <div className="search  w-52 h-16 pl-4">
              <span>Nhận phòng: </span>
              <br />
              <input type="tetxt" placeholder="Thêm ngày" />
            </div>
            <div className="search  w-52 pl-4">
              <span>Trả phòng: </span>
              <br />
              <input type="text" placeholder="Thêm ngày" />
            </div>
            <div className="search  w-52 pl-4">
              <span>Khách: </span>
              <br />
              <input type="text" placeholder="Thêm khách" />
            </div>
            <div className="bg-white pr-4 rounded-r-3xl pt-2">
              <button type="submit">
                <i className="fa fa-search icon_search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Kham pha */}
      <div>
        <h4 className="container text-2xl mt-2">
          Khám phá những điểm đến gần đây
        </h4>
        <div className="grid grid-cols-4 gap-4 container ">
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img2.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/im3.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img4.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/im5.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img6.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img7.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img8.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img className="img_kp" src="./src/img/img9.jpg" alt="" />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>{" "}
        </div>
      </div>

      {/*  */}
      <div>
        <h4 className="container text-2xl mt-2">Ở bất cứ đâu</h4>
        <div className="container grid grid-cols-4 gap-4">
          <div className="m-1">
            <img
              className="w-full h-80 rounded-xl"
              src="./src/img/p2.jpg"
              alt=""
            />
            <p className="font-semibold">Toàn bộ nhà</p>
          </div>
          <div className="m-1">
            <img
              className="w-full h-80 rounded-xl"
              src="./src/img/p1.jpg"
              alt=""
            />
            <p className="font-semibold">Toàn bộ nhà</p>
          </div>
          <div className="m-1">
            <img
              className="w-full h-80 rounded-xl"
              src="./src/img/p3.jpg"
              alt=""
            />
            <p className="font-semibold">Toàn bộ nhà</p>
          </div>
          <div className="m-1">
            <img
              className="w-full h-80 rounded-xl"
              src="./src/img/p4.jpg"
              alt=""
            />
            <p className="font-semibold">Toàn bộ nhà</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default Home;
