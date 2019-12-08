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
import { Button, CardColumns, Row, Col } from "react-bootstrap";
import MyListingCard from "../components/MyListingCard";

class MyListings extends React.Component {
    constructor(props) {
        super(props);
        // todo: populate myListings with user's listings from db
        // todo: redirect user to homepage with error message if not logged in
        this.state = {
            myListings: [
                {
                    _id: 1,
                    title: "New Listing",
                    address: "39 Wyckoff Street",
                    price: 6050,
                    Max_Occupancy: "9",
                    Has_Driveway: false,
                    Is_Available: false,
                    imageSrc:
                      "https://d3mqmy22owj503.cloudfront.net/10/500010/images/poi/sample-house-2/10-logo.jpg"
                  },
                  {
                    _id: 2,
                    title: "New Listing 2",
                    address: "39 Wyckoff Street",
                    price: 6050,
                    Max_Occupancy: "9",
                    Has_Driveway: false,
                    Is_Available: false,
                    imageSrc: "https://i.ytimg.com/vi/Zw_bIr5W0-4/maxresdefault.jpg"
                  }
            ]
        };
    }
    render() {
        return (
            <div>
            <Button
                link href="/createlisting"
                title="Create Listing" >
            Create Listing
            </Button>
            <Col>
                {this.state.myListings.map((item, key) => (
                    <Row>
                        <MyListingCard listing={item} key={item.id} />
                    </Row>
                ))}
            </Col>
            </div>
        );
    }
}

export default MyListings;