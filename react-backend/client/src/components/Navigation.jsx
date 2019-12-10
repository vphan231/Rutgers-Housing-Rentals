import React from "react";
import { Link } from "react-router-dom";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

//Navigate bar on each page that leads to respective page
class Navigation extends React.Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    console.log("user", user);

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Roundabout Rentals</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav className="justify-content-end">
            {user.id && <Nav.Link href="/mylistings">My Listings</Nav.Link>}
            {user.id && (
              <Nav.Link href="/createlisting">Create Listing</Nav.Link>
            )}
            {user.id && (
              <Nav.Link onClick={this.onLogoutClick}>Logout</Nav.Link>
            )}
            {!user.id && <Nav.Link href="/login">Login</Nav.Link>}
            {!user.id && <Nav.Link href="/register">Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navigation);
