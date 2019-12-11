import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
  withRouter
} from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

import { Form, Button } from "react-bootstrap";

/**
 * Register page/form
 * Initialize this.state to be empty
 */
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "", email: "", password: "", errors: {} };
  }
  /**
   * If user is logged in already, redirect them to MyListings page
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mylistings");
    }
  }
  /**
   * Receive props
   * @param {*} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  /**
   * Called when user clicks the Submit button
   * Makes POST request to /register and attempts to create a new user in the database
   * with the submitted information
   */
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, phone, password } = this.state;

    this.props.registerUser(
      { name, phone, email, password },
      this.props.history
    );

    axios
      .post("/register", { name, phone, email, password })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        alert("Error submitting form.  Please check your input and try again");
      });
  };
  /**
   * Change text fields as they are inputted
   */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Register below</h2>

          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter name"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.name
              })}
            />
            <span className="red-text">{errors.name}</span>
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              type="tel"
              placeholder="Enter phone"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.email
              })}
            />
            <span className="red-text">{errors.email}</span>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.password
              })}
            />
            <span className="red-text">{errors.password}</span>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
