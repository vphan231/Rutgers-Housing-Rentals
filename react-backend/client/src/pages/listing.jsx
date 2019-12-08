import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

const Listing = () => {
    let { id } = useParams();

    return (
        <div>Listing id: {id}</div>
    );
}

export default Listing;