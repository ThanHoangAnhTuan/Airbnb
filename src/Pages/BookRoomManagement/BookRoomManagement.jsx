import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  createBookRoomByIdApi,
  getBookRoomBySearchApi,
  getBookRoomListApiByPageIndex,
  putBookRoomByIdApi,
  removeBookRoomByIdApi,
} from "../../Redux/BookRoomManagement/BookRoomManagement";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

const BookRoomManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { bookRoomListByPageIndex, paginator, searchBookRoomByID } =
    useSelector((state) => state.BookRoomManagement);
  const search = searchParams.get("keyword");

  const [bookRoomInfoUpdate, setBookRoomInfoUpdate] = useState({
    id: 0,
    maPhong: 0,
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 0,
    maNguoiDung: 0,
  });
  const [open, setOpen] = useState(false);
  const toast = useRef(null);
  let [typeModal, setTypeModal] = useState("");

  const showModal = (
    { id, maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung },
    type
  ) => {
    setBookRoomInfoUpdate({
      id,
      maPhong,
      ngayDen,
      ngayDi,
      soLuongKhach,
      maNguoiDung,
    });
    setTypeModal(type);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    if (typeModal === "update") {
      const result = await dispatch(
        putBookRoomByIdApi(bookRoomInfoUpdate, pageIndex)
      );
      if (result.data?.statusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Chỉnh sửa thành công",
        });
        const search = searchParams.get("keyword");
        if (search) {
          await dispatch(getBookRoomBySearchApi(search));
        } else {
          await dispatch(getBookRoomListApiByPageIndex(pageIndex));
        }
        setOpen(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.response.data.content,
        });
        setOpen(true);
      }
    } else {
      const result = await dispatch(
        createBookRoomByIdApi(bookRoomInfoUpdate, pageIndex)
      );
      if (result.response?.status === 400) {
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
          detail: "Thêm thành công",
        });
        setOpen(false);
      }
    }
  };

  const handleRemoveBookRoom = async (data) => {
    const result = await dispatch(removeBookRoomByIdApi(data, pageIndex));
    if (result.response?.status === 403) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: result.response.data.content,
      });
    } else {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Xoá thành công",
      });
      const search = searchParams.get("keyword");
      if (search) {
        navigate("/management/bookroom");
        window.location.reload();
      } else {
        await dispatch(getBookRoomListApiByPageIndex(pageIndex));
      }
    }
  };

  function handleChange(e) {
    setBookRoomInfoUpdate({
      ...bookRoomInfoUpdate,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (search) {
      dispatch(getBookRoomBySearchApi(search));
    } else {
      dispatch(getBookRoomListApiByPageIndex(pageIndex));
    }
  }, [dispatch, search, pageIndex]);

  const renderPaginator = () => {
    let content = [];
    for (let i = 0; i < paginator; i++) {
      if (i + 1 === pageIndex) {
        content.push(
          <li key={i}>
            <button
              className="bg-blue-200 transition-all h-8 w-8 mx-1 rounded-full"
              onClick={() => setPageIndex(i + 1)}>
              {i + 1}
            </button>
          </li>
        );
      } else {
        content.push(
          <li key={i}>
            <button
              className="hover:bg-gray-200 transition-all h-8 w-8 mx-1 rounded-full"
              onClick={() => setPageIndex(i + 1)}>
              {i + 1}
            </button>
          </li>
        );
      }
    }
    return content;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      keyword: keyWordRef.current,
    });
  };

  const handleChangeSearch = (e) => {
    keyWordRef.current = e.target.value;
  };

  return (
    <div className="p-5">
      <button
        className="underline cursor-pointer"
        onClick={() =>
          showModal(
            {
              id: 0,
              maPhong: 0,
              ngayDen: "",
              ngayDi: "",
              soLuongKhach: 1,
              maNguoiDung: 0,
            },
            "create"
          )
        }>
        Thêm đặt phòng
      </button>
      <div className="flex my-5 w-[800px] border items-center rounded-full overflow-hidden pl-5 pr-2 h-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex">
          <input
            className="w-full outline-none"
            type="text"
            onChange={handleChangeSearch}
            placeholder="Nhập vào id phòng"
          />
          <button
            type="submit"
            className="bg-[#ff385c] text-white w-10 h-10 rounded-full hover:bg-[#db0b64] transition-all">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="overflow-x-hidden overflow-y-auto h-[450px]">
        <table className="w-full">
          <thead>
            <tr className="border">
              <th className="text-start">STT</th>
              <th className="text-start">Id</th>
              <th className="text-start">Mã phòng</th>
              <th className="text-start">Ngày đến</th>
              <th className="text-start">Ngày đi</th>
              <th className="text-start">Số lượng khách</th>
              <th className="text-start">Mã người dùng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchBookRoomByID.map((room, index) => (
              <tr
                key={room.id}
                className="border">
                <td>{index + 1}</td>
                <td>{room.id}</td>
                <td>{room.maPhong}</td>
                <td>{room.ngayDen}</td>
                <td>{room.ngayDi}</td>
                <td>{room.soLuongKhach}</td>
                <td>{room.maNguoiDung}</td>
                <td>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-5 py-1 mr-3"
                    onClick={() => showModal(room, "update")}>
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-1"
                    onClick={() => handleRemoveBookRoom(room)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {!search &&
              [...bookRoomListByPageIndex].reverse().map((bookRoom, index) => {
                return (
                  <tr
                    key={bookRoom.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{bookRoom.id}</td>
                    <td>{bookRoom.maPhong}</td>
                    <td>{bookRoom.ngayDen}</td>
                    <td>{bookRoom.ngayDi}</td>
                    <td>{bookRoom.soLuongKhach}</td>
                    <td>{bookRoom.maNguoiDung}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-5 py-1 mr-3"
                        onClick={() => showModal(bookRoom, "update")}>
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-1"
                        onClick={() => handleRemoveBookRoom(bookRoom)}>
                        Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Modal
          title={
            typeModal === "create"
              ? "Thêm đặt phòng"
              : "Chỉnh sửa thông tin phòng đã đặt"
          }
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="maPhong">Mã phòng</label>
            <input
              value={bookRoomInfoUpdate.maPhong}
              name="maPhong"
              type="text"
              className="ml-5 border outline-none w-[350px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="ngayDen">Ngày đến</label>
            <Calendar
              value={new Date(bookRoomInfoUpdate.ngayDen)}
              name="ngayDen"
              className="w-[350px]"
              onChange={(e) => handleChange(e)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="ngayDi">Ngày đi</label>
            <Calendar
              value={new Date(bookRoomInfoUpdate.ngayDi)}
              name="ngayDi"
              className="w-[350px]"
              onChange={(e) => handleChange(e)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="soLuongKhach">Số lượng khách</label>
            <input
              value={bookRoomInfoUpdate.soLuongKhach}
              name="soLuongKhach"
              type="text"
              className="ml-5 border outline-none w-[350px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="maNguoiDung">Mã người dùng</label>
            <input
              value={bookRoomInfoUpdate.maNguoiDung}
              name="maNguoiDung"
              type="text"
              className="ml-5 border outline-none w-[350px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {searchBookRoomByID.length === 0 &&
        bookRoomListByPageIndex.length > 0 && (
          <div>
            <ul className="flex justify-center">{renderPaginator()}</ul>
          </div>
        )}
    </div>
  );
};

export default BookRoomManagement;
