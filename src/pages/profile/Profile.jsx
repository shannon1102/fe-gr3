import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const userID = useParams().user_id;
  const { user: currentUser } = useContext(AuthContext);
  // useEffect(() => {
  //   const params = new URLSearchParams({
  //     token: currentUser.data.token,
  //     user_id: currentUser.data.id,
  //   }).toString();
  //   const url =  `${peocess.env.REACT_APP_PUBLIC_FOLDER}/user/get_user_info?`+ params
  //   const getUserInfo = async () => {
  //     const res = await axios.post(url);
  //     setUser(res.data);
  //   };
  // },[username]);
  useEffect(() => {
    console.log("dadadad value", userID)
    console.log("dadadad",typeof userID)
    const params = new URLSearchParams({
          token: currentUser.data.token,
          user_id: userID,
        }).toString();
        const url =  `${process.env.REACT_APP_BASE_URL}/user/get_user_info?`+ params
    const fetchUser = async () => {
      const res = await axios.post(url);
      console.log('res get Info: ', res.data);
      setUser(res.data.data);
    };
    fetchUser();
  }, [userID,currentUser]);

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
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.avatar
                    ? user.avatar
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={userID} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
