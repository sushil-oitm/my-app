import Storage from "./LocalStorage";
import axios from "axios";
let userData;
let tokenData;
const serverUrl = "http://localhost:5001/invoke";
// const logout = () => {
//   return fetch({
//     uri: {
//       id: "_signOut",
//       props: {
//         token
//       }
//     }
//   })
//     .then(() => {
//       return Storage.removeItem("token");
//     })
//     .then(() => {
//       /// to clear feedback popup timer cache
//       return Storage.removeItem("lastAddFeedbackTime");
//     })
//     .then(() => {
//       token = void 0;
//       user = void 0;
//     })
//     .catch(err => {
//       showError(err);
//     });
// };

const loadData = async ({ serverUrl, props }) => {
  try {
    const res = await axios.post(`${serverUrl}`, props);
    if (res && res.data && res.data.response) {
      return res.data.response;
    }
  } catch (err) {
    console.log("Error in network call");
  }
};

const authenticateUser = async ({ email, password }) => {
  const props = {
    timezoneOffset: new Date().getTimezoneOffset(),
    platform: "web",
    paramValue: { email, password },

    id: "_authenticateUser"
  };

  const response = await loadData({ serverUrl, props });
  if (response && response.result && response.result) {
    userData = response.result.user;
    tokenData = response.result.token;
    await Storage.setItem("token", tokenData);
    return { isAuth: true, user: userData, token: tokenData };
  }
};

const loadUser = async () => {
  const token = await Storage.getItem("token");
  if (token) {
    const props = {
      timezoneOffset: new Date().getTimezoneOffset(),
      platform: "web",
      paramValue: { token },

      id: "_getAuthenticatedUser"
    };

    const response = await loadData({ serverUrl, props });
    if (response && response.result && response.result) {
      userData = response.result;
      tokenData = token;
      return { isAuth: true, user: userData, token: tokenData };
    } else {
      userData = void 0;
      tokenData = void 0;
      await Storage.removeItem("token");
      return { user: null, token: null };
    }
  } else {
    return { user: null, token: null };
  }
};

const initUser = async ({ user, token }) => {
  if (user && token) {
    userData = user;
    tokenData = token;
    return { isAuth: true, user, token };
  }
  return loadUser();
};

export { authenticateUser, initUser };
