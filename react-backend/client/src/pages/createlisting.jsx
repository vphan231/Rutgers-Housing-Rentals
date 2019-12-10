import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
class Createlisting extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, title: "", address: "", maxocc: "", description: "", rent: "", hasdrive: false, isavail: false, imagesrc: "" };
    }
    // Function to handle form submission, sends post request to back-end
    handleSubmit = e => {
        e.preventDefault();
        const { title, address, maxocc, description, rent, hasdrive, isavail, imagesrc, listedby } = this.state;
        axios.post("/createlisting", { title, address, maxocc, description, rent, hasdrive, isavail, imagesrc, listedby })
            .then(res => {
                console.log(res);
                this.state.redirect = true;
                this.forceUpdate();
            });
    };
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    // todo: changed listedby var to current logged-in user
    // todo: redirect user to homepage with error message if not logged in
    // todo: redirect user to My Listings page upon successful form submission
    render() {
        if (this.state.redirect) return <Redirect to='/mylistings' />;
        return (
            <div>
                <h1>CREATE LISTING</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title of Listing</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Enter the title of the listing"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address of Property</Form.Label>
                        <Form.Control
                            name="address"
                            placeholder="Enter the address of the property"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicRent">
                        <Form.Label>Monthly Rent</Form.Label>
                        <Form.Control
                            name="rent"
                            placeholder="Enter the monthly rent price of the unit"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicOccupancy">
                        <Form.Label>Maximum Occupancy</Form.Label>
                        <Form.Control
                            name="maxocc"
                            placeholder="Enter the title of the listing"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            type="text"
                            placeholder="Enter a description of the property"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group id="formBasicDriveway">
                        <Form.Check
                            name="hasdrive"
                            type="checkbox"
                            label="Has Driveway"
                        />
                    </Form.Group>
                    <Form.Group id="formBasicAvailable">
                        <Form.Check
                            name="isavail"
                            type="checkbox"
                            label="Is Available"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            name="imagesrc"
                            type="text"
                            placeholder="Enter a link containing the image"
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                        </Button>
                </form>
            </div>
        );
    }
}
export default Createlisting;
