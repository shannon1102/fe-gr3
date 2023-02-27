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
import Renting from "./pages/renting/Renting";
import CreatePost from "./pages/createpost/createPost";
import PrivateRoute from "./shared/PrivateRoute";
import Market from "./pages/market/Market";
import List from "./pages/list/List";
import Product from "./pages/hotel/Product";
import ChatBox from "./components/chatting/ChatBox";
import "./global.css"
import Checkout from "./components/markets/checkout/Checkout";
import Review from "./components/markets/checkout/Review";
require("dotenv").config();

function App() {
  const { user } = useContext(AuthContext);
  console.log("user: ", user);
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          allowVisit={!!user}
          component={Home}
          redirectTo={"/login"}
        ></PrivateRoute>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <PrivateRoute
          path="/friend"
          exact
          allowVisit={!!user}
          component={Friend}
          redirectTo={"/login"}
        ></PrivateRoute>
        <PrivateRoute
          path="/messenger"
          exact
          allowVisit={!!user}
          component={Messenger}
          redirectTo={"/login"}
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/:user_id"
          allowVisit={!!user}
          component={Profile}
          redirectTo={"/login"}
        ></PrivateRoute>
        <PrivateRoute
          path="/posts/:post_id"
          allowVisit={!!user}
          component={PostDetail}
          // props={}
          redirectTo={"/login"}
        >
          <PostDetail />
        </PrivateRoute>
        <PrivateRoute
          path="/renting"
          allowVisit={!!user}
          component={Renting}
          redirectTo={"/login"}
          user={user}
        ></PrivateRoute>
       
        <PrivateRoute path="/products/:id">
          <Product />
        </PrivateRoute >
        <PrivateRoute path="/market/new">
          <CreatePost user={user} />
        </PrivateRoute>
        <PrivateRoute path="/market">
          <Market />
        </PrivateRoute>
        <PrivateRoute path="/products">
          <List  />
        </PrivateRoute>
        <PrivateRoute path="/testcomponent">
          <ChatBox  />
        </PrivateRoute>
        <PrivateRoute path="/checkout">
          <Checkout  />
        </PrivateRoute>
        <PrivateRoute path="/review">
          <Review  />
        </PrivateRoute>
   

      </Switch>
    </Router>
  );
}

export default App;
