import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { Toast } from "primereact/toast";
import {
  createRoomByIdApi,
  getLocationApi,
  getRoomBySearchApi,
  getRoomListApiByPageIndex,
  putRoomByIdApi,
  removeRoomByIdApi,
} from "../../Redux/RoomManagement/RoomManagement";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { roomListByPageIndex, paginator, searchRoomByName, location } =
    useSelector((state) => state.RoomManagement);
  const search = searchParams.get("keyword");

  const [roomInfoUpdate, setRoomInfoUpdate] = useState({
    id: 0,
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: "",
  });
  const [open, setOpen] = useState(false);
  const toast = useRef(null);
  let [typeModal, setTypeModal] = useState("");

  const showModal = (
    {
      id,
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      maViTri,
      hinhAnh,
    },
    type
  ) => {
    setRoomInfoUpdate({
      id,
      tenPhong,
      khach,
      phongNgu,
      giuong,
      phongTam,
      moTa,
      giaTien,
      mayGiat,
      banLa,
      tivi,
      dieuHoa,
      wifi,
      bep,
      doXe,
      hoBoi,
      banUi,
      maViTri,
      hinhAnh,
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
    if (e.target.type === "checkbox") {
      setRoomInfoUpdate({
        ...roomInfoUpdate,
        [e.target.name]: e.target.checked,
      });
    } else {
      setRoomInfoUpdate({
        ...roomInfoUpdate,
        [e.target.name]: e.target.value,
      });
    }
  }

  useEffect(() => {
    dispatch(getLocationApi());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      dispatch(getRoomBySearchApi(search));
    } else {
      dispatch(getRoomListApiByPageIndex(pageIndex));
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
              tenPhong: "",
              khach: 0,
              phongNgu: 0,
              giuong: 0,
              phongTam: 0,
              moTa: "",
              giaTien: 0,
              mayGiat: false,
              banLa: false,
              tivi: false,
              dieuHoa: false,
              wifi: false,
              bep: false,
              doXe: false,
              hoBoi: false,
              banUi: false,
              maViTri: 1,
              hinhAnh: "",
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
              <th className="text-start">Tên phòng</th>
              <th className="text-start">Hình ảnh</th>
              <th className="text-start">Mô tả</th>
              <th className="text-start">Giá tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchRoomByName.map((room, index) => (
              <tr
                key={room.id}
                className="border">
                <td>{index + 1}</td>
                <td>{room.id}</td>
                <td>{room.tenPhong}</td>
                <td className="w-[82px]">
                  {room.hinhAnh && (
                    <img
                      className="h-20 w-20 object-cover rounded-full"
                      src={room.hinhAnh}
                      alt="hinhAnh"
                    />
                  )}
                  {!room.hinhAnh && (
                    <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                      {room.tenPhong[
                        room.tenPhong.lastIndexOf(" ") + 1
                      ]?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td>
                  {room.moTa.length > 50
                    ? room.moTa.slice(0, 50) + "..."
                    : room.moTa}
                </td>
                <td>${room.giaTien}/ Tháng</td>
                <td>
                  <button
                    type="button"
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
            ))}
            {!search &&
              [...roomListByPageIndex].reverse().map((room, index) => {
                return (
                  <tr
                    key={room.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{room.id}</td>
                    <td>{room.tenPhong}</td>
                    <td className="w-[82px]">
                      {room.hinhAnh && (
                        <img
                          className="h-20 !w-20 object-cover rounded-full block"
                          src={room.hinhAnh}
                          alt="hinhAnh"
                        />
                      )}
                      {!room.hinhAnh && (
                        <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                          {room.tenPhong[
                            room.tenPhong.lastIndexOf(" ") + 1
                          ]?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>
                      {room.moTa.length > 50
                        ? room.moTa.slice(0, 50) + "..."
                        : room.moTa}
                    </td>
                    <td>${room.giaTien}/ Tháng</td>
                    <td>
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
          <div className="grid grid-cols-2 gap-5">
            <div className="w-full flex flex-col">
              <label htmlFor="maViTri">Mã vị trí</label>
              <select
                name="maViTri"
                value={roomInfoUpdate.maViTri}
                className="w-full outline-none border p-3"
                onChange={(e) => handleChange(e)}
                id="maViTri">
                {location.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}>
                    {item.id}
                  </option>
                ))}
              </select>
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
          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="w-full flex flex-col">
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
            <div className="w-full flex flex-col">
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
          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="w-full flex flex-col">
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
            <div className="w-full flex flex-col">
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
            <div className="w-full flex flex-row">
              <label
                htmlFor="mayGiat"
                className="flex-1">
                Máy giặt
              </label>
              <input
                value={roomInfoUpdate.mayGiat}
                checked={roomInfoUpdate.mayGiat}
                name="mayGiat"
                id="mayGiat"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="banLa"
                className="flex-1">
                Bàn là
              </label>
              <input
                value={roomInfoUpdate.banLa}
                checked={roomInfoUpdate.banLa}
                name="banLa"
                id="banLa"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="tivi"
                className="flex-1">
                Tivi
              </label>
              <input
                value={roomInfoUpdate.tivi}
                checked={roomInfoUpdate.tivi}
                name="tivi"
                id="tivi"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="dieuHoa"
                className="flex-1">
                Điều hoà
              </label>
              <input
                value={roomInfoUpdate.dieuHoa}
                checked={roomInfoUpdate.dieuHoa}
                name="dieuHoa"
                id="dieuHoa"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="wifi"
                className="flex-1">
                Wifi
              </label>
              <input
                value={roomInfoUpdate.wifi}
                checked={roomInfoUpdate.wifi}
                name="wifi"
                id="wifi"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="bep"
                className="flex-1">
                Bếp
              </label>
              <input
                value={roomInfoUpdate.bep}
                checked={roomInfoUpdate.bep}
                name="bep"
                id="bep"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="doXe"
                className="flex-1">
                Đỗ xe
              </label>
              <input
                value={roomInfoUpdate.doXe}
                checked={roomInfoUpdate.doXe}
                name="doXe"
                id="doXe"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="hoBoi"
                className="flex-1">
                Hồ bơi
              </label>
              <input
                value={roomInfoUpdate.hoBoi}
                checked={roomInfoUpdate.hoBoi}
                name="hoBoi"
                id="hoBoi"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full flex flex-row">
              <label
                htmlFor="banUi"
                className="flex-1">
                Bàn ủi
              </label>
              <input
                value={roomInfoUpdate.banUi}
                checked={roomInfoUpdate.banUi}
                name="banUi"
                id="banUi"
                type="checkbox"
                min={0}
                className="border outline-none p-3"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {searchRoomByName.length === 0 && roomListByPageIndex.length > 0 && (
        <div>
          <ul className="flex justify-center">{renderPaginator()}</ul>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
