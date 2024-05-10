import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";
import RoomList from "./Pages/RoomList/RoomList";
import SignIn from "./Pages/SignIn/SignIn";
import UserInfo from "./Pages/UserInfo/UserInfo";
import UserManagement from "./Pages/UserManagement/UserManagement";
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
import Responsive from "./Templates/Responsive";
import TabletHome from "./Pages/Home/TabletHome";
import MobileHome from "./Pages/Home/MobileHome";
import TabletRegister from "./Pages/Register/TabletRegister";
import MobileRegister from "./Pages/Register/MobileRegister";
import TabletRoomDetail from "./Pages/RoomDetail/TabletRoomDetail";
import MobileRoomDetail from "./Pages/RoomDetail/MobileRoomDetail";
import TabletRoomList from "./Pages/RoomList/TabletRoomList";
import MobileRoomList from "./Pages/RoomList/MobileRoomList";
import TabletSignIn from "./Pages/SignIn/TabletSignIn";
import MobileSignIn from "./Pages/SignIn/MobileSignIn";
import TabletUserInfo from "./Pages/UserInfo/TabletUserInfo";
import MobileUserInfo from "./Pages/UserInfo/MobileUserInfo";
import Management from "./Templates/Management";
import LocationManagement from "./Pages/LocationManagement/LocationManagement";
import RoomManagement from "./Pages/RoomManagement/RoomManagement";
import BookRoomManagement from "./Pages/BookRoomManagement/BookRoomManagement";
import TabletManagement from "./Templates/TabletManagement";
import MobileManagement from "./Templates/MobileManagement";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <Responsive
              laptop={<Home />}
              tablet={<TabletHome />}
              mobile={<MobileHome />}
            />
          }
        />
        <Route
          path="register"
          element={
            <Responsive
              laptop={<Register />}
              tablet={<TabletRegister />}
              mobile={<MobileRegister />}
            />
          }
        />
        <Route
          path="detail/:id"
          element={
            <Responsive
              laptop={<RoomDetail />}
              tablet={<TabletRoomDetail />}
              mobile={<MobileRoomDetail />}
            />
          }
        />
        <Route
          path="search/:cityName"
          element={
            <Responsive
              laptop={<RoomList />}
              tablet={<TabletRoomList />}
              mobile={<MobileRoomList />}
            />
          }
        />
        <Route
          path="signin"
          element={
            <Responsive
              laptop={<SignIn />}
              tablet={<TabletSignIn />}
              mobile={<MobileSignIn />}
            />
          }
        />
        <Route
          path="userinfo/:userId"
          element={
            <Responsive
              laptop={<UserInfo />}
              tablet={<TabletUserInfo />}
              mobile={<MobileUserInfo />}
            />
          }
        />
        <Route
          path="management"
          element={<Responsive
            laptop={<Management />}
            tablet={<TabletManagement />}
            mobile={<MobileManagement />}
          />}>
          <Route
            path="user"
            element={<UserManagement />}
          />
          <Route
            path="location"
            element={<LocationManagement />}
          />
          <Route
            path="room"
            element={<RoomManagement />}
          />
          <Route
            path="bookroom"
            element={<BookRoomManagement />}
          />
        </Route>
        <Route
          path="*"
          element={<Navigate to={""} />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
