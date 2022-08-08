import * as React from "react";
// import { styled } from "@material-ui/core";
import { Grid, Box } from "@material-ui/core";
import SuggestFriend from "./suggestFriend/SuggestFriend";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

export default function SuggestFriendList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [suggestUser, setSuggestUser] = useState([]);
  // const userID = useParams().user_id;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    const params = new URLSearchParams({
      token: currentUser.data.token,
      index: 0,
      count: 50,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/friend/get_list_suggested_friends?` +
      params;
    const fetchUser = async () => {
      const res = await axios.post(url);
      console.log("res get suggested friend: ", res.data);
      console.log(res?.data?.data?.list_user);
      setSuggestUser(res?.data?.data?.list_users);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <>
        {suggestUser?.length > 0 && (
          <>
            <h1>Suggested Friends</h1>
            <hr className="hrFiend"></hr>
          </>
        )}
      </>

      <Box
        // sx={{ flexGrow: 1 }}
        sx={{ width: 300 }}
      >
        <Grid container spacing={3}>
          {suggestUser?.length > 0 &&
            suggestUser.map((user) => (
              <Grid item xs={2} key={user.user_id}>
                <SuggestFriend user={user} curUser={currentUser}>
                  {" "}
                </SuggestFriend>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
