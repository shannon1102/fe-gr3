import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Create } from "@material-ui/icons";
import EditUserInfoModal from "../../pages/profile/editUserInfoModal/EditUserInfoModal";
import { format } from "timeago.js";

export default function Rightbar({ user }) {
  console.log("user In Rightbar: ", user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const [followed, setFollowed] = useState(
    // currentUser.followings.includes(user?.id)
    true
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const params = new URLSearchParams({
          token: currentUser.data.token,
          user_id: currentUser.data.id,
          index: 0,
          count: 50,
        }).toString();
        const profileParams = new URLSearchParams({
          token: currentUser.data.token,
          user_id: user?.id,
          index: 0,
          count: 50,
        }).toString();
        let uri = "";
        if (user) {
          uri =
            `${process.env.REACT_APP_BASE_URL}/friend/get_user_friends?` +
            profileParams;
        } else {
          uri =
            `${process.env.REACT_APP_BASE_URL}/friend/get_user_friends?` +
            params;
        }
        axios.post(uri);
        const friendList = await axios.post(uri);
        console.log("friendList: ", friendList);
        setFriends(friendList.data.data.friends);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Huy Văn</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <Online key={u.id} userID={u.id} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    console.log("fiends", friends);
    return (
      <>
        {user.id === currentUser.data.id && (
          <button
            className="rightbarChangInfoButton"
            onClick={() => {
              setIsOpenEditUser(true);
            }}
          >
            {<Create />}
            <p>{"Edit information"}</p>
          </button>
        )}
        {user.id !== currentUser.data.id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {user.is_friend == "true" ? "Unfriend" : "Add friend"}
            {user.is_friend == "true"  ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          {user?.username && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Username:</span>
              <span className="rightbarInfoValue">{user?.username}</span>
            </div>
          )}
           {user?.description && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Description:</span>
              <span className="rightbarInfoValue">{user?.description}</span>
            </div>
          )}
          
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city || "Ha Noi"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country:</span>
            <span className="rightbarInfoValue">
              {user?.country || "Viet Nam"}
            </span>
          </div>
          {user?.created && (
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Date Join:</span>
              <span className="rightbarInfoValue">{format(user?.created)}</span>
            </div>
          )}
          
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user?.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {console.log('friends rightbar: ', user)}
          {friends?.map((friend) => (
          
            <Link
              to={"/profile/" + friend.id}
              style={{ textDecoration: "none" }}
              key={friend.id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend?.avatar ? friend?.avatar : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username || "user" + friend?.id.substring(0, 8)}
                </span>
              </div>
            </Link>
          ))}
        </div>
        {isOpenEditUser && (
          <EditUserInfoModal currentUser={user} setIsOpen={setIsOpenEditUser} />
        )}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
