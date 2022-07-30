import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import EditUserInfoModal from "./editUserInfoModal/EditUserInfoModal";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [updateAvatarUrl, setUpdateAvatarUrl] = useState(null);
  const userID = useParams().user_id;
  // const [isEditUserInfo,setEditUserInfo] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const avatarUploadRef = useRef(null);

  function handleChangeAvatar(e) {
    setUpdateAvatarUrl(URL.createObjectURL(e.target.files[0]));

    // TODO: API to update to server

  }

  useEffect(() => {
    console.log("dadadad value", userID);
    console.log("dadadad", typeof userID);
    const params = new URLSearchParams({
      token: currentUser.data.token,
      user_id: userID,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/user/get_user_info?` + params;
    const fetchUser = async () => {
      const res = await axios.post(url);
      console.log("res get Info: ", res.data);
      setUser(res.data.data);
    };
    fetchUser();
  }, [userID, currentUser]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.cover_image
                    ? user.cover_image
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <input ref={avatarUploadRef} type="file" hidden onChange={handleChangeAvatar}></input>
              <img
                className="profileUserImg"
                src={updateAvatarUrl != null ? updateAvatarUrl : (user.avatar ? user.avatar : PF + "person/noAvatar.png")}
                alt=""
                onClick={() => avatarUploadRef.current.click()}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={userID} />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>

    </>
  );
}
