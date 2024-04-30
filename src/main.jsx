import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import RoomManagement from "./Pages/RoomManagement/RoomManagement";
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
import TabletRoomManagement from "./Pages/RoomManagement/TabletRoomManagement";
import MobileRoomManagement from "./Pages/RoomManagement/MobileRoomManagement";
import TabletSignIn from "./Pages/SignIn/TabletSignIn";
import MobileSignIn from "./Pages/SignIn/MobileSignIn";
import TabletUserInfo from "./Pages/UserInfo/TabletUserInfo";
import MobileUserInfo from "./Pages/UserInfo/MobileUserInfo";
import TabletUserManagement from "./Pages/UserManagement/TabletUserManagement";
import MobileUserManagement from "./Pages/UserManagement/MobileUserManagement";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
        <Route path="detail">
          <Route
            path=":id"
            element={
              <Responsive
                laptop={<RoomDetail />}
                tablet={<TabletRoomDetail />}
                mobile={<MobileRoomDetail />}
              />
            }
          />
        </Route>
        <Route path="/search">
          <Route
            path=":cityName/:cityId"
            element={
              <Responsive
                laptop={<RoomList />}
                tablet={<TabletRoomList />}
                mobile={<MobileRoomList />}
              />
            }
          />
        </Route>
        <Route
          path="roommanagement"
          element={
            <Responsive
              laptop={<RoomManagement />}
              tablet={<TabletRoomManagement />}
              mobile={<MobileRoomManagement />}
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
          path="userinfo"
          element={
            <Responsive
              laptop={<UserInfo />}
              tablet={<TabletUserInfo />}
              mobile={<MobileUserInfo />}
            />
          }
        />
        <Route
          path="usermanagement"
          element={
            <Responsive
              laptop={<UserManagement />}
              tablet={<TabletUserManagement />}
              mobile={<MobileUserManagement />}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={""} />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
