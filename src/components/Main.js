import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Main() {
  const loadUser = async ({ token }) => {
    return new Promise((resolve, reject) => {
      resolve({ token: "12345", name: "sushil" });
    });
  };

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |<Link to="/expenses">Expenses</Link>|<Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}
