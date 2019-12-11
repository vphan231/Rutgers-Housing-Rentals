import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
//Landlord's EditListing Page
class EditListing extends React.Component {
    /**
     * Initialize this.state to empty
     * Grab listing information from the id in the URL using a GET request
     * @param {Object} props All props of this Button
     */
    constructor(props) {
        super(props);
        this.state = { title: "", address: "", maxocc: "", description: "", rent: "", hasdrive: false, isavail: false, imagesrc: "", _id: "" };
        const path = this.props.location.pathname
        var splitPath = path.split('/')
        const id = splitPath[2]
        axios.get('/' + id).then(res => {
            this.setState({
                title: res.data.title,
                address: res.data.address,
                maxocc: res.data.Max_Occupancy,
                hasdrive: res.data.Has_Driveway,
                isavail: res.data.Is_Available,
                rent: res.data.price,
                description: res.data.description,
                imagesrc: res.data.imgSrc,
                _id: res.data._id
            });
        }).catch(function (error) {
            console.log(error);
        });
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    /**
     * Gets called when the user clicks on the submit button
     * Sends a POST request to /updatelisting with the updated Listing model 
     * @param {SyntheticEvent} e The react SyntheticEvent
     */
    handleSubmit = e => {
        e.preventDefault();
        const updatedListing = this.state;
        this.state.redirect = true
        axios.post("/updatelisting", updatedListing)
            .then(res => {
            })
            this.forceUpdate()
    };
    //When the text in the field changes, update the state with the information in the form fields 
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    //When a checkbox is checked/unchecked, update the state with the status of the checkbox
    onCheckboxChange = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };
    render() {
        //Redirect to updated listing on submission of edits
        if(this.state.redirect)
        {
            return <Redirect to={{ pathname: `/listing/${this.state._id}`}}/>;
        }
        //Render the view 
        return (
            <div>
                <h1>EDIT LISTING </h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title of Listing</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address of Property</Form.Label>
                        <Form.Control
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicRent">
                        <Form.Label>Monthly Rent</Form.Label>
                        <Form.Control
                            name="rent"
                            value={this.state.rent}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicOccupancy">
                        <Form.Label>Maximum Occupancy</Form.Label>
                        <Form.Control
                            name="maxocc"
                            value={this.state.maxocc}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            name="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </Form.Group>
                    <Form.Group id="formBasicDriveway">
                        <Form.Check
                            name="hasdrive"
                            type="checkbox"
                            label="Has Driveway"
                            checked={this.state.hasdrive}
                            onChange={this.onCheckboxChange}
                        />
                    </Form.Group>
                    <Form.Group id="formBasicAvailable">
                        <Form.Check
                            name="isavail"
                            type="checkbox"
                            label="Is Available"
                            checked={this.state.isavail}
                            onChange={this.onCheckboxChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            name="imagesrc"
                            type="text"
                            value={this.state.imagesrc}
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
export default EditListing;