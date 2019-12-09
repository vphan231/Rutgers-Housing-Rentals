import React from "react";
import axios from "axios";
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
        };
    }
    // Make request to backend to grab individual listing information
    componentDidMount() {
        const { id } = this.props.match.params
        axios.get('/'+ {id}.id ).then(res => {
            this.setState({ listing: res.data });
        }).catch(function (error) {
            console.log(error);
        });
    };
    render() {
        return (
            <div>
                <h1>
                    {this.state.listing.title}
                </h1>   
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