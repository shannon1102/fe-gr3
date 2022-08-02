import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            message?.sender?.avatar
                  ? message?.sender?.avatar
                  : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.message}</p>
      </div>
      <div className="messageBottom">{format(message.created)}</div>
    </div>
  );
}
