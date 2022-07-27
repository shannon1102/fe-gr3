import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutDropDown from "./logoutDropDown/LogoutDropDown";
// import Popup from "../post/popup/PostHandlePopup";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // let userID = user.data.id;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <Link to={`/friend`} style={{ textDecoration: "none" }}>
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.data.id}`}>
          <img
            src={
              user.data.avatar ? user.data.avatar : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>

        <LogoutDropDown currentUser={user.data}></LogoutDropDown>
      </div>
    </div>
  );
}
