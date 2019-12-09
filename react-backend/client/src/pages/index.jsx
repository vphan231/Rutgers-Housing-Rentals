import React from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import ListingSearch from '../components/ListingSearch'
import { CardColumns, Row, Col } from "react-bootstrap";
import logo from '../web-photos/ru-stadium-text.png';
import GoogleMap from '../components/GoogleMap'
import axios from "axios";
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    // Initialize listings
    this.state = {
      listings: []
    };
  }
  // Make request to backend to grab listings from db
  componentDidMount() {
    axios.get('/grabAll').then(res => {
      this.setState({ listings: res.data });
    }).catch(function (error) {
      console.log(error);
    });
  };
  render() {
    return (
      <div>
        <img src={logo} className="img-rounded" width="1110" height="420"></img>
        <br></br>
        <br></br>
        <ListingSearch />
        <Row>
          <Col>
            <GoogleMap />
          </Col>
          <Col>
            <Row>
              {this.state.listings.map((item, i) => (
                <div key={i}>
                  <Col>
                    <ListingCard listing={item} />
                  </Col></div>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MainPage;