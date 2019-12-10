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
// Pages
import MainPage from "./pages/index";
import Listing from "./pages/listing";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateListing from "./pages/createlisting";
import MyListings from "./pages/mylistings";
import NotFoundPage from "./pages/404";
import EditListingPage from "./pages/editlisting"
// Components
import Navigation from "./components/Navigation";
import Dashboard from "./pages/dashboard";
class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editlisting" component={EditListingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/mylistings" component={MyListings} />
            <Route path="/createlisting" component={CreateListing} />
            <Route path="/listing/:id" component={Listing} />
            <Route exact path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Container>
    );
  }
}
export default App;