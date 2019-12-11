import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

//Error page
const NotFoundPage = () => {
  let { id } = useParams();

  return (
    <div className="container">
      <div class="row ">
        <div class="col-md-12 ">
          <div class="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div class="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div class="error-actions">
              <a
                href="/"
                class="btn btn-primary btn-lg"
              >
                <span class="glyphicon glyphicon-home"></span>
                Take Me Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
