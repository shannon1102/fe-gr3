import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
// import Modal from "../post/modal/Modal";

export default function Feed({ userID }) {
  console.log('userID in feed: ', userID);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  // const [isHandlePostOpen,setHandlePostOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams({
        token: user.token,
        limit: 30,
        offset: 0,
      }).toString();
      const profileParams = new URLSearchParams({
        token: user.token,
        limit: 30,
        user_id:userID,
        offset: 0,
      }).toString();
      let url ='';
      if(userID) {
        url =
        `${process.env.REACT_APP_BASE_URL}/posts?` + profileParams;
      }else {
        url =
          `${process.env.REACT_APP_BASE_URL}/posts`;
      }
      const res =  await axios.get(url) ;
      console.log("res: ", res.data);
      //  await axios.get("/posts/profile/" + username)
      // : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.result.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userID, user.token]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {(!userID || userID === user.id) && <Share />}

          {posts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
      {/* <Modal></Modal> */}
    </>
  );
}
