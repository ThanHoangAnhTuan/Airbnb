import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config.js";

const initialState = {
  bookRoomListByPageIndex: [],
  paginator: 0,
  searchBookRoomByID: [],
  roomId: [],
  userIdList: []
};

const BookRoomManagement = createSlice({
  name: "BookRoomManagement",
  initialState,
  reducers: {
    getBookRoomListApiByPageIndexAction: (state, action) => {
      state.bookRoomListByPageIndex = action.payload;
    },
    getBookRoomBySearchApiAction: (state, action) => {
      state.searchBookRoomByID = action.payload;
    },
    getRoomIdApiAction: (state, action) => {
      state.roomId = action.payload;
    },
    getUserIdApiAction: (state, action) => {
      state.userIdList = action.payload;
    },
  },
});

export const {
  getBookRoomListApiByPageIndexAction,
  getBookRoomBySearchApiAction,
  getUserIdApiAction,
  getRoomIdApiAction,
} = BookRoomManagement.actions;

export default BookRoomManagement.reducer;

export const getBookRoomListApiByPageIndex = () => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getBookRoomBySearchApiAction([]));
      dispatch(getBookRoomListApiByPageIndexAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBookRoomBySearchApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getBookRoomBySearchApiAction([...[], result.data.content]));
    } catch (error) {
      dispatch(getBookRoomBySearchApiAction([]));
    }
  };
};

export const putBookRoomByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${data.id}`,
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

export const removeBookRoomByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/${data.id}`,
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

export const createBookRoomByIdApi = (data, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong`,
        method: "POST",
        headers: {
          tokenCybersoft: TOKEN,
        },
        data,
      });
      dispatch(getBookRoomListApiByPageIndex(pageIndex));
      return result;
    } catch (error) {
      return error;
    }
  };
};

export const getRoomIdApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/phong-thue",
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      const data = result.data.content.map((item) => {
        return {
          id: item.id,
        };
      });
      dispatch(getRoomIdApiAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const getUserIdApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/users",
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      const data = result.data.content.map((item) => {
        return {
          id: item.id,
        };
      });
      dispatch(getUserIdApiAction(data));
    } catch (error) {
      return error;
    }
  };
};
