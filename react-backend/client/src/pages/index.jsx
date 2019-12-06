import React from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { CardColumns, Row, Col } from "react-bootstrap";
import logo from '../photos/ru-stadium.png';
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    //todo fetch listings from server and fill state with them
    this.state = {
      listings: [
        {
          id: 1,
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
          id: 2,
          title: "New Listing 2",
          address: "39 Wyckoff Street",
          price: 6050,
          Max_Occupancy: "9",
          Has_Driveway: false,
          Is_Available: false,
          imageSrc: "https://i.ytimg.com/vi/Zw_bIr5W0-4/maxresdefault.jpg"
        },
        {
          id: 3,
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
          id: 4,
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
        <img src={logo} class="img-rounded" width="1110" height="420"></img>
        <br></br>
        <br></br>
        <Row>
          {this.state.listings.map((item, key) => (
            <Col>
              <ListingCard listing={item} key={item.id} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default MainPage;
