import * as React from "react";
// import { styled } from "@material-ui/core";
import { Grid, Box } from "@material-ui/core";
import RequestFriend from "./requestItem/RequestFriend";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import './requestFriendList.css'

export default function RequestFriendList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [requestUser, setRequestUser] = useState([]);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams({
      token: currentUser.data.token,
      index: 0,
      count: 50,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/friend/get_requested_friends?` +
      params;
    const fetchUser = async () => {
      const res = await axios.post(url);
      console.log("res get request friend Info: ", res.data);
      setRequestUser(res.data?.data.request);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <>
        {requestUser?.length > 0 && (
          <>
            <h1>Request Friends</h1>
            <hr className="hrFiend"></hr>
          </>
        )}
      </>
      <Box
        sx={{ flexGrow: 1 }}
        // sx={{ width: 300 }}
      >
        <Grid container spacing={3}>
          {requestUser?.length > 0 &&
            requestUser.map((user) => (
              <Grid item xs={2} key={user.id}>
                <RequestFriend user={user} curUser={currentUser}>
                </RequestFriend>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
