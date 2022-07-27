import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    console.log("BASEURLLLL",process.env.REACT_APP_BASE_URL);
    const baseURL = process.env.REACT_APP_BASE_URL;
    console.log("URLLLL",baseURL);
    const params = new URLSearchParams({
      phonenumber: userCredential.phoneNumber,
      password: userCredential.password
    }).toString();
    const url =
    `${baseURL}/auth/login?` +
    params;
    const res = await axios.post(url, userCredential);
    console.log('res: ', res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

