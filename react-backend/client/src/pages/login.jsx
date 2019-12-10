import React from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

//Login Page
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", errors: {} };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to my listings
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/mylistings");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/mylistings"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.loginUser({ email, password });
    axios
      .post("/login", { email, password })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
            <span className="red-text">
              {errors.email}
              {errors.emailnotfound}
            </span>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
            <span className="red-text">
              {errors.password}
              {errors.passwordincorrect}
            </span>
          </Form.Group>
          <Form.Group>
            <Link to="/register">
              Do not have an account? Please register here.
            </Link>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
        <br />
      </div>
    );
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);