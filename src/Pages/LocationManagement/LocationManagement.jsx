import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  createLocationByIdApi,
  getLocationBySearchApi,
  getLocationListApiByPageIndex,
  putLocationByIdApi,
  removeLocationByIdApi,
} from "../../Redux/LocationManagement/LocationManagement";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { Toast } from "primereact/toast";

const LocationManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { locationListByPageIndex, paginator, searchLocationByName } =
    useSelector((state) => state.LocationManagement);
  const search = searchParams.get("keyword");

  const [locationInfoUpdate, setLocationInfoUpdate] = useState({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    id: 0,
    hinhAnh: "",
  });
  const [open, setOpen] = useState(false);
  const toast = useRef(null);
  let [typeModal, setTypeModal] = useState("");

  const showModal = ({ tenViTri, tinhThanh, quocGia, id, hinhAnh }, type) => {
    setLocationInfoUpdate({
      tenViTri,
      tinhThanh,
      quocGia,
      id,
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
      const result = await dispatch(
        putLocationByIdApi(locationInfoUpdate, pageIndex)
      );
      if (result.data?.statusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Chỉnh sửa thành công",
        });
        const search = searchParams.get("keyword");
        if (search) {
          await dispatch(getLocationBySearchApi(search));
        } else {
          await dispatch(getLocationListApiByPageIndex(pageIndex));
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
        createLocationByIdApi(locationInfoUpdate, pageIndex)
      );
      if (result?.data?.statusCode === 201) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Thêm thành công",
        });
        setOpen(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.response.data.content,
        });
        setOpen(true);
      }
    }
  };

  const handleRemoveLocation = async (data) => {
    const result = await dispatch(removeLocationByIdApi(data, pageIndex));
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
        navigate("/management/location");
        window.location.reload();
      } else {
        await dispatch(getLocationListApiByPageIndex(pageIndex));
      }
    }
  };

  function handleChange(e) {
    setLocationInfoUpdate({
      ...locationInfoUpdate,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (search) {
      dispatch(getLocationBySearchApi(search));
    } else {
      dispatch(getLocationListApiByPageIndex(pageIndex));
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
              tenViTri: "",
              tinhThanh: "",
              quocGia: "",
              id: 0,
              hinhAnh: "",
            },
            "create"
          )
        }>
        Thêm vị trí
      </button>
      <div className="flex my-5 w-[800px] border items-center rounded-full overflow-hidden pl-5 pr-2 h-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex">
          <input
            className="w-full outline-none"
            type="text"
            onChange={handleChangeSearch}
            placeholder="Nhập vào tên vị trí"
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
              <th className="text-start">Tên vị trí</th>
              <th className="text-start">Hình ảnh</th>
              <th className="text-start">Tỉnh thành</th>
              <th className="text-start">Quốc gia</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchLocationByName.map((location, index) => (
              <tr
                key={location.id}
                className="border">
                <td>{index + 1}</td>
                <td>{location.id}</td>
                <td>{location.tenViTri}</td>
                <td>
                  {location.hinhAnh && (
                    <img
                      className="h-20 w-20 object-cover rounded-full"
                      src={location.hinhAnh}
                      alt="hinhAnh"
                    />
                  )}
                  {!location.hinhAnh && (
                    <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                      {location.tenViTri[
                        location.tenViTri.lastIndexOf(" ") + 1
                      ]?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{location.tinhThanh}</td>
                <td>{location.quocGia}</td>
                <td>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-5 py-1 mr-3"
                    onClick={() => showModal(location, "update")}>
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-1"
                    onClick={() => handleRemoveLocation(location)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {!search &&
              [...locationListByPageIndex].reverse().map((location, index) => {
                return (
                  <tr
                    key={location.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{location.id}</td>
                    <td>{location.tenViTri}</td>
                    <td>
                      {location.hinhAnh && (
                        <img
                          className="h-20 w-20 object-cover rounded-full"
                          src={location.hinhAnh}
                          alt="hinhAnh"
                        />
                      )}
                      {!location.hinhAnh && (
                        <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                          {location.tenViTri[
                            location.tenViTri.lastIndexOf(" ") + 1
                          ]?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>{location.tinhThanh}</td>
                    <td>{location.quocGia}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-5 py-1 mr-3"
                        onClick={() => showModal(location, "update")}>
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-1"
                        onClick={() => handleRemoveLocation(location)}>
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
              ? "Thêm vị trí"
              : "Chỉnh sửa thông tin vị trí"
          }
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="tenViTri">Tên vị trí</label>
            <input
              value={locationInfoUpdate.tenViTri}
              name="tenViTri"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="tinhThanh">Tỉnh thành</label>
            <input
              value={locationInfoUpdate.tinhThanh}
              name="tinhThanh"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="quocGia">Quốc gia</label>
            <input
              value={locationInfoUpdate.quocGia}
              name="quocGia"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="hinhAnh">Hình ảnh</label>
            <input
              value={locationInfoUpdate.hinhAnh}
              name="hinhAnh"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {searchLocationByName.length === 0 &&
        locationListByPageIndex.length > 0 && (
          <div>
            <ul className="flex justify-center">{renderPaginator()}</ul>
          </div>
        )}
    </div>
  );
};

export default LocationManagement;
