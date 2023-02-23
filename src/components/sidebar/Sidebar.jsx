import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline
} from "@material-ui/icons";
import "./sidebar.css";
export default function Sidebar() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      paperSidebar: {
        width: "100%",
        height: "60px",
        maxWidth: "350px",
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "10px",
      },
    })
  );
  const classes = useStyles();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Bài viết</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Tin nhắn</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Bạn bè</span>
          </li>
          <hr className="sidebarHr" />
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Quản lý mua bán</span>
          </li>

          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Lịch trình</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <hr className="sidebarHr" />
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
        </ul>
        <div className="sidebar__copyright">
          © Copyright {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
