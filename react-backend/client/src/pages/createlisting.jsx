import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import jwt_decode from "jwt-decode";

/**
 * Create Listing page (form)
 * Display fields to create a Listing.
 * 
 * @param {Object} props All props of this Button
 */
class Createlisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      title: "",
      address: "",
      maxocc: "",
      description: "",
      rent: "",
      hasdrive: false,
      isavail: false,
      imagesrc: ""
    };
  }
  /**
   * Gets called when User clicks on Submit button
   * Adds listing to user's personal listing's field in database
   * Sends a POST request to /createlisting with the new Listing information
   * @param {SyntheticEvent} e The react SyntheticEvent
   */
  handleSubmit = e => {
    e.preventDefault();
    const {
      title,
      address,
      maxocc,
      description,
      rent,
      hasdrive,
      isavail,
      imagesrc
    } = this.state;
    let listedByID = null;
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      // setAuthToken(token);
      // Decode token and get user info and exp
      listedByID = jwt_decode(token).id;
      console.log("decoded", listedByID);
    }
    axios
      .post("/createlisting", {
        title,
        address,
        maxocc,
        description,
        rent,
        hasdrive,
        isavail,
        imagesrc,
        listedByID
      })
      .then(res => {
        console.log(res);
        this.state.redirect = true;
        this.forceUpdate();
      });
  };
  // When the text field changes, update the state with the information in the form fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // Front-end code; If the redirect flag is true, redirect user to MyListings Page
  render() {
    if (this.state.redirect) return <Redirect to="/mylistings" />;
    return (
      <div>
        <h1>CREATE LISTING</h1>
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title of Listing</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter the title of the listing"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address of Property</Form.Label>
            <Form.Control
              name="address"
              placeholder="Enter the address of the property"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRent">
            <Form.Label>Monthly Rent</Form.Label>
            <Form.Control
              name="rent"
              placeholder="Enter the monthly rent price of the unit"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicOccupancy">
            <Form.Label>Maximum Occupancy</Form.Label>
            <Form.Control
              name="maxocc"
              placeholder="Enter the title of the listing"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Enter a description of the property"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group id="formBasicDriveway">
            <Form.Check name="hasdrive" type="checkbox" label="Has Driveway" />
          </Form.Group>
          <Form.Group id="formBasicAvailable">
            <Form.Check name="isavail" type="checkbox" label="Is Available" />
          </Form.Group>
          <Form.Group controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="imagesrc"
              type="text"
              placeholder="Enter a link containing the image"
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
export default Createlisting;
