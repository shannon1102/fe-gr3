import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import AppButton from "../../components/AppButton/AppButton";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [files, setFiles] = useState(null);

  const fileOpts = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  fileOpts.headers.Authorization = "Bearer " + user.token;

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + user.token;

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/posts?`;

    if (files) {
      try {
        console.log("file: ", files, typeof files);
        const fileArr = Array.from(files);

        const uploadFilesReps = await Promise.all(
          fileArr.map(async (file) => {
            const data = new FormData();
            data.append("files", file);

            let uploadedMedia = await axios.post(mediaUrl, data, fileOpts);
            console.log("uploadMediaRes", uploadedMedia);
            return uploadedMedia.data.result[0].id;
          })
        );

        // const uploadMediaRes = await axios.post(mediaUrl, data,opts);
        console.log("uploadMediaRes", uploadFilesReps);
        await axios.post(
          url,
          { description: desc.current.value, media: [...uploadFilesReps] },
          opts
        );

        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(url, { description: desc.current.value }, opts);
        window.location.reload(true);
      } catch (err) {}
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.avatar
                ? `${mediaUrl}/${user.avatar}`
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"Bạn đang nghĩ gì " + user.name + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <div className="shareHr" />
        {files && (
          <div className="shareImgContainer">
            {files[0].type.split("/")[0] === "image" && (
              <img
                className="shareImg"
                src={URL.createObjectURL(files[0])}
                alt=""
              />
            )}
            {files[0].type.split("/")[0] === "video" && (
              <video width="750" height="500" controls>
                <source src={URL.createObjectURL(files[0])} type="video/mp4" />
              </video>
            )}
            <Cancel className="shareCancelImg" onClick={() => setFiles(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Ảnh/videos</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={(e) => setFiles(e.target.files)}
                multiple
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            */}
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Cảm thấy</span>
            </div>
          </div>
          <AppButton
            text="Đăng"
            type="submit"
            isLoading={false}
            addtionalStyles={{
              width: "90px",
              height: "36px",
              borderRadius: "6px",
            }}
          ></AppButton>
        </form>
      </div>
    </div>
  );
}
