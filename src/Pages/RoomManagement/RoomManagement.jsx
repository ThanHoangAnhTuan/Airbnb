import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  createRoomByIdApi,
  getRoomBySearchApi,
  getRoomListApiByPageIndex,
  putRoomByIdApi,
  removeRoomByIdApi,
} from "../../Redux/RoomManagement/RoomManagement";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { Toast } from "primereact/toast";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { roomListByPageIndex, paginator, searchRoomByEmail } = useSelector(
    (state) => state.RoomManagement
  );
  const [roomInfoUpdate, setRoomInfoUpdate] = useState({
    banLa: true,
    banUi: true,
    bep: true,
    dieuHoa: true,
    doXe: true,
    giaTien: 0,
    giuong: 0,
    hinhAnh: "",
    hoBoi: true,
    id: 0,
    khach: 0,
    maViTri: 0,
    mayGiat: true,
    moTa: "",
    phongNgu: 0,
    phongTam: 0,
    tenPhong: "",
    tivi: true,
    wifi: true,
  });
  const [open, setOpen] = useState(false);
  const toast = useRef(null);
  let [typeModal, setTypeModal] = useState("");

  const showModal = (
    {
      banLa,
      banUi,
      bep,
      dieuHoa,
      doXe,
      giaTien,
      giuong,
      hinhAnh,
      hoBoi,
      id,
      khach,
      maViTri,
      mayGiat,
      moTa,
      phongNgu,
      phongTam,
      tenPhong,
      tivi,
      wifi,
    },
    type
  ) => {
    setRoomInfoUpdate({
      banLa,
      banUi,
      bep,
      dieuHoa,
      doXe,
      giaTien,
      giuong,
      hinhAnh,
      hoBoi,
      id,
      khach,
      maViTri,
      mayGiat,
      moTa,
      phongNgu,
      phongTam,
      tenPhong,
      tivi,
      wifi,
    });
    setTypeModal(type);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    if (typeModal === "update") {
      const result = await dispatch(putRoomByIdApi(roomInfoUpdate, pageIndex));
      if (result.data?.statusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Chỉnh sửa thành công",
        });
        const search = searchParams.get("keyword");
        if (search) {
          await dispatch(getRoomBySearchApi(search));
        } else {
          await dispatch(getRoomListApiByPageIndex(pageIndex));
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
        createRoomByIdApi(roomInfoUpdate, pageIndex)
      );
      if (result.response.data.statusCode === 403) {
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
          detail: "Thêm phòng thành công",
        });
        setOpen(false);
      }
    }
  };

  const handleRemoveRoom = async (data) => {
    const result = await dispatch(removeRoomByIdApi(data, pageIndex));
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
        navigate("/management/room");
        window.location.reload();
      } else {
        await dispatch(getRoomListApiByPageIndex(pageIndex));
      }
    }
  };

  function handleChange(e) {
    if (e.target.name === "gender") {
      const setGender = e.target.value === "nam" ? true : false;
      setRoomInfoUpdate({
        ...roomInfoUpdate,
        [e.target.name]: setGender,
      });
    } else {
      setRoomInfoUpdate({
        ...roomInfoUpdate,
        [e.target.name]: e.target.value,
      });
    }
  }

  useEffect(() => {
    const search = searchParams.get("keyword");
    if (search) {
      dispatch(getRoomBySearchApi(search));
    } else {
      dispatch(getRoomBySearchApi(search));
      dispatch(getRoomListApiByPageIndex(pageIndex));
    }
  }, [dispatch, searchParams, pageIndex]);

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
              banLa: true,
              banUi: true,
              bep: true,
              dieuHoa: true,
              doXe: true,
              giaTien: 0,
              giuong: 0,
              hinhAnh: "",
              hoBoi: true,
              id: 0,
              khach: 0,
              maViTri: 0,
              mayGiat: true,
              moTa: "",
              phongNgu: 0,
              phongTam: 0,
              tenPhong: "",
              tivi: true,
              wifi: true,
            },
            "create"
          )
        }>
        Thêm phòng
      </button>
      <div className="flex my-5 w-[800px] border items-center rounded-full overflow-hidden pl-5 pr-2 h-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex">
          <input
            className="w-full outline-none"
            type="text"
            onChange={handleChangeSearch}
            placeholder="Nhập vào tên phòng"
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
              <th className="text-start">Name</th>
              <th className="text-start">Image</th>
              <th className="text-start">Description</th>
              <th className="text-start">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(searchRoomByEmail).length > 0 && (
              <tr
                key={searchRoomByEmail.id}
                className="border">
                <td>{1}</td>
                <td>{searchRoomByEmail.id}</td>
                <td>{searchRoomByEmail.tenPhong}</td>
                <td>
                  {searchRoomByEmail.hinhAnh && (
                    <img
                      className="h-20 w-20 object-cover"
                      src={searchRoomByEmail.hinhAnh}
                      alt="hinh anh"
                    />
                  )}
                  {!searchRoomByEmail.hinhAnh && (
                    <div className="h-20 w-20 object-cover bg-gray-300"></div>
                  )}
                </td>
                <td>
                  {searchRoomByEmail.moTa.length > 50
                    ? searchRoomByEmail.moTa.slice(0, 50) + "..."
                    : searchRoomByEmail.moTa}
                </td>
                <td className="font-medium">
                  ${searchRoomByEmail.giaTien}/Tháng
                </td>
                <td className="flex">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-5 py-1 mr-3"
                    onClick={() => showModal(searchRoomByEmail, "update")}>
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-1"
                    onClick={() => handleRemoveRoom(searchRoomByEmail)}>
                    Xoá
                  </button>
                </td>
              </tr>
            )}
            {Object.keys(searchRoomByEmail).length === 0 &&
              [...roomListByPageIndex].reverse().map((room, index) => {
                return (
                  <tr
                    key={room.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{room.id}</td>
                    <td>{room.tenPhong}</td>
                    <td>
                      {room.hinhAnh && (
                        <img
                          className="h-20 w-20 object-cover"
                          src={room.hinhAnh}
                          alt="hinh anh"
                        />
                      )}
                      {!room.hinhAnh && (
                        <div className="h-20 w-20 object-cover bg-gray-300"></div>
                      )}
                    </td>
                    <td>
                      {room.moTa.length > 50
                        ? room.moTa.slice(0, 50) + "..."
                        : room.moTa}
                    </td>
                    <td className="font-medium">${room.giaTien}/Tháng</td>
                    <td className="flex">
                      <button
                        className="bg-blue-500 text-white px-5 py-1 mr-3"
                        onClick={() => showModal(room, "update")}>
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-1"
                        onClick={() => handleRemoveRoom(room)}>
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
            typeModal === "create" ? "Thêm phòng" : "Chỉnh sửa thông tin phòng"
          }
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="tenPhong">Tên phòng</label>
            <input
              value={roomInfoUpdate.tenPhong}
              name="tenPhong"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="moTa">Mô tả</label>
            <input
              value={roomInfoUpdate.moTa}
              name="moTa"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="hinhAnh">Hình ảnh</label>
            <input
              value={roomInfoUpdate.hinhAnh}
              name="hinhAnh"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full flex flex-col">
              <label htmlFor="maViTri">Mã vị trí</label>
              <input
                value={roomInfoUpdate.maViTri}
                name="maViTri"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="giaTien">Giá tiền</label>
              <input
                value={roomInfoUpdate.giaTien}
                name="giaTien"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex flex-col w-full">
              <label htmlFor="khach">Khách</label>
              <input
                value={roomInfoUpdate.khach}
                name="khach"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="giuong">Giường</label>
              <input
                value={roomInfoUpdate.giuong}
                name="giuong"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex flex-col w-full">
              <label htmlFor="phongNgu">Phòng ngủ</label>
              <input
                value={roomInfoUpdate.phongNgu}
                name="phongNgu"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phongTam">Phòng tắm</label>
              <input
                value={roomInfoUpdate.phongTam}
                name="phongTam"
                type="number"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-3">
            <div className="flex items-center">
              <label
                htmlFor="mayGiat"
                className="flex-auto">
                Máy giặt
              </label>
              <input
                checked={roomInfoUpdate.mayGiat}
                id="mayGiat"
                value={roomInfoUpdate.mayGiat}
                name="mayGiat"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="banLa"
                className="flex-auto">
                Bàn là
              </label>
              <input
                id="banLa"
                value={roomInfoUpdate.banLa}
                checked={roomInfoUpdate.banLa}
                name="banLa"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="tivi"
                className="flex-auto">
                Tivi
              </label>
              <input
                id="tivi"
                value={roomInfoUpdate.tivi}
                checked={roomInfoUpdate.tivi}
                name="tivi"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="dieuHoa"
                className="flex-auto">
                Điều hoà
              </label>
              <input
                value={roomInfoUpdate.dieuHoa}
                checked={roomInfoUpdate.dieuHoa}
                name="dieuHoa"
                id="dieuHoa"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="wifi"
                className="flex-auto">
                Wifi
              </label>
              <input
                value={roomInfoUpdate.wifi}
                checked={roomInfoUpdate.wifi}
                name="wifi"
                id="wifi"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="bep"
                className="flex-auto">
                Bếp
              </label>
              <input
                value={roomInfoUpdate.bep}
                checked={roomInfoUpdate.bep}
                name="bep"
                id="bep"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="doXe"
                className="flex-auto">
                Đỗ xe
              </label>
              <input
                value={roomInfoUpdate.doXe}
                checked={roomInfoUpdate.doXe}
                name="doXe"
                id="doXe"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="hoBoi"
                className="flex-auto">
                Hồ bơi
              </label>
              <input
                value={roomInfoUpdate.hoBoi}
                checked={roomInfoUpdate.hoBoi}
                name="hoBoi"
                id="hoBoi"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="banUi"
                className="flex-auto">
                Bàn ủi
              </label>
              <input
                value={roomInfoUpdate.banUi}
                checked={roomInfoUpdate.banUi}
                name="banUi"
                id="banUi"
                type="checkbox"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {Object.keys(searchRoomByEmail).length === 0 &&
        roomListByPageIndex.length > 0 && (
          <div>
            <ul className="flex justify-center">{renderPaginator()}</ul>
          </div>
        )}
    </div>
  );
};

export default RoomManagement;
