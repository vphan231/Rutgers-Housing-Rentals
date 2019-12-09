import React from "react";
import axios from "axios";
import { CardColumns, Row, Col } from "react-bootstrap";
import ListingCard from "../components/ListingCard";
import GoogleMap from '../components/GoogleMap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
// todo: map listing information to page
class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: [],
            listings: []
        };
    }
    // Make request to backend to grab individual listing information
    componentDidMount() {
        const { id } = this.props.match.params
        axios.get('/'+ {id}.id ).then(res => {
            this.setState({ listing: res.data });
        }).catch(function (error) {
            console.log(error);
        })

        axios.get('/grabAll').then(res => {
            this.setState({ listings: res.data });
          }).catch(function (error) {
            console.log(error);
        });
    };
    render() {
        return (
            <div>
                <h1>
                    View Listing
                </h1>
                <br/>
                <h1>
                    {this.state.listing.title}
                </h1>
                <img src={this.state.listing.imgSrc} className="img-rounded" width="600" height="420"></img>
                <br/>
                <Row>
                    <Col>
                        <h4>Address</h4>
                        <p>&emsp;{this.state.listing.address}</p>
                    </Col>
                    <Col>
                        <h2>{this.state.listing.Max_Occupancy} people at ${this.state.listing.price}/mo</h2>
                    </Col>
                </Row>
                <br/>
                <h3>
                    Features
                </h3>
                <p>
                    &emsp;Has Driveway: {this.state.listing.Has_Driveway}
                    <br/>
                    &emsp;Is Available: {this.state.listing.Is_Available}
                </p>
                <br/>
                <h3>
                    Description of listing 
                </h3>
                <p>
                    &emsp;{this.state.listing.description}
                </p>
                <br/>
                <Row>
                    <Col>
                    <h3>
                        Contact Landlord 
                    </h3>
                    <p>
                        &emsp;Landlord Name:
                        <br/>
                        &emsp;Landlord Phone:
                        <br/>
                        &emsp;Landlord Email:
                        <br/>
                    </p>
                    </Col>
                    <Col>
                        <GoogleMap />
                    </Col>
                </Row>
                <br/>
                <br/>
                <h3>
                    Similar Listings (by distance) 
                </h3>
                <Row>
                    {this.state.listings.map((item, i) => (
                    <div key={i}>
                  <Col>
                    <ListingCard listing={item} />
                  </Col></div>
                    ))}
                </Row>
            </div>
        )
    }
}

// const Listing = () => {
//     //this.state = { title: "", address: "", price: "", Max_Occupancy: "", Has_Driveway: "", Is_Available: "", imageSrc: "" };

//     let { id } = useParams();

//     axios.get('/listing/'+id)
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.log(error);
//     });

//     return (
//         <div>
//             Listing id: {id}
//         </div>
//     );
// }

export default Listing;