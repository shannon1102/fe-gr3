import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const name = useRef();
  const phoneNumber = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        name: name.current.value,
        phoneNumber: phoneNumber.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={name}
              className="registerInput"
            />
            <input
              placeholder="Phone number"
              required
              ref={phoneNumber}
              className="registerInput"
              type="tel"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
