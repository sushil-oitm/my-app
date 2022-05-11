import { Outlet, Link } from "react-router-dom";
export default function Main() {
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
