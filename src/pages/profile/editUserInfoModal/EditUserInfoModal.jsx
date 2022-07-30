import { Button } from "@material-ui/core";
import { Cancel, CloseRounded, CloudUpload } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import "./editUserInforModal.css";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

export default function EditUserInfoModal({ currentUser, setIsOpen }) {
  const username = useRef();
  const description = useRef();
  const city = useRef();
  const country = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const avatarUploadRef = useRef(null);
  const coverrUploadRef = useRef(null);
  const [updateAvatarUrl, setUpdateAvatarUrl] = useState(null);
  const [updateCoverUrl, setUpdateCoverUrl] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // loginCall(
    //   { phoneNumber: phoneNumber.current.value, password: password.current.value },
    //   dispatch
    // );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      username: username.current.value,
      description: description.current.value,
      city: city.current.value,
      country: country.current.value,
      token: user.data.token,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/user/set_user_info?` + params;

    if (fileCover || fileAvatar) {
      console.log("fileCover: ", fileCover);
      console.log("fileAvatar: ", fileAvatar);
      const data = new FormData();

      if (fileCover.type.split("/")[0] === "image") {
        data.append("cover_image", fileCover);
      }
      if (fileAvatar.type.split("/")[0] === "image") {
        data.append("avatar", fileAvatar);
      }

      try {
        await axios.post(url, data);
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(url);
        window.location.reload(true);
      } catch (err) {}
    }
  };

  function handleChangeAvatar(e) {
    // const img = ref.current.files[0];
    // const obj = URL.createObjectURL(img);
    // setUrl(obj);
    console.log("e", e.target);
    console.log("e Src", e.baseURI);
    console.log("SSSSS", e.target.getAttribute("src"));
    setUpdateAvatarUrl(URL.createObjectURL(e.target?.files[0]));
    setFileAvatar(e.target.files[0]);

    // TODO: API to update to server
  }
  function handleChangeCover(e) {
    console.log("e", e.target);
    console.log("e Src", e.baseURI);
    console.log("SSSSS", e.target.getAttribute("src"));
    setUpdateCoverUrl(URL.createObjectURL(e.target?.files[0]));
    setFileCover(e.target.files[0]);
  }
  return (
    <div className="editUserModalContainer">
      <div className="editUserModal">
        <div className="editUserModalHeader">
          <h2>Update user information</h2>
          <Button
            className="editUserCloseBtnModal"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CloseRounded />
          </Button>
        </div>
        <hr className="editUserHr" />
        <div className="editUserModalBody">
          <>
            {fileCover && (
              <div className="editUserCoverImgContainer">
                {fileCover.type.split("/")[0] === "image" && (
                  <img
                    className="editUserCover"
                    src={URL.createObjectURL(fileCover)}
                    alt=""
                  />
                )}
                {fileCover.type.split("/")[0] === "video" && (
                  <video width="750" height="500" controls>
                    <source
                      src={URL.createObjectURL(fileCover)}
                      type="video/mp4"
                    />
                  </video>
                )}
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFileCover(null)}
                />
              </div>
            )}
            {fileCover == null && (
              <div className="editUserCoverImgContainer">
                <img
                  className="editUserCover"
                  // src={PF + "noBackground.jpg"}
                  src={PF + "person/noCover.jpg"}
                  alt=""
                />
              </div>
            )}

            <div className="uploadCoverBtn">
              <label for="cover-upload" className="uploadLabel">
                <CloudUpload htmlColor="tomato" className="uploadIcon" />
                <span>
                  <h3>Profile cover picture</h3>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="cover-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileCover(e.target.files[0])}
                />
              </label>
            </div>

            {/* <div className="editUserAvatarContainer"> */}
            {fileAvatar == null && (
              <img
                className="editUserAvatar"
                src={
                  updateAvatarUrl != null
                    ? updateAvatarUrl
                    : currentUser.avatar
                    ? currentUser.avatar
                    : PF + "person/noAvatar.png"
                }
                alt=""
                ref={avatarUploadRef}
              ></img>
            )}
            {fileAvatar && (
              <img
                className="editUserAvatar"
                src={URL.createObjectURL(fileAvatar)}
                alt=""
                ref={avatarUploadRef}
              ></img>
            )}

            <div className="uploadAvatarBtn">
              <label for="avatar-upload" className="uploadLabel">
                <CloudUpload htmlColor="tomato" className="uploadIcon" />

                <span>
                  <h3> Avatar picture</h3>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="avatar-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileAvatar(e.target.files[0])}
                />
              </label>
            </div>

            <hr className="editUserHr" />

            <form className="editUserBox" onSubmit={handleSubmit}>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  User name
                </label>
                <input
                  label="Username"
                  placeholder="Trai BK"
                  minLength="6"
                  type="text"
                  required
                  className="editUserInput"
                  ref={username}
                  id="editUserUsername"
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Description
                </label>
                <input
                  placeholder="BugsMaker"
                  type="text"
                  required
                  minLength="6"
                  className="editUserInput"
                  ref={description}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  City
                </label>
                <input
                  placeholder="Ha Noi"
                  type="text"
                  required
                  className="editUserInput"
                  ref={city}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Country
                </label>
                <input
                  placeholder="Vietnam"
                  type="text"
                  required
                  minLength="6"
                  className="editUserInput"
                  ref={country}
                />
              </div>

              <button
                className="editUserSubmitButton"
                type="submit"
                disabled={isLoading}
                onClick={submitHandler}
              >
                {isLoading ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </>
        </div>
      </div>
    </div>
  );
}
