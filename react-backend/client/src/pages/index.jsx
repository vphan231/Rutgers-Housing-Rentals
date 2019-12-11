import React from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import ListingSearch from "../components/ListingSearch";
import { CardColumns, Row, Col } from "react-bootstrap";
import GoogleMap from "../components/GoogleMap";
import axios from "axios";

/**
 * Home Page
 *
 * @param {List} listings
 */
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    // Initialize listings
    this.state = {
      listings: [],
      minprice: 0,
      maxprice: 9999,
      people: 1,
      driveway: false
    };
  }
  /**
   * Make request to backend to grab listings from db
   */
  componentDidMount() {
    axios
      .get("/grabAll")
      .then(res => {
        this.setState({ listings: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  searchListing = e => {
    e.preventDefault();
    const { minprice, maxprice, people, driveway } = this.state;

    axios
      .get("/grabAll?minprice=" + minprice + "&maxprice=" + maxprice)
      .then(res => {
        this.setState({ listings: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // When the text field changes, update the state with the information in the form fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    var styles = {
      height: "300px",
      marginBottom: "20px"
    };
    return (
      <div>
        <img
          src="https://i.ibb.co/Nrmwc6X/image.png"
          className="img-rounded img-fluid"
          width="1110"
          height="420"
        ></img>
        <br></br>
        <br></br>
        <Row>
          <Col style={styles}>
            <GoogleMap />
          </Col>
        </Row>
        <h4>
          Showing {this.state.listings.length} listings in New Brunswick, NJ
        </h4>
        <form>
          <div class="form-row align-items-center ">
            <div class="col-sm-2 my-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    $
                  </span>
                </div>
                <input
                  name="minprice"
                  type="number"
                  class="form-control"
                  placeholder="Min price"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="col-sm-2 my-1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend">
                    $
                  </span>
                </div>
                <input
                  name="maxprice"
                  type="number"
                  class="form-control"
                  placeholder="Max price"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div class="col-sm-3 my-1">
              <input
                name="people"
                type="number"
                class="form-control"
                placeholder="Number of people"
                onChange={this.onChange}
              />
            </div>
            <div class="col-auto my-1">
              <div class="form-check">
                <input
                  name="driveway"
                  class="form-check-input"
                  type="checkbox"
                  id="autoSizingCheck2"
                  onChange={this.onChange}
                />
                <label class="form-check-label" for="autoSizingCheck2">
                  Has Driveway
                </label>
              </div>
            </div>
            <div class="col-auto my-1">
              <button class="btn btn-primary" onClick={this.searchListing}>
                Search
              </button>
            </div>
          </div>
        </form>

        <br />

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
export default MainPage;
