import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      const params = new URLSearchParams({
        token: currentUser.data.token,
        // user_id: userID,
        index: 0,
        count: 100,
      }).toString();

      const url =
        `${process.env.REACT_APP_BASE_URL}/friend/get_user_friends?` + params;

      const res = await axios.post(url);
      console.log("res chat online: ", res);
      setFriends(res?.data?.data);
    };

    getFriends();
  }, [currentId]);

  // useEffect(() => {
  //   setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  // }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const params = new URLSearchParams({
        token: currentUser.data.token,
        // user_id: userID,
        partner_id: user.id,
        // conversation_id: 1,

        index: 0,
        count: 100,
      }).toString();

      const url =
        `${process.env.REACT_APP_BASE_URL}/chat/get_conversation?` + params;

      const res = await axios.post(url);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.avatar
                  ? o?.avatar
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username || "user" + o?.id.substring(0, 8)}</span>
        </div>
      ))}
    </div>
  );
}
