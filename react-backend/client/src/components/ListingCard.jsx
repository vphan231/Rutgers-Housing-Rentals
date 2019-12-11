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
        <Link to={{ pathname: `/listing/${props.listing._id}` }}>
          <Card.Title>
            {props.listing.address} <br />${props.listing.price} /{" "}
            {props.listing.Max_Occupancy}
            {(props.listing.Max_Occupancy == 1) ? " person" : " people"}
          </Card.Title>
        </Link>

        <Card.Text>{props.listing.title}</Card.Text>
        <Link to={{ pathname: `/listing/${props.listing._id}` }}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
