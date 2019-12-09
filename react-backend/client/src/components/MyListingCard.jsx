import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Alert from "react-native";

=======
import { Link, Redirect } from "react-router-dom";
import { Card, Button ,Redir} from "react-bootstrap";
>>>>>>> 7ea14eba07e6d6f38294199cde996837f03220af
// Todo: change Edit button Link to an edit listing form
// todo: Delete Listing button functionality
class MyListingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect:false };
    }
    deleteListing = e => {
        e.preventDefault();
        console.log("Hello")
        this.setState.redirect = true;
        this.forceUpdate();
    };
    render() {
        if (this.state.redirect) return <Redirect to='/mylistings' />;
        return (
                 <Card style={{ width: "45rem" }}>
                 <Card.Img variant="top" src={this.props.listing.imageSrc} />
                 <Card.Body>
                     <Card.Title>{this.props.listing.title}</Card.Title>
                     <Card.Text>{this.props.listing.address}</Card.Text>
                     <Link to={{ pathname: `/listing/${this.props.listing._id}` }}>
                         <Button variant="primary">View</Button>
                     </Link>
                     <Link to={{ pathname: `/listing/${this.props.listing._id}` }}>
                         <Button variant="primary">Edit</Button>
                     </Link>
                     <Button variant="primary" type="submit">
                         Publish
             </Button>
            <Button variant="primary" type="button" onClick={this.deleteListing}>
                Delete listing
                </Button>
<<<<<<< HEAD
                <Button variant="primary" type="button" >
                    Delete listing
                </Button>
            </Card.Body>
        </Card>
    );
};

=======
            // </Card.Body>
            //</Card>
        );
    }
}
>>>>>>> 7ea14eba07e6d6f38294199cde996837f03220af
export default MyListingCard