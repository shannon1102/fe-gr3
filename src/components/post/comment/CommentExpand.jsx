import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import InputFormComment from "./inputFormComment/InputFormComment";
import ListComment from "./listComent/ListComment";
import './commentExpand.css'
export default function CommentExpand({ postId }) {
  const { user: currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const cmtRef = useRef();
  useEffect(() => {
    const params = new URLSearchParams({
      token: currentUser.token,
      id: postId,
      index: 0,
      count: 100,
    }).toString();

    const url =
      `${process.env.REACT_APP_BASE_URL}/comment/get_comment?` + params;
    const fetchComment = async () => {
      const res = await axios.post(url);
      console.log("res get comments: ", res?.data?.data);
      setComments([...res?.data?.data]);
    };
    fetchComment();
  },[]);
  const handleSendComment = async () => {
    console.log("Alooo0000000000000",)
    try {
      const params = new URLSearchParams({
        token: currentUser.token,
        id: postId,
        comment: cmtRef.current.value,
        index: 0,
        count: 100,
      }).toString();
      console.log("Check data",cmtRef.current.value);

      const url =
        `${process.env.REACT_APP_BASE_URL}/comment/set_comment?` + params;
  
        const res = await axios.post(url);
        console.log("res get comments: ", res?.data?.data);
        setComments(res?.data?.data);

    } catch (error) {}
  };

  return (
    <div>
      <>
        <InputFormComment
          user={currentUser}
          forwardedRef={cmtRef}
          sendCmtClick={handleSendComment}
        />
        <ListComment comments={comments} />
      </>
    </div>
  );
}
