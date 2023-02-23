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
                  ? `${process.env.REACT_APP_MEDIA_URL}/${message?.sender?.avatar}`
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
