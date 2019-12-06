import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";


const NotFoundPage = () => {
    let { id } = useParams();

    return (
        <div> 404 page not found</div>
    );
}

export default NotFoundPage;