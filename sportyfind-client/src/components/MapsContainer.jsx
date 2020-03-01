import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapsContainer extends Component {

  state = {
    lat: "",
    lng: ""
  };

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const mapStyles = {
      width: "60%",
      height: "60%"
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 48.8534,
          lng: 2.3488
        }}
      >
        <Marker
          name={"Location"}
          // position={{ lat: 37.778519, lng: -122.40564 }}
          position= {this.state.lat, this.state.lng}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapsContainer);
