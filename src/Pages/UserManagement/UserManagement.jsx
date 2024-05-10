import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  createUserByIdApi,
  getUserBySearchApi,
  getUserListApiByPageIndex,
  putUserByIdApi,
  removeUserByIdApi,
} from "../../Redux/UserManagement/UserManagement";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "antd";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  const keyWordRef = useRef("");
  const { userListByPageIndex, paginator, searchUserByEmail } = useSelector(
    (state) => state.UserManagement
  );
  const search = searchParams.get("keyword");

  const [userInfoUpdate, setUserInfoUpdate] = useState({
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
    setUserInfoUpdate({
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
      const result = await dispatch(putUserByIdApi(userInfoUpdate, pageIndex));
      if (result.data?.statusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Chỉnh sửa thành công",
        });
        const search = searchParams.get("keyword");
        if (search) {
          await dispatch(getUserBySearchApi(search));
        } else {
          await dispatch(getUserListApiByPageIndex(pageIndex));
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
        createUserByIdApi(userInfoUpdate, pageIndex)
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

  const handleRemoveUser = async (data) => {
    const result = await dispatch(removeUserByIdApi(data, pageIndex));
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
        navigate("/management/user");
        window.location.reload();
      } else {
        await dispatch(getUserListApiByPageIndex(pageIndex));
      }
    }
  };

  function handleChange(e) {
    if (e.target.name === "gender") {
      const setGender = e.target.value === "nam" ? true : false;
      setUserInfoUpdate({
        ...userInfoUpdate,
        [e.target.name]: setGender,
      });
    } else {
      setUserInfoUpdate({
        ...userInfoUpdate,
        [e.target.name]: e.target.value,
      });
    }
  }

  useEffect(() => {
    if (search) {
      dispatch(getUserBySearchApi(search));
    } else {
      dispatch(getUserListApiByPageIndex(pageIndex));
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
      <div className="flex my-5 w-full max-w-[800px] border items-center rounded-full overflow-hidden pl-5 pr-2 h-[50px]">
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
      <div className="overflow-auto h-[450px]">
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
            {searchUserByEmail.map((user, index) => (
              <tr
                key={user.id}
                className="border">
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {user.avatar && (
                    <img
                      className="h-20 w-20 object-cover rounded-full"
                      src={user.avatar}
                      alt="avatar"
                    />
                  )}
                  {!user.avatar && (
                    <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                      {user.name[user.name.lastIndexOf(" ") + 1]?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{user.birthday}</td>
                <td>{user.gender ? "Nam" : "Nữ"}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-5 py-1 mr-3"
                    onClick={() => showModal(user, "update")}>
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-5 py-1"
                    onClick={() => handleRemoveUser(user)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {!search &&
              userListByPageIndex.map((user, index) => {
                return (
                  <tr
                    key={user.id}
                    className="border">
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      {user.avatar && (
                        <img
                          className="h-20 w-20 object-cover rounded-full"
                          src={user.avatar}
                          alt="avatar"
                        />
                      )}
                      {!user.avatar && (
                        <div className="h-20 w-20 object-cover rounded-full bg-gray-300 flex items-center justify-center text-3xl">
                          {user.name[
                            user.name.lastIndexOf(" ") + 1
                          ]?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>{user.birthday}</td>
                    <td>{user.gender ? "Nam" : "Nữ"}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="bg-blue-500 text-white px-5 py-1 mr-3"
                        onClick={() => showModal(user, "update")}>
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-5 py-1"
                        onClick={() => handleRemoveUser(user)}>
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
              value={userInfoUpdate.name}
              name="name"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="email">Email</label>
            <input
              value={userInfoUpdate.email}
              name="email"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="password">Password</label>
            <input
              value={userInfoUpdate.password}
              name="password"
              type="text"
              className="ml-5 border outline-none w-[380px] p-3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="birthday">Birth day</label>
            <Calendar
              value={new Date(userInfoUpdate.birthday)}
              name="birthday"
              className="w-[380px]"
              onChange={(e) => handleChange(e)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div className="flex flex-row items-center justify-between mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              value={userInfoUpdate.phone}
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
                  checked={userInfoUpdate.gender}
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
                  checked={!userInfoUpdate.gender}
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
              value={userInfoUpdate.role}
              onChange={(e) => handleChange(e)}
              id="role">
              <option value="ADMIN">Amin</option>
              <option value="USER">User</option>
            </select>
          </div>
        </Modal>
        <Toast ref={toast} />
      </div>
      {searchUserByEmail.length === 0 && userListByPageIndex.length > 0 && (
        <div>
          <ul className="flex justify-center">{renderPaginator()}</ul>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
