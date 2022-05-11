import React, { useState } from "react";
import PropTypes from "prop-types";
import localStorage from "../Utility/LocalStorage";
import { updateLoginInfo, getToken } from "../store";
import { useSelector, useDispatch } from "react-redux";

async function loginUser(credentials) {
  //   return fetch("http://localhost:8080/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(credentials)
  //   }).then(data => data.json());
  return new Promise((resolve, reject) => {
    resolve({ token: "12345", name: "sushil" });
  });
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const handleSubmit = async e => {
    e.preventDefault();
    const { token, name } = await loginUser({
      username,
      password
    });
    dispatch(updateLoginInfo({ token, isLogin: true }));
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
  };

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center"
      }}
    >
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
