import React, { Component } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// Pages
import MainPage from "./pages/index";
import Listing from "./pages/listing";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateListing from "./pages/createlisting";
import MyListings from "./pages/mylistings";
import NotFoundPage from "./pages/404";
import PrivateRoute from "./private-route/PrivateRoute";
import EditListingPage from "./pages/editlisting";

// Components
import Navigation from "./components/Navigation";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

//               <Route exact path="/mylistings" component={MyListings} />

// Components
class App extends Component {
  render() {
    return (
      <Container>
        <Provider store={store}>
          <Router>
            <Navigation />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/editlisting" component={EditListingPage} />

              <Route exact path="/createlisting" component={CreateListing} />

              <Route
                path="/listing/:id"
                render={props => <Listing {...props} key={Math.random()} />}
              />
              <Route exact path="/404" component={NotFoundPage} />

              <Switch>
                <PrivateRoute exact path="/mylistings" component={MyListings} />
                <Redirect to="/404" />
              </Switch>
            </Switch>
          </Router>
        </Provider>
      </Container>
    );
  }
}
export default App;
