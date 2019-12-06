import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

function Register() {
  return (
    <div>
      <h2>Register below</h2>
      <form method="POST" action="/register">
        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />
        <br></br>
        <label htmlFor="password">Enter your password</label>
        <input id="password" name="password" type="password" />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
