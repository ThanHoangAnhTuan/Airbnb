import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config";

const initialState = {
  roomListByPageIndex: [],
  paginator: 0,
  searchRoomByName: [],
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
      state.searchRoomByName = action.payload;
    },
  },
});

export const { getRoomListApiByPageIndexAction, getRoomBySearchApiAction } =
  RoomManagement.actions;

export default RoomManagement.reducer;

const getRoomListApiByPageIndex = (pageIndex) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=100`,
        method: "GET",
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getRoomBySearchApiAction([]));
      dispatch(getRoomListApiByPageIndexAction(result.data.content));
    } catch (error) {
      return error;
    }
  };
};

const getRoomBySearchApi = (search) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue/phan-trang-tim-kiem?pageIndex=1&pageSize=384",
        method: "GET",
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
      });
      const findRoom = result.data.content.data.filter((room) => {
        if (room.tenPhong.toLowerCase().includes(search.toLowerCase())) {
          return room;
        }
      });
      dispatch(getRoomBySearchApiAction(findRoom));
    } catch (error) {
      return error;
    }
  };
};

const putRoomByIdApi = (data) => {
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

const removeRoomByIdApi = (data) => {
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

const createRoomByIdApi = (data, pageIndex) => {
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

export {
  getRoomListApiByPageIndex,
  getRoomBySearchApi,
  putRoomByIdApi,
  removeRoomByIdApi,
  createRoomByIdApi,
};
