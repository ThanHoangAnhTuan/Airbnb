import { configureStore } from "@reduxjs/toolkit";
import RoomDetail from "./RoomDetail/RoomDetail";
import UserInfo from "./UserInfo/UserInfo";
import UserManagement from "./UserManagement/UserManagement";
import LocationManagement from "./LocationManagement/LocationManagement";
import RoomManagement from "./RoomManagement/RoomManagement";
import BookRoomManagement from "./BookRoomManagement/BookRoomManagement";

export const store = configureStore({
  reducer: {
    RoomDetail,
    UserInfo,
    UserManagement,
    LocationManagement,
    RoomManagement,
    BookRoomManagement,
  },
});
