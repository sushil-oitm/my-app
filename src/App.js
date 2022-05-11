import Login from "./components/Login";
import Routing from "./Routing";
import LocalStorage from "./Utility/LocalStorage";
import { updateLoginInfo, getLoginInfo } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { initUser } from "./Utility/UtilityMethods";
export default function App() {
  const {
    payload: {
      userInfo: { token, isLogin, user }
    }
  } = useSelector(getLoginInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const { isAuth, ...rest } = await initUser({ user, token });
      if (isAuth) {
        dispatch(updateLoginInfo({ ...rest, isLogin: true }));
      }
    }
    if (!token) {
      fetchData();
    }
    return () => {
      console.log("Unmount main app");
    };
  });
  const setLogin = ({ user, token }) => {
    console.log("set login called>>>>>", user);
    console.log("set login called>>>>>", token);
    dispatch(updateLoginInfo({ token, isLogin: true, user }));
  };

  let comp = <Login setLogin={setLogin} />;
  if (isLogin) {
    comp = <Routing />;
  }
  return comp;
}
