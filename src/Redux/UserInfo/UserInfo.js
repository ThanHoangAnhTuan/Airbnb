import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config.js";

const initialState = {
  userInfo: {},
  bookedRoom: [],
  bookedRoomDetail: [],
};

const UserInfo = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    getUserByIdApiAction: (state, action) => {
      state.userInfo = action.payload;
    },
    getBookedRoomByUserIdAction: (state, action) => {
      state.bookedRoom = action.payload;
    },
    getRoomDetailListApiAction: (state, action) => {
      state.bookedRoomDetail = action.payload;
    },
  },
});

export const {
  getUserByIdApiAction,
  getBookedRoomByUserIdAction,
  getRoomDetailListApiAction,
} = UserInfo.actions;

export default UserInfo.reducer;

export const getUserByIdApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getUserByIdApiAction(result.data.content));
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

export const getBookedRoomByUserIdApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/lay-theo-nguoi-dung/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getBookedRoomByUserIdAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRoomDetailListApi = (ids) => {
  return async (dispatch) => {
    try {
      const promises = ids.map(async (id) => {
        const result = await axios({
          url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
          method: "GET",
          headers: {
            tokenCybersoft: TOKEN,
          },
        });
        if (!result.data) {
          throw new Error("Response data is empty");
        }
        return result.data.content;
      });
      const data = await Promise.all(promises);
      dispatch(getRoomDetailListApiAction(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadAvatarApi = (model) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/users/upload-avatar`,
        method: "POST",
        data: model,
        headers: {
          tokenCybersoft: TOKEN,
          token: localStorage.getItem("user_id"),
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUserByIdApiAction(result.data.content));
    } catch (error) {
      return error;
    }
  };
};
