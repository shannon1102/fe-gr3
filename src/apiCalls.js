import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const params = new URLSearchParams({
      phonenumber: userCredential.phoneNumber,
      password: userCredential.password
    }).toString();
    const url =
    "https://social-be-2022.herokuapp.com/balo/auth/login?" +
    params;
    const res = await axios.post(url, userCredential);
    console.log('res: ', res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

