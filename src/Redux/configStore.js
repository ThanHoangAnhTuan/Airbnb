import { configureStore } from "@reduxjs/toolkit";
import RoomDetail from "./RoomDetail/RoomDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserManagement from "./UserManagement/UserManagement";

export const store = configureStore({
  reducer: {
    RoomDetail: RoomDetail,
    UserInfo: UserInfo,
    UserManagement: UserManagement
  },
});
