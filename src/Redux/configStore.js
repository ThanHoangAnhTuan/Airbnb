import { configureStore } from "@reduxjs/toolkit";
import RoomDetail from "./RoomDetail/RoomDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserManagement from "./UserManagement/UserManagement";
import RoomManagement from "./RoomManagement/RoomManagement";
import LocationManagement from "./LocationManagement/LocationManagement";

export const store = configureStore({
  reducer: {
    RoomDetail,
    UserInfo,
    UserManagement,
    RoomManagement,
    LocationManagement
  },
});
