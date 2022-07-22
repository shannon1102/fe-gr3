import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log("PF: ", PF);
  const { user: currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   setIsLiked(post.is_liked);
  // }, [currentUser.data.token, post.like, post.is_liked]);

  useEffect(() => {
    setUser(post.author);
  }, [post.author]);

  const likeHandler = () => {
    try {
      const params = new URLSearchParams({
        id: post.id,
        token: currentUser.data.token,
      }).toString();
      const uri =
        "https://social-be-2022.herokuapp.com/balo/like/like?" + params;
      axios.post(uri);
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked === "1" ? parseInt(like) - 1 : parseInt(like) + 1);
    setIsLiked(isLiked === "0" ? "1" : "0");
  };
  console.log("isLiked",isLiked)
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.avatar ? user.avatar : PF + "person/noAvatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.created)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {post.described && <span className="postText">{post.described}</span>}
          {post.image && (
            <img className="postImg" src={post.image[0].url} alt="" />
          )}
          {post.video && <video width="750" height="500" controls ><source src={post.video.url} type="video/mp4"/>
</video>}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            {isLiked==="1" && <span className="postLikeCounter">You and {parseInt(like)-1} others like it</span>}
            {isLiked === "0" && <span className="postLikeCounter">{like}</span>}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
