import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Main from "./components/Main";
import { Invoices, Invoice } from "./components/Invoices";
import { Expenses } from "./components/Expense";
import Login from "./components/Login";
import LocalStorage from "./Utility/LocalStorage";
import { updateLoginInfo } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function App() {
  const token = useSelector(state => state.user.token);
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const localToken = await LocalStorage.getItem("token");
      if (localToken) {
        dispatch(updateLoginInfo({ token: localToken, isLogin: true }));
      }
    }
    if (!token) {
      fetchData();
    }
    return () => {
      console.log("Unmount main app");
    };
  }, [token]);

  let comp = <Login />;
  const router = (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="login" element={<Login />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />}>
          <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
  if (isLogin) {
    comp = router;
  }
  return comp;
}
