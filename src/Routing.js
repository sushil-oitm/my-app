import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { Invoices, Invoice } from "./components/Invoices";
import { Expenses } from "./components/Expense";
import Login from "./components/Login";

export default function Routing() {
  return (
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
}
