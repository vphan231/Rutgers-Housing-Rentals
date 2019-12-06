import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Container from "react-bootstrap/Container";

// Pages
import MainPage from "./pages/index";
import Listing from "./pages/listing";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFoundPage from "./pages/404";

class App extends Component {
   

  render() {
    return (
      <Container>
        <Router> 
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/listing/:id" children={<Listing />} />
            <Route exact path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
