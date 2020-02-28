import React, { useState, useEffect, Component } from "react";
import { withRouter } from "react-router-dom";

// custom tools
import APIHandler from "../api/APIHandler";

// styles
import "../styles/CreateEvent.css"


export default class UpdateEvent extends Component{
    state = {
    name: "",
    date: "",
    localisation:"",
    maxParticipants: "",
    description: "",
    sport: "",
    sports: [],
    isRequesting: false
  }

    handleSubmit = async e => {
    e.preventDefault();
    try {
        APIHandler
        .patch(`/events/edit/${this.props.match.params.id}`, {
            name: this.state.name,
            date: this.state.date,
            localisation:this.state.localisation,
            maxParticipants: this.state.maxParticipants,
            description:this.state.description,
            sport: this.state.sport,
            sports: this.state.sports,
            isRequesting: false
        });
        this.props.history.push("/events");
    } catch(err) {
        //
    }
}

handleChange = e => {
    e.persist();
    this.setState(prevValues => ({
      ...prevValues,
      [e.target.id]: e.target.value
    }));
  };

componentDidMount() {
    APIHandler
            .get(`/events/${this.props.match.params.id}`)
            .then(apiRes => {
                this.setState(apiRes.data);
            })
            .catch(apiErr => console.error(apiErr));
    APIHandler
            .get("/sports")
            .then(apiRes => {
                this.setState({ sports : apiRes.data.sports })
            })
            .catch(apiErr => console.error(apiErr));
        }    
render() {
  return (
    <div className="toute">

    <p className="createevent">Update an event</p>

    <form className="form" onSubmit={this.handleSubmit} onChange={this.handleChange}>

    <div className="all">
  
    <div className="nameinput">
    <label className="label" htmlFor="sport">
        Sport
      </label>
      <select id="sport" value={this.state.sport} > 
          <option value="" disabled>
        Select a sport</option>
        {this.state.sports.map((sport, i) => (
          <option value={sport._id} key={i}>{sport.name}</option>
        ))}
      </select>
      </div>

      <div className="nameinput">
      <label className="label" htmlFor="name">
        Name
      </label>
      <input
        className="input"
        id="name"
        type="text"
        defaultValue={this.state.name}
        required
      />
      </div>

        <div className="nameinput">
        <label className="label" htmlFor="date">
        Date
      </label>
      <input
        className="input"
        id="date"
        type="datetime-local"
        value={this.state.date}
      />
      </div>

        <div className="nameinput">
    <label className="label" htmlFor="maxParticipants">
        Maximum number of participants
      </label>
      <input
        className="input"
        id="maxParticipants"
        type="text"
        defaultValue={this.state.maxParticipants}
        required
      />
      </div>
      

        <div className="nameinput">
        <label className="label" htmlFor="description">
        Description
      </label>
      <input
        className="input"
        id="description"
        type="text"
        defaultValue={this.state.description}
        required
      />
      </div>

<div className="nameinput">
    <label className="label" htmlFor="localisation">
        Localisation 
      </label>
      <input
        className="input"
        id="localisation"
        type="text"
        defaultValue={this.state.localisation}
      />
      </div>


      <div className="nameinput">
    <button className="btn" disabled={this.state.isRequesting}> Edit Event</button>
    </div>

    </div>
  
    </form>
    </div>

    )}
}



