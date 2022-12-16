import { MoreVert } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import "./comment.css";
import {
  Typography,
} from "@material-ui/core";
export default function Comment({ comment }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="cmtContainer">
      <img
        className="cmtUserAvatar"
        src={
          comment?.poster?.avatar
            ? comment?.poster?.avatar
            : PF + "person/noAvatar.png"
        }
        alt=""
      />

      <div className="cmtRight">
        <>
          <p className="cmtRightUser"> {comment?.poster.name}</p>
          {/* <textarea className="cmtRightComment" type="textarea" row={5} defaultValue={comment?.comment}></textarea> */}
          <Typography>{comment?.comment}</Typography>
        </>
      </div>
      <MoreVert />
    </div>
  );
}
