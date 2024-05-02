import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {TOKEN} from '../../util/config.js'

const initialState = {
  roomDetailById: {},
  positionById: {},
  commentList: [],
};

const RoomDetail = createSlice({
  name: "RoomDetail",
  initialState,
  reducers: {
    getRoomDetailByIdApiAction: (state, action) => {
      state.roomDetailById = action.payload;
    },
    getPositionByIdApiAction: (state, action) => {
      state.positionById = action.payload;
    },
    getCommentListByRoomIdApiAction: (state, action) => {
      state.commentList = action.payload;
    },
  },
});

export const {
  getRoomDetailByIdApiAction,
  getPositionByIdApiAction,
  getCommentListByRoomIdApiAction,
} = RoomDetail.actions;

export default RoomDetail.reducer;

export const getRoomDetailByIdApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getRoomDetailByIdApiAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPositionByIdApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getPositionByIdApiAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCommentListByRoomIdApi = (id) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/binh-luan/lay-binh-luan-theo-phong/${id}`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      result = result.data.content.reverse();
      dispatch(getCommentListByRoomIdApiAction(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCommentByRoomIdApi = (data) => {
  return async () => {
    try {
      await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/binh-luan`,
        method: "POST",
        headers: {
          tokenCybersoft: TOKEN,
          token: localStorage.getItem("user_id"),
        },
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postBookRoomApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/dat-phong`,
        method: "POST",
        headers: {
          tokenCybersoft: TOKEN,
        },
        data: data,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};
