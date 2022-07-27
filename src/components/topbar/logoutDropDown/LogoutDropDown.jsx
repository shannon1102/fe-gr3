import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./logoutDropDown.css";
import { ArrowDropDown } from "@material-ui/icons";
// import axios from "axios";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LogoutDropDown({ currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async (e) => {
    try {
      console.log("Logout clicked");
      const params = new URLSearchParams({
        token: currentUser.data.token,
      }).toString();
      const uri =
        `${process.env.REACT_BASE_URL}/balo/auth/logout?` + params;
      console.log("uri: ", uri);

      const logOutResponse = await axios.post(uri);
      console.log("logOutResponse: ", logOutResponse);
      localStorage.removeItem("user");
      // e.preventDefault();
      // logoutCall(
      //   { token: currentUser.data.token },
      //   dispatch
      // );

      setAnchorEl(null);
    } catch (error) {}
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
        <ArrowDropDown />
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
       <MenuItem onClick={handleLogout}><Link to={`/login`}>Log out</Link></MenuItem>
      </Menu>
    </div>
  );
}
