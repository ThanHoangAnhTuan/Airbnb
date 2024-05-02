import { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../utils/config";
import Footer from "../../Components/Footer";

const MobileHome = () => {
  const searchRef = useRef();
  const [showTable, setShowTable] = useState(false);
  const [arrLocation, setArrLocation] = useState([]);
  const [findLocation, setFindLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = async () => {
      const { data } = await api.get("/vi-tri");
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
      <h1>Mobile</h1>
      <div className="bg-black carousel">
        <Header />
        <img
          className="image"
          src="./src/img/img1.jpg"
          alt=""
        />
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex place-content-center nav-search">
            <div className="search !w-36 rounded-l-3xl">
              <span>Địa điểm: </span>
              <br />
              <input
                type="text"
                placeholder="Bạn sắp đi đâu?"
                onChange={handleInputChange}
              />
              {showTable && (
                <div className="bg-white mt-3 rounded-md p-2 w-60">
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
            <div className="search !w-36 pl-4">
              <span>Nhận phòng: </span>
              <br />
              <input
                type="tetxt"
                placeholder="Thêm ngày"
              />
            </div>
            <div className="search !w-36 pl-4">
              <span>Trả phòng: </span>
              <br />
              <input
                type="text"
                placeholder="Thêm ngày"
              />
            </div>
            <div className="search !w-36 pl-4">
              <span>Khách: </span>
              <br />
              <input
                type="text"
                placeholder="Thêm khách"
              />
            </div>
            <div className="bg-white pr-4 rounded-r-3xl pt-2">
              <button type="submit">
                <i className="fa fa-search icon_search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h4 className="container text-2xl mt-2">
          Khám phá những điểm đến gần đây
        </h4>
        <div className="grid grid-cols-3 gap-4 container ">
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img2.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/im3.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img4.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/im5.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img6.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img7.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img8.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>
          <div className="inline-flex m-2">
            <img
              className="img_kp"
              src="./src/img/img9.jpg"
              alt=""
            />
            <div className="ml-2 mt-3">
              <p className="font-semibold">Thành phố Hồ Chí Minh</p>
              <span>15 phút lái xe</span>
            </div>
          </div>{" "}
        </div>
      </div>
      <div>
        <h4 className="container text-2xl mt-2">Ở bất cứ đâu</h4>
        <div className="container grid grid-cols-2 gap-4">
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
      <Footer />
    </div>
  );
};
export default MobileHome;
