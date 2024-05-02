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
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

const LocationManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { locationListByPageIndex, paginator, searchLocationByEmail } =
    useSelector((state) => state.LocationManagement);
  const [locationInfoUpdate, setLocationInfoUpdate] = useState({
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
  const [open, setOpen] = useState(false);
  const toast = useRef(null);
  let [typeModal, setTypeModal] = useState("");

  const showModal = (
    { avatar, birthday, email, gender, id, name, password, phone, role },
    type
  ) => {
    setLocationInfoUpdate({
      avatar,
      birthday,
      email,
      gender,
      id,
      name,
      password,
      phone,
      role,
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
      if (result.data.statusCode === 200) {
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
    if (e.target.name === "gender") {
      const setGender = e.target.value === "nam" ? true : false;
      setLocationInfoUpdate({
        ...locationInfoUpdate,
        [e.target.name]: setGender,
      });
    } else {
      setLocationInfoUpdate({
        ...locationInfoUpdate,
        [e.target.name]: e.target.value,
      });
    }
  }

  useEffect(() => {
    const search = searchParams.get("keyword");
    if (search) {
      dispatch(getLocationBySearchApi(search));
    } else {
      dispatch(getLocationBySearchApi(search));
      dispatch(getLocationListApiByPageIndex(pageIndex));
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
              avatar: "",
              birthday: "",
              email: "",
              gender: true,
              id: 0,
              name: "",
              password: "",
              phone: "",
              role: "USER",
            },
            "create"
          )
        }>
        Thêm quản trị viên
      </button>
      <div className="flex my-5 w-[800px] border items-center rounded-full overflow-hidden pl-5 pr-2 h-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex">
          <input
            className="w-full outline-none"
            type="text"
            onChange={handleChangeSearch}
            placeholder="Nhập vào tài khoản hoặc họ tên người dùng"
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
              <th className="text-start">Avatar</th>
              <th className="text-start">Birth day</th>
              <th className="text-start">Gender</th>
              <th className="text-start">Phone</th>
              <th className="text-start">Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(searchLocationByEmail).length > 0 && (
              <tr
                key={searchLocationByEmail.id}
                className="border">
                <td>{1}</td>
                <td>{searchLocationByEmail.id}</td>
                <td>{searchLocationByEmail.name}</td>
                <td>
                  {searchLocationByEmail.avatar && (
                    <img
                      className="h-20 w-20 object-contain rounded-full"
                      src={searchLocationByEmail.avatar}
                      alt="avatar"
                    />
                  )}
                  {!searchLocationByEmail.avatar && (
                    <div className="h-20 w-20 object-contain rounded-full bg-gray-300"></div>
                  )}
                </td>
                <td>{searchLocationByEmail.birthday}</td>
                <td>{searchLocationByEmail.gender ? "Nam" : "Nữ"}</td>
                <td>{searchLocationByEmail.phone}</td>
                <td>{searchLocationByEmail.role}</td>
                <td>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-5 py-1 mr-3"
                    onClick={() => showModal(searchLocationByEmail, "update")}>
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-1"
                    onClick={() => handleRemoveLocation(searchLocationByEmail)}>
                    Xoá
                  </button>
                </td>
              </tr>
            )}
            {Object.keys(searchLocationByEmail).length === 0 &&
              locationListByPageIndex.map((location, index) => {
                return (
                  <tr
                    key={location.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{location.id}</td>
                    <td>{location.name}</td>
                    <td>
                      {location.avatar && (
                        <img
                          className="h-20 w-20 object-contain rounded-full"
                          src={location.avatar}
                          alt="avatar"
                        />
                      )}
                      {!location.avatar && (
                        <div className="h-20 w-20 object-contain rounded-full bg-gray-300"></div>
                      )}
                    </td>
                    <td>{location.birthday}</td>
                    <td>{location.gender ? "Nam" : "Nữ"}</td>
                    <td>{location.phone}</td>
                    <td>{location.role}</td>
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
              ? "Thêm người dùng"
              : "Chỉnh sửa thông tin người dùng"
          }
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="name">Name</label>
            <input
              value={locationInfoUpdate.name}
              name="name"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="email">Email</label>
            <input
              value={locationInfoUpdate.email}
              name="email"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="birthday">Birth day</label>
            <Calendar
              value={new Date(locationInfoUpdate.birthday)}
              name="birthday"
              className="w-[380px]"
              onChange={(e) => handleChange(e)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              value={locationInfoUpdate.phone}
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
                  checked={locationInfoUpdate.gender}
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
                  checked={!locationInfoUpdate.gender}
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
              defaultValue={locationInfoUpdate.role}
              onChange={(e) => handleChange(e)}
              id="role">
              <option value="ADMIN">Amin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {Object.keys(searchLocationByEmail).length === 0 &&
        locationListByPageIndex.length > 0 && (
          <div>
            <ul className="flex justify-center">{renderPaginator()}</ul>
          </div>
        )}
    </div>
  );
};

export default LocationManagement;
