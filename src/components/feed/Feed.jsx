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

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  // const [isHandlePostOpen,setHandlePostOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams({
        token: user.data.token,
        count: 30,
        index: 0,
      }).toString();
      const url =
        `${process.env.REACT_APP_BASE_URL}/post/get_list_posts?` + params;
      const res = username ? await axios.post(url) : await axios.post(url);
      console.log("res: ", res.data.data);
      //  await axios.get("/posts/profile/" + username)
      // : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.data.posts.sort((p1, p2) => {
          return new Date(p2.created) - new Date(p1.created);
        })
      );
    };
    fetchPosts();
  }, [username, user.data.token]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}

          {posts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
      {/* <Modal></Modal> */}
    </>
  );
}
