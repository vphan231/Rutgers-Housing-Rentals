import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

/**
 * Display GoogleMaps of Rutgers University Student Center and Housing
 *
 * @param {List} stores: coordinates
 */
class GoogleMap extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}]
      }
    }
    /**
     * Display marker of selected coordinates
     */
    displayMarkers = () => {
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.latitude,
         lng: store.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }
  
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={14}
            style={{width: '90%',
                    height: '70%',}}
            initialCenter={{ lat: 40.500, lng: -74.44}}
          >
          </Map>
      );
    }
}

/**
 * Attach an API key to export default GoogleApiWrapper
 *
 * @param {string} apiKey: Google Map API key
 */
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAvIbz4msIQRcp_6WCLcx-ha4Xot0A2apE'
  })(GoogleMap);