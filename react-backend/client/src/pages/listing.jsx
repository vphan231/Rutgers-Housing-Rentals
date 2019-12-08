import React from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

const Listing = () => {
    //this.state = { title: "", address: "", price: "", Max_Occupancy: "", Has_Driveway: "", Is_Available: "", imageSrc: "" };

    let { id } = useParams();

    axios.get(id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
    });

    return (
        <div>
            Listing id: {id}
        </div>
    );
}

export default Listing;