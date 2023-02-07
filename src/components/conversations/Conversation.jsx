import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log("conversation",conversation)
    const friend = conversation.partner;

    const getUser = async () => {
      try {
        const params = new URLSearchParams({
          token: currentUser.token,
          user_id: friend.id,
      
        }).toString();
  
        const url =
          `${process.env.REACT_APP_BASE_URL}/user/get_user_info?` + params;
  
        const res = await axios.post(url);
        console.log('res friend in conversation: ', res);
        setUser(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.avatar
            ? user?.avatar
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username || "user" + user?.id.substring(0, 8)}</span>
    </div>
  );
}
