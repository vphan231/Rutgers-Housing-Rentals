import React from "react";
import { Link } from "react-router-dom";

import { Card,Button } from "react-bootstrap";

const ListingCard = props => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.listing.imageSrc} />
      <Card.Body>
        <Card.Title>{props.listing.title}</Card.Title>
        <Card.Text>
          {props.listing.address}
        </Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
