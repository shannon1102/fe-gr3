import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.data.id,
      desc: desc.current.value,
    };
    const params = new URLSearchParams({
      described: desc.current.value,
      status: "hạnh phúc",
      token: user.data.token
    }).toString();
    const url =
    `${process.env.REACT_APP_BASE_URL}post/add_post?` +
    params;

    if (file) {
      console.log('file: ', file);
      const data = new FormData();
   
      if(file.type.split("/")[0] === "video") {
        data.append("video", file);
      }
      if(file.type.split("/")[0] === "image") {
        data.append("image", file);
      }
      console.log(newPost);
      try {
        await axios.post(url, data);
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    }else {
      try {
        await axios.post(url);
        window.location.reload(true);
      } catch (err) {}
    };

    }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.data.avatar
                ? user.data.avatar
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            {(file.type.split("/")[0] === "image") && <img className="shareImg" src={URL.createObjectURL(file)} alt="" />}
            {(file.type.split("/")[0] === "video") &&  <video width="750" height="500" controls ><source src={URL.createObjectURL(file)} type="video/mp4"/></video>}
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
