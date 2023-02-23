import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PostHandlePopup from "./popup/PostHandlePopup";
import { Switch, Typography } from "@material-ui/core";
import { ChatBubbleOutline } from "@material-ui/icons";
import CommentExpand from "./comment/CommentExpand";
import PostDetail from "../../pages/postDetail/PostDetail";
import PostMedia from "../postMedias/PostMedia";
require("dotenv").config();

export default function Post({ post }) {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;


  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [isExpandComment, setIsExpandComment] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(post.user);
  }, [post.user]);

  const likeHandler = async () => {
    try {
      const params = new URLSearchParams({
        id: post.id,
        token: currentUser.token,
      }).toString();
      const uri = `${process.env.REACT_APP_BASE_URL}/like/like?` + params;
      const likeResponse = await axios.post(uri);
      console.log("likeResponse: ", likeResponse);
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked === "1" ? parseInt(like) - 1 : parseInt(like) + 1);
    setIsLiked(isLiked === "0" ? "1" : "0");
  };
  console.log("postttttt", post);
  let postOneImgUrl = "";
  if (post.mediaMaps?.length === 1) {
    postOneImgUrl =
      `${process.env.REACT_APP_NODEJS_BE_FILE_FOLDER}` +
      post.mediaMaps[0].media.link;
    console.log("postImgUrl", postOneImgUrl);
  }

  return (
    <>
      <div className="post">
        <>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.id}`}>
                  <img
                    className="postProfileImg"
                    src={user.avatar ? `${mediaUrl}/${user.avatar}` : PF + "person/noAvatar.png"}
                    alt=""
                  />
                </Link>
                <span className="postUsername">{user.name}</span>
                <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className="postTopRight">
                <PostHandlePopup
                  post={post}
                  currentUser={currentUser}
                ></PostHandlePopup>
              </div>
            </div>
            {/* <Link to={`/posts/${post.id}`}   post={post}>
              <div className="postCenter" onClick={
                ()=>{
                 console.log("Clickkkkk");
               
                    // return   <PostDetail post={post}/>
                    return <PostDetail post={post}></PostDetail>
                  
                }
              }> */}
                {post.description && (
                  // <span className="postText">{post.described}</span>
                  <Typography>{post.description}</Typography>
                )}
                {post.mediaMaps?.length === 1 && (
                  <img
                    className="postImg"
                    src={postOneImgUrl}
                    alt={post.description}
                  />
                )}

                {post.mediaMaps?.length > 1 && (
                  <PostMedia mediaMaps={post.mediaMaps}></PostMedia>
                  // <PostDetail images={post.mediaMaps}></PostDetail>
                )}
                {post.video && (
                  <video
                    className="postVideo"
                    width="750"
                    height="700"
                    controls
                  >
                    <source src={post.video.url} type="video/mp4" />
                  </video>
                )}
              {/* </div> */}
            {/* </Link> */}
            {/* <hr className="sidebarHr" /> */}
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
                {isLiked === "0" && (
                  <span className="postLikeCounter">{like}</span>
                )}
              </div>
              <div
                className="postBottomRight"
                onClick={() => {
                  setIsExpandComment(!isExpandComment);
                }}
              >
                <img
                  className="likeIcon"
                  src={`${PF}comment.png`}
                  onClick={likeHandler}
                  alt=""
                />
                {/* <span className="postCommentText">{post.comment} comments</span> */}
              </div>
            </div>
            {/* <hr className="sidebarHr" /> */}
          </div>

          {isExpandComment && <CommentExpand postId={post?.id} />}
        </>
      </div>
    </>
  );
}
