import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Paper } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
export default function Sidebar() {
  const useStyles = makeStyles((theme) =>
  createStyles({
    paperSidebar: {
      width: "100%",
      height: "60px",
      maxWidth: "350px",
      display: "flex",
      alignItems: "center",
      alignSelf:"center",
      marginBottom:"10px"
  }}))
  const classes = useStyles();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Bài viết</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Tin nhắn</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Bạn bè</span>
          </li>
          </Paper>
      
      <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Quản lý mua bán</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Lịch trình</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          </Paper>
          <Paper className={classes.paperSidebar} zDepth={2}>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          </Paper>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
