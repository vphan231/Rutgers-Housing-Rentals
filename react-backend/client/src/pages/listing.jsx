import React from "react";
import axios from "axios";
import { CardColumns, Row, Col } from "react-bootstrap";
import ListingCard from "../components/ListingCard";
import GoogleMap from "../components/GoogleMap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
/**
 * Individual lisiting page. 
 * Display all perams of listing with landlord details.
 *
 * @param {List} listing: individual listing display
 * @param {List} listings: similar listings
 * @param {prop} props: title, address, price, Max_Occupancy, Has_Driveway, Is_Available, imageSrc
 */
class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: [],
      listings: []
    };
  }
  /**
   * Make request to backend to grab individual listing information
   *
   * @param {HTTP get}  axios.get("/" + { id }.id): individual listing get request
   * @param {HTTP get} axios.get("/grabAll"): similar listings get request
   */
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get("/" + { id }.id)
      .then(res => {
        this.setState({ listing: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/grabAll")
      .then(res => {
        this.setState({ listings: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.listing.title}</h1>
        <img
          src={this.state.listing.imgSrc}
          className="img-rounded"
          width="600"
          height="420"
        ></img>
        <br />
        <Row>
          <Col>
            <h4>{this.state.listing.address} fitting {this.state.listing.Max_Occupancy} people at $
              {this.state.listing.price}/mo</h4>
          </Col>
        </Row>
        <Row>
          <Col>
          
          </Col>
        </Row>
        <br />

        <h3>Description of listing</h3>
        <p>&emsp;{this.state.listing.description}</p>
        <br />
        <Row>
          <Col>
            <h3>Features</h3>
            <p>
                &emsp;Has Driveway {this.state.listing.Has_Driveway}
                <br />
                &emsp;Is Available {this.state.listing.Is_Available}
            </p>
            <br />
            <h3>Description of listing</h3>
            <p>&emsp;{this.state.listing.description}</p>
            <br />
            <h3>Contact Landlord</h3>
            <p>
              &emsp;Landlord Name: Ruslan Volyar
              <br />
              &emsp;Landlord Phone: 973 738 7618
              <br />
              &emsp;Landlord Email: rvolyar@gmail.com
              <br />
            </p>
          </Col>
          <Col>
            <GoogleMap />
          </Col>
        </Row>
        <br />
        <br />
        <h3>Similar Listings (by distance)</h3>
        <Row>
          {this.state.listings.map((item, i) => (
            <div key={i}>
              <Col>
                <ListingCard listing={item} />
              </Col>
            </div>
          ))}
        </Row>
      </div>
    );
  }
}

export default Listing;
