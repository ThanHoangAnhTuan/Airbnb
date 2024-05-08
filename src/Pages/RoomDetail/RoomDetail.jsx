import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getCommentListByRoomIdApi,
  getPositionByIdApi,
  getRoomDetailByIdApi,
  postBookRoomApi,
  postCommentByRoomIdApi,
} from "../../Redux/RoomDetail/RoomDetail";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Calendar } from "primereact/calendar";
import "./RoomDetail.css";
import { Toast } from "primereact/toast";

const RoomDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { roomDetailById, positionById, commentList } = useSelector(
    (state) => state.RoomDetail
  );
  const {
    banLa,
    banUi,
    bep,
    dieuHoa,
    doXe,
    giaTien,
    giuong,
    hinhAnh,
    hoBoi,
    khach,
    mayGiat,
    moTa,
    phongNgu,
    phongTam,
    tenPhong,
    tivi,
    wifi,
  } = roomDetailById;

  const { tenViTri, tinhThanh, quocGia } = positionById;
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [babiesCount, setBabiesCount] = useState(0);
  const customerCount = adultCount + childrenCount + babiesCount;
  const dateCount =
    maxDate?.getDate() - minDate?.getDate()
      ? maxDate.getDate() - minDate.getDate()
      : 1;

  const fee = 331;
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const bookRoomRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("user_id");
  const isLogin = token ? true : false;
  let decoded;
  if (token) {
    decoded = JSON.parse(atob(token.split(".")[1]));
  }

  useEffect(() => {
    dispatch(getRoomDetailByIdApi(params.id));
    dispatch(getCommentListByRoomIdApi(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (Object.getOwnPropertyNames(roomDetailById).length !== 0) {
      dispatch(getPositionByIdApi(roomDetailById.maViTri));
    }
  }, [dispatch, roomDetailById]);

  const handleSubmitSendComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user_id");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      await dispatch(
        postCommentByRoomIdApi({
          maPhong: params.id,
          maNguoiBinhLuan: decoded.id,
          noiDung: comment,
          ngayBinhLuan: new Date(),
          saoBinhLuan: 4,
        })
      );
      await dispatch(getCommentListByRoomIdApi(params.id));
      setComment("");
    } else {
      navigate("/signin");
    }
  };

  const handleSubmitBookRoom = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user_id");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const result = await dispatch(
        postBookRoomApi({
          maPhong: params.id,
          ngayDen: minDate,
          ngayDi: maxDate,
          soLuongKhach: customerCount,
          maNguoiDung: decoded.id,
        })
      );
      if (
        result?.data.statusCode === 201 &&
        result?.data.message === "Thêm mới thành công!"
      ) {
        bookRoomRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Booked room successfully",
        });
      } else {
        bookRoomRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Booked room unsuccessfully",
        });
      }
    } else {
      navigate("/signin");
    }
  };

  const convertDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PrimeReactProvider>
      <header className="px-20">
        <nav className="flex items-center justify-between pt-5 px-10 pb-10">
          <div className="flex">
            <NavLink
              to="/"
              className="text-4xl text-pink-500">
              <i className="fa-brands fa-airbnb"></i>
              <span> airbnb</span>
            </NavLink>
          </div>
          <div className="flex items-center text-black ">
            <NavLink className="mx-5 text-lg">Nơi ở</NavLink>
            <NavLink className="mx-5 text-lg">Trải nghiệm</NavLink>
            <NavLink className="mx-5 text-lg">Trải nghiệm trực tuyến</NavLink>
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
                  <NavLink
                    to={`/management/user`}
                    className={"px-5 py-3 hover:bg-gray-300"}>
                    Quản lý
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="px-40">
        <div className="flex justify-between py-6 items-center">
          <div className="text-[#222] text-2xl font-bold">{tenPhong}</div>
          <div className="flex items-center">
            <div className="mr-5 hover:bg-gray-100 transition-all px-2 py-1 rounded-md">
              <button
                type="button"
                className="underline font-medium">
                <i className="fa-solid fa-arrow-up-from-bracket mr-3"></i>
                Chia sẻ
              </button>
            </div>
            <div className="hover:bg-gray-100 transition-all px-2 py-1 rounded-md">
              <button
                type="button"
                className="underline font-medium">
                <i className="fa-regular fa-heart mr-3"></i>
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            className="rounded-xl"
            src={hinhAnh}
            alt="Mo ta phong"
          />
        </div>
        <div className="flex">
          <div className="w-3/5">
            <div className="py-8">
              <div className="text-[#222] text-2xl font-medium">
                Toàn bộ căn hộ cho thuê tại {tenViTri}, {tinhThanh}, {quocGia}
              </div>
              <div>
                <ul className="flex">
                  <li>{khach} khách</li>
                  <li>
                    <span className="m-2">-</span>
                    {phongNgu} phòng ngủ
                  </li>
                  <li>
                    <span className="m-2">-</span>
                    {giuong} giường
                  </li>
                  <li>
                    <span className="m-2">-</span>
                    {phongTam} phòng tắm
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-8 border-t">
              {String(moTa)
                .split(".\r\n")
                .map((item, index) => {
                  const subMoTa = item.split("\r\n");
                  let image;
                  if (subMoTa[0].includes("Tự nhận phòng")) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z" />
                      </svg>
                    );
                  } else if (
                    subMoTa[0].includes("Không gian riêng để làm việc")
                  ) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z" />
                      </svg>
                    );
                  } else if (subMoTa[0].includes("là Chủ nhà siêu cấp")) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z" />
                      </svg>
                    );
                  } else if (
                    subMoTa[0].includes("Trải nghiệm nhận phòng tuyệt vời")
                  ) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
                      </svg>
                    );
                  } else if (subMoTa[0].includes("Hủy miễn phí trước")) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z" />
                      </svg>
                    );
                  } else if (subMoTa[0].includes("Địa điểm tuyệt vời")) {
                    image = (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                      </svg>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className="flex items-center">
                      {image && (
                        <>
                          <div className="mr-5">{image}</div>
                          <div className="mb-5">
                            <div className="font-bold">{subMoTa[0]}</div>
                            <div>{subMoTa[1]}</div>
                          </div>
                        </>
                      )}
                      {!image && (
                        <div className="whitespace-pre-wrap">
                          <div>{item}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="py-8 border-t">
              <div className="font-medium text-2xl mb-5">
                Nơi này có những gì cho bạn
              </div>
              <div className="flex flex-wrap items-center">
                {banLa && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z" />
                      </svg>
                    </div>
                    <div className="ml-5">Bàn là</div>
                  </div>
                )}
                {banUi && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z" />
                      </svg>
                    </div>
                    <div className="ml-5">Bàn ủi</div>
                  </div>
                )}
                {bep && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />
                      </svg>
                    </div>
                    <div className="ml-5">Bếp</div>
                  </div>
                )}
                {dieuHoa && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z" />
                      </svg>
                    </div>
                    <div className="ml-5">Bếp</div>
                  </div>
                )}
                {doXe && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />
                      </svg>
                    </div>
                    <div className="ml-5">Bãi đỗ xe</div>
                  </div>
                )}
                {hoBoi && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z"></path>
                      </svg>
                    </div>
                    <div className="ml-5">Bể bơi</div>
                  </div>
                )}
                {mayGiat && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M26.29 2a3 3 0 0 1 2.96 2.58c.5 3.56.75 7.37.75 11.42s-.25 7.86-.75 11.42a3 3 0 0 1-2.79 2.57l-.17.01H5.7a3 3 0 0 1-2.96-2.58C2.25 23.86 2 20.05 2 16s.25-7.86.75-11.42a3 3 0 0 1 2.79-2.57L5.7 2zm0 2H5.72a1 1 0 0 0-1 .86A80.6 80.6 0 0 0 4 16c0 3.96.24 7.67.73 11.14a1 1 0 0 0 .87.85l.11.01h20.57a1 1 0 0 0 1-.86c.48-3.47.72-7.18.72-11.14 0-3.96-.24-7.67-.73-11.14A1 1 0 0 0 26.3 4zM16 7a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-5.84 7.5c-.34 0-.68.02-1.02.07a7 7 0 0 0 13.1 4.58 9.09 9.09 0 0 1-6.9-2.37l-.23-.23a6.97 6.97 0 0 0-4.95-2.05zM16 9a7 7 0 0 0-6.07 3.5h.23c2.26 0 4.44.84 6.12 2.4l.24.24a6.98 6.98 0 0 0 6.4 1.9A7 7 0 0 0 16 9zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                      </svg>
                    </div>
                    <div className="ml-5">Máy giặt</div>
                  </div>
                )}
                {tivi && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z"></path>
                      </svg>
                    </div>
                    <div className="ml-5">Tivi</div>
                  </div>
                )}
                {wifi && (
                  <div className="flex w-1/2 mb-5 items-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        className="block h-6 w-6 fill-current">
                        <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                      </svg>
                    </div>
                    <div className="ml-5">Wifi</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-2/5 ml-32">
            <div className="border p-3 mt-10">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-2xl">${giaTien}</span> / đêm
                </div>
                <div>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  4,83 (18 đánh giá)
                </div>
              </div>
              <div>
                <form>
                  <div className="flex gap-5">
                    <div>
                      <label htmlFor="">Nhận phòng</label>
                      <Calendar
                        value={minDate}
                        onChange={(e) => setMinDate(e.value)}
                        dateFormat="dd/mm/yy"
                        minDate={minDate}
                        maxDate={maxDate}
                        readOnlyInput
                        showButtonBar
                      />
                    </div>
                    <div>
                      <label htmlFor="">Trả phòng</label>
                      <Calendar
                        value={maxDate}
                        onChange={(e) => setMaxDate(e.value)}
                        dateFormat="dd/mm/yy"
                        minDate={minDate}
                        maxDate={maxDate}
                        readOnlyInput
                        showButtonBar
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleModal}
                      className="border w-full flex items-center justify-between p-3 focus:border-gray-950">
                      <span>{customerCount} khách</span>
                      <span>
                        <i className="fa-solid fa-chevron-down"></i>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border shadow-lg absolute left-0 right-0 top-full z-10 bg-white">
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <div>Người lớn</div>
                            <div>Từ 13 tuổi trở lên</div>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => setAdultCount(adultCount - 1)}
                              disabled={adultCount === 1}
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all disabled:hover:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-300">
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="mx-5">{adultCount}</span>
                            <button
                              type="button"
                              onClick={() => setAdultCount(adultCount + 1)}
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <div>Trẻ em</div>
                            <div>Độ tuổi 2 - 12</div>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                setChildrenCount(childrenCount - 1)
                              }
                              disabled={childrenCount === 0}
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all disabled:hover:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-300">
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="mx-5">{childrenCount}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setChildrenCount(childrenCount + 1)
                              }
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <div>Em bé</div>
                            <div>Dưới 2 tuổi</div>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => setBabiesCount(babiesCount - 1)}
                              disabled={babiesCount === 0}
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all disabled:hover:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-300">
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="mx-5">{babiesCount}</span>
                            <button
                              type="button"
                              onClick={() => setBabiesCount(babiesCount + 1)}
                              className="border h-8 w-8 rounded-full border-gray-300 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleSubmitBookRoom}
                      className="bg-pink-600 text-white w-full mt-5 p-3 font-bold rounded-lg">
                      Đặt phòng
                    </button>
                  </div>
                  <Toast ref={bookRoomRef} />
                </form>
                <div className="text-center mt-5">Bạn vẫn chưa bị trừ tiền</div>
                <div className="flex items-center justify-between mt-5">
                  <div className="underline">
                    ${giaTien} x {dateCount} đêm
                  </div>
                  <div>${giaTien * dateCount}</div>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="underline">Phí dịch vụ Airbnb</div>
                  <div>${fee}</div>
                </div>
                <div className="border-t mt-5 flex items-center justify-between pt-5 font-bold">
                  <div>Tổng trước thuế</div>
                  <div>${giaTien * dateCount + fee}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="py-8 border-t flex flex-wrap justify-between">
            {commentList.map((comment, index) => {
              if (index < 6) {
                return (
                  <div
                    key={index}
                    className="w-[45%] mb-10">
                    <div className="flex items-center mb-2">
                      <img
                        className="w-10 h-10 rounded-full mr-5"
                        src={comment.avatar}
                        alt="avatar"
                      />
                      <div>
                        <div>{comment.tenNguoiBinhLuan}</div>
                        <div>{convertDate(comment.ngayBinhLuan)}</div>
                      </div>
                    </div>
                    <div>{comment.noiDung}</div>
                  </div>
                );
              }
            })}
          </div>
          <form onSubmit={handleSubmitSendComment}>
            <Toast ref={commentRef} />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-5 w-full outline-none"
              name=""
              id=""
              rows={5}></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-md">
              Add comment
            </button>
          </form>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default RoomDetail;
