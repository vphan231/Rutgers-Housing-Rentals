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
      listedBy: {},
      listings: []
    };
  }
  /**
   * Make request to backend to grab individual listing information
   *
   * @param {HTTP get}  axios.get("/" + { id }.id): individual listing get request
   * @param {HTTP get} axios.get("/grabAll"): similar listings get request
   */
  async componentDidMount() {
    const { id } = this.props.match.params;
    await axios
      .get("/" + { id }.id)
      .then(res => {
        this.setState({ listing: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/getlandlord/" + this.state.listing.listedBy)
      .then(res => {
        this.setState({ listedBy: res.data });
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

        <div className="listingBody">
          <Row>
            <Col>
              <img
                src={this.state.listing.imgSrc}
                className="rounded mx-auto d-block"
                width="600"
                height="420"
              ></img>
            </Col>
            <Col>
              <b>
                Address <br />
              </b>
              <p>{this.state.listing.address}</p>

              <b>Features</b>
              <p>
                Has Driveway {this.state.listing.Has_Driveway}
                <br />
                Is Available {this.state.listing.Is_Available}
              </p>
              <b>Description of listing</b>
              <p>{this.state.listing.description}</p>
              <b>Contact Landlord</b>
              <p>
                Landlord Name:<i> {this.state.listedBy.name}</i>
                <br />
                Landlord Phone:<i> {this.state.listedBy.phone}</i>
                <br />
                Landlord Email:<i> {this.state.listedBy.email}</i>
                <br />
              </p>
            </Col>
            <Col>
              <h2>
                {this.state.listing.Max_Occupancy}{" "}
                {this.state.listing.Max_Occupancy == 1 ? " person" : " people"}{" "}
                at ${this.state.listing.price}/mo
              </h2>
              <GoogleMap />
            </Col>
          </Row>
          <br />
        </div>
        <br />
        <h3>Similar Listings</h3>
        <Row>
          {this.state.listings
            .filter(listing => {
              console.log(listing.listedBy, "vs", this.state.listedBy._id);
              return listing.listedBy !== this.state.listedBy._id;
            })
            .map((item, i) => (
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
