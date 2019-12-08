import React from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import ListingSearch from '../components/ListingSearch'
import { CardColumns, Row, Col } from "react-bootstrap";
import logo from '../web-photos/ru-stadium-text.png';
import GoogleMap from '../components/GoogleMap'
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    //todo fetch listings from server and fill state with them
    this.state = {
      listings: [
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
        },
        {
          _id: 3,
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
          _id: 4,
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
        <ListingSearch/>
        <Row>
          <Col>
            <GoogleMap />
          </Col>

          <Col>
            <Row>
              {this.state.listings.map((item, key) => (
                <Col>
                  <ListingCard listing={item} key={item.id} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
