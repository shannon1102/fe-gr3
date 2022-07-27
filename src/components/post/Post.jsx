import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PostHandlePopup from "./popup/PostHandlePopup";


export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);


  useEffect(() => {
    setUser(post.author);
  }, [post.author]);

  const likeHandler = async () => {
    try {
      const params = new URLSearchParams({
        id: post.id,
        token: currentUser.data.token,
      }).toString();
      const uri =
        `${process.env.REACT_APP_BASE_URL}/like/like?` + params;
      const likeResponse = await axios.post(uri);
      console.log('likeResponse: ', likeResponse);
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked === "1" ? parseInt(like) - 1 : parseInt(like) + 1);
    setIsLiked(isLiked === "0" ? "1" : "0");
  };


  return (
    <>
    
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.id}`}>
              <img
                className="postProfileImg"
                src={user.avatar ? user.avatar : PF + "person/noA vatar.png"}
                alt=""
              />  
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.created)}</span>
          </div>
          <div className="postTopRight">
            <PostHandlePopup post={post} currentUser= {currentUser}>
           
            </PostHandlePopup>  
          </div>

        </div>
   
        <div className="postCenter">
          {post.described && <span className="postText">{post.described}</span>}
          {post.image && (
            <img className="postImg" src={post.image[0].url} alt="" />
          )}
          {post.video && (
            <video width="750" height="500" controls>
              <source src={post.video.url} type="video/mp4" />
            </video>
          )}
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
            {isLiked === "1" && (
              <span className="postLikeCounter">
                You and {parseInt(like) - 1} others like it
              </span>
            )}
            {isLiked === "0" && <span className="postLikeCounter">{like}</span>}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      
      </div>
    </div>
    </>
  );
}
