import React from "react";
import { Link } from "react-router-dom";

import { Card, Button } from "react-bootstrap";

/**
 * Display each listing as a Listing Card in the HomePage and Individual Listing (Similar listing)
 *
 * @param {prop} props: title, address, price, Max_Occupancy, Has_Driveway, Is_Available, imageSrc
 */
const ListingCard = props => {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={props.listing.imgSrc} />
      <Card.Body>
        <Card.Title>{props.listing.title}</Card.Title>
        <Card.Text>{props.listing.address}</Card.Text>
        <Link to={{ pathname: `/listing/${props.listing._id}` }}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
