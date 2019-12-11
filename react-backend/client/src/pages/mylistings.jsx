import React from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard";
import {
  BroswerRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Button, CardColumns, Row, Col } from "react-bootstrap";
import MyListingCard from "../components/MyListingCard";

/**
 * MyListings page
 * Initialize this.state to be empty
 */
class MyListings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * Function that grabs user id and makes a call to backend
   * Backend uses get request with restriction listing id = current user id
   * Response from backend is that user's listings
   */
  componentDidMount() {
    let listedByID = "";
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      // setAuthToken(token);
      // Decode token and get user info and exp
      listedByID = jwt_decode(token).id;
      console.log("decoded", listedByID);
    }
    axios
      .get("/grabAll?id=".concat(listedByID))
      .then(res => {
        this.setState({ listings: res.data });
        this.forceUpdate();
        console.log("state", this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  /**
   * Logout user
   */
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Col>
          {this.state.listings &&
            this.state.listings.map((item, i) => (
              <div key={i}>
                <Row>
                  <MyListingCard listing={item} key={i} />
                </Row>
              </div>
            ))}
        </Col>
        {this.state.listings && this.state.listings.length < 1 && (
          <p>
            {" "}
            Looks like you don't have any listings yet. Create your first
            listing today!{" "}
          </p>
        )}
        <Button link href="/createlisting" title="Create Listing">
          Create Listing
        </Button>
      </div>
    );
  }
}
MyListings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(MyListings);
