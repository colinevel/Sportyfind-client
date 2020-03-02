import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";


export class MapsContainer extends Component {


  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    const mapStyles = {
      width: "50%",
      height: "50%"
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng
        }}
      >
        <Marker
          name={"Location"}
          position= {{lat: this.props.lat, lng: this.props.lng}}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapsContainer);
