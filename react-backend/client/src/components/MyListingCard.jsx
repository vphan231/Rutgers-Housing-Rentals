import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Card, Button, ButtonGroup, Redir } from "react-bootstrap";
// Todo: change Edit button Link to an edit listing form
// todo: Delete Listing button functionality
class MyListingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  deleteListing = e => {
    e.preventDefault();
    const id = this.props.listing._id;
    axios.post("/deletelisting", { id }).then(res => {
      this.state.redirect = true;
      this.forceUpdate();
    });
    window.location.reload(false);
  };
  render() {
    if (this.state.redirect) return <Redirect to="/mylistings" />;
    return (
      <Card style={{ width: "30rem", marginBottom: "10px" }}>
        <Card.Img variant="top" src={this.props.listing.imgSrc} />
        <Card.Body>
          <Card.Title>{this.props.listing.title}</Card.Title>
          <Card.Text>{this.props.listing.address}</Card.Text>
          <ButtonGroup>
            <Button variant="primary">
              <Link to={{ pathname: `/listing/${this.props.listing._id}` }}>
                View
              </Link>
            </Button>

            <Button variant="primary">
              <Link to={{ pathname: `/editlisting/${this.props.listing._id}` }}>
                Edit
              </Link>
            </Button>
            
            <Button
              variant="primary"
              type="button"
              onClick={this.deleteListing}
            >
              Delete listing
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}
export default MyListingCard;
