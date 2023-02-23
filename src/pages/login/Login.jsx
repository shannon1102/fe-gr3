import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
require('dotenv').config()

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">TroNet</h3>
          <span className="loginDesc">
            Kết bạn với tất cả mọi người trên TroNet.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="tel"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Mật khẩu"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Đăng nhập"
              )}
            </button>
            <span className="loginForgot">Quên mật khẩu?</span>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <button
                className="loginRegisterButton"
                onClick={() => {
                  // return
                }}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Tạo mới tài khoản"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
