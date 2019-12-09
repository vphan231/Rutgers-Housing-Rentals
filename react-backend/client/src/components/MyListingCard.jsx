import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Alert from "react-native";

// Todo: change Edit button Link to an edit listing form
// todo: Delete Listing button functionality
const MyListingCard = props => {
    return (
        <Card style={{width: "45rem"}}>
            <Card.Img variant="top" src={props.listing.imageSrc} />
            <Card.Body>
                <Card.Title>{props.listing.title}</Card.Title>
                <Card.Text>{props.listing.address}</Card.Text>
                <Link to={{ pathname: `/listing/${props.listing._id}` }}>
                    <Button variant="primary">View</Button>
                </Link>
                <Link to={{ pathname: `/listing/${props.listing._id}` }}>
                    <Button variant="primary">Edit</Button>
                </Link>
                <Button variant="primary" type="submit">
                    Publish
                </Button>
                <Button variant="primary" type="button" >
                    Delete listing
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MyListingCard