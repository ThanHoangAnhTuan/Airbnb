import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config";

const initialState = {
  roomListByPageIndex: [],
  paginator: 0,
  searchRoomByEmail: {},
};

const RoomManagement = createSlice({
  name: "RoomManagement",
  initialState,
  reducers: {
    getRoomListApiByPageIndexAction: (state, action) => {
      state.roomListByPageIndex = action.payload.data;
      state.paginator = Math.ceil(action.payload.totalRow / 100);
    },
    getRoomBySearchApiAction: (state, action) => {
      state.searchRoomByEmail = action.payload;
    },
  },
});

export const { getRoomListApiByPageIndexAction, getRoomBySearchApiAction } =
  RoomManagement.actions;

export default RoomManagement.reducer;

export const getRoomListApiByPageIndex = (pageIndex) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=100`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getRoomListApiByPageIndexAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRoomBySearchApi = (search) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue/phan-trang-tim-kiem?pageIndex=1&pageSize=384",
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      const findRoom = result.data.content.data.find((room) => {
        if (room.tenPhong.toLowerCase().includes(search.trim().toLowerCase())) {
          return room;
        }
      });
      dispatch(getRoomBySearchApiAction(findRoom ?? {}));
    } catch (error) {
      return error;
    }
  };
};

export const putRoomByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${data.id}`,
        method: "PUT",
        data: data,
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
};

export const removeRoomByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${data.id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };
};

export const createRoomByIdApi = (data, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue`,
        method: "POST",
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
        data,
      });
      dispatch(getRoomListApiByPageIndex(pageIndex));
      return result;
    } catch (error) {
      return error;
    }
  };
};
