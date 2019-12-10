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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
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
            />
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
            />
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

export default Login;
