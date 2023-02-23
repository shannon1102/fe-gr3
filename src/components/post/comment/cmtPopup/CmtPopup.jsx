import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./postHandlePopup.css";
import axios from "axios";

import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import Modal from "../modal/Modal";
export default function CmtPopup({ post, currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const open = Boolean(anchorEl);
  const [isEditPost,setIsEditPost] = useState(false);
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
        token: currentUser.token,
      }).toString();
      const uri = `${baseUrl}/comment/delete_comment?` + params;
      console.log("uri: ", uri);
      const deleteResp = await axios.post(uri);
      console.log('deleteResp: ', deleteResp);
      setAnchorEl(null);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = () => {
    setIsEditPost(true);

    setAnchorEl(null);
  };

  const handleReport = () => {
    setAnchorEl(null);
  };

  const checkOwner = (post, currentUser) => {
    if (post?.user.id === currentUser.id) return true;
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
          <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
        )}
        {checkOwner(post, currentUser) && (
          <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
        )}
        <MenuItem onClick={handleReport}>Report Post</MenuItem>
      </Menu>
    
    {isEditPost && <Modal  post={post} currentUser= {currentUser} setIsOpen={setIsEditPost}/>}
   
    </div>
  );
}
