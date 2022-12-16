import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Friend from "./pages/friend/Friend";
import PostDetail from "./pages/postDetail/PostDetail";
import Renting from "./pages/renting/Renting"
import CreatePost from "./pages/createpost/createPost"
require('dotenv').config()

function App() {
  const { user } = useContext(AuthContext);
  console.log('user: ', user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home user={user}/> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/friend">
          {/* {!user ? <Redirect to="/" /> : <Messenger />} */}
          <Friend/>
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:user_id">
          <Profile />
        </Route>
        <Route path="/postdetail">
          <PostDetail />
        </Route>
        <Route path="/renting">
          <Renting  user={user}/>
        </Route>
        <Route path="/createpost">
          <CreatePost  user={user}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
