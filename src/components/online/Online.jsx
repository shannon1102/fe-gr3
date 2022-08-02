import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";

export default function Online({ userID }) {
  const { user: currentUser } = useContext(AuthContext);
  const [onlineUser, setOnlineUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {

    const params = new URLSearchParams({
      token: currentUser.data.token,
      user_id: userID,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/user/get_user_info?` + params;
    const fetchUser = async () => {
      const res = await axios.post(url);
      console.log("res get Info: ", res.data);
      setOnlineUser(res.data.data);
      console.log("Onl USer",onlineUser)
    };
    fetchUser();
  }, [userID, currentUser]);

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={`/profile/${onlineUser?.id}`}>
          <img
            className="rightbarProfileImg"
            src={
              onlineUser?.avatar
                ? onlineUser?.avatar
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{onlineUser?.username || "user" + onlineUser?.id.substring(0, 8)}</span>
    </li>
  );
}
