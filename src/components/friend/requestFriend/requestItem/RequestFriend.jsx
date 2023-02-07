import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import "./requestItem.css";
import axios from "axios";
export default function RequestFriend({ user,curUser }) {
  const handleAcceptClick = async ()=>{
    try {
      const params = new URLSearchParams({
        token: curUser.token,
        user_id:user.id,
        is_accept: 1
      }).toString();
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friend/set_accept_friend?` + params;
      const acceptResponse = await axios.post(uri);
      console.log('friend Response: ', acceptResponse);
      window.location.reload(true);

    } catch (err) {
      console.log(err);
    }
  };


  const handleRemoveClick =async ()=>{
    try {
      const params = new URLSearchParams({
        token: curUser.token,
        user_id:user.id,
        is_accept: 0
      }).toString();
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friend/set_accept_friend?` + params;
      const rejectesponse = await axios.post(uri);
      window.location.reload(true);
      console.log('rejectesponse: ', rejectesponse);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={ user?.avatar ? user?.avatar : "/assets/person/noAvatar.png"}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.username || "Lizard Alina"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.same_friends + " same friend"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          style={{ backgroundColor: "#2374E1", color: "#F3F8FE" }}
          onClick={handleAcceptClick}
        >
          Accept
        </Button>
        <Button
          size="medium"
          style={{ backgroundColor: "#606770", color: "#F3F8FE" }}
          onClick={handleRemoveClick}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
