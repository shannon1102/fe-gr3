import React from "react";
import "./inputFormComment.css";
import { Send } from "@material-ui/icons";
export default function InputFormComment({ user, forwardedRef, sendCmtClick }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <>
        <div className="commentInputContainer">
          <img
            className="commentProfileImg"
            src={
              user.avatar ? user.avatar : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="commentInput"
            ref={forwardedRef}
          />
          <Send onClick={sendCmtClick} className="commentSend" />
        </div>
      </>
    </div>
  );
}
