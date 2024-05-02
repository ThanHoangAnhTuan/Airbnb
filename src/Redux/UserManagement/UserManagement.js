import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config";

const initialState = {
  userListByPageIndex: [],
  paginator: 0,
  searchUserByEmail: [],
};

const UserManagement = createSlice({
  name: "UserManagement",
  initialState,
  reducers: {
    getUserListApiByPageIndexAction: (state, action) => {
      state.userListByPageIndex = action.payload.data;
      state.paginator = Math.ceil(action.payload.totalRow / 100);
    },
    getUserBySearchApiAction: (state, action) => {
      state.searchUserByEmail = action.payload;
    },
  },
});

export const { getUserListApiByPageIndexAction, getUserBySearchApiAction } =
  UserManagement.actions;

export default UserManagement.reducer;

export const getUserListApiByPageIndex = (pageIndex) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=100`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getUserBySearchApiAction([]));
      dispatch(getUserListApiByPageIndexAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserBySearchApi = (search) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/users/phan-trang-tim-kiem?pageIndex=1&pageSize=384",
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      const findUser = result.data.content.data.filter((user) => {
        if (user.name.toLowerCase().includes(search.toLowerCase())) {
          return user;
        }
      });
      dispatch(getUserBySearchApiAction(findUser));
    } catch (error) {
      return error;
    }
  };
};

export const putUserByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/${data.id}`,
        method: "PUT",
        data: data,
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
};

export const removeUserByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users?id=${data.id}`,
        method: "DELETE",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
};

export const createUserByIdApi = (data, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users`,
        method: "POST",
        headers: {
          tokenCybersoft: TOKEN,
        },
        data,
      });
      dispatch(getUserListApiByPageIndex(pageIndex));
      return result;
    } catch (error) {
      return error;
    }
  };
};
