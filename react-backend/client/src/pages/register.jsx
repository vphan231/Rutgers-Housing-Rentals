import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.post("/register", { email, password }).then(res => {
      console.log(res);
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <h2>Register below</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Enter your email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={this.onChange}
          />
          <br></br>
          <label htmlFor="password">Enter your password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={this.onChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;