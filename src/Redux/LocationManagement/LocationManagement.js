import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOKEN } from "../../util/config";

const initialState = {
  locationListByPageIndex: [],
  paginator: 0,
  searchLocationByEmail: {},
};

const LocationManagement = createSlice({
  name: "LocationManagement",
  initialState,
  reducers: {
    getLocationListApiByPageIndexAction: (state, action) => {
      state.locationListByPageIndex = action.payload.data;
      state.paginator = Math.ceil(action.payload.totalRow / 100);
    },
    getLocationBySearchApiAction: (state, action) => {
      state.searchLocationByEmail = action.payload;
    },
  },
});

export const { getLocationListApiByPageIndexAction, getLocationBySearchApiAction } =
LocationManagement.actions;

export default LocationManagement.reducer;

export const getLocationListApiByPageIndex = (pageIndex) => {
  return async (dispatch) => {
    try {
      let result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=100`,
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      dispatch(getLocationListApiByPageIndexAction(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLocationBySearchApi = (search) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://airbnbnew.cybersoft.edu.vn/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=384",
        method: "GET",
        headers: {
          tokenCybersoft: TOKEN,
        },
      });
      const findLocation = result.data.content.data.find((location) => {
        if (location.tenPhong.toLowerCase().includes(search.trim().toLowerCase())) {
          return location;
        }
      });
      dispatch(getLocationBySearchApiAction(findLocation ?? {}));
    } catch (error) {
      return error;
    }
  };
};

export const putLocationByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${data.id}`,
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

export const removeLocationByIdApi = (data) => {
  return async () => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${data.id}`,
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

export const createLocationByIdApi = (data, pageIndex) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri`,
        method: "POST",
        headers: {
          token: localStorage.getItem("user_id"),
          tokenCybersoft: TOKEN,
        },
        data,
      });
      dispatch(getLocationListApiByPageIndex(pageIndex));
      return result;
    } catch (error) {
      return error;
    }
  };
};
