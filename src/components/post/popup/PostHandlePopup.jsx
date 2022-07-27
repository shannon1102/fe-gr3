import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./postHandlePopup.css";
import axios from "axios";

import { MoreVert } from "@material-ui/icons";
export default function PostHandlePopup({ post, currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      const params = new URLSearchParams({
        id: post.id,
        token: currentUser.data.token,
      }).toString();
      const uri = `${REACT_APP_BASE_URL}/post/delete_post?` + params;
      console.log("uri: ", uri);
      const deleteResp = await axios.post(uri);
      console.log('deleteResp: ', deleteResp);
      setAnchorEl(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    setAnchorEl(null);
  };

  const checkOwner = (post, currentUser) => {
    if (post?.author.id === currentUser.data.id) return true;
    return false;
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginRight: "30px" }}
      >
        {console.log(post, currentUser)}
        {checkOwner(post, currentUser) && (
          <MenuItem onClick={handleEdit}>Edit Port</MenuItem>
        )}
        {checkOwner(post, currentUser) && (
          <MenuItem onClick={handleDelete}>Delete Port</MenuItem>
        )}
        <MenuItem onClick={handleReport}>Report Port</MenuItem>
      </Menu>
    </div>
  );
}
