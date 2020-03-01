import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import 'react-google-places-autocomplete/dist/assets/index.css';



// custom tools
import APIHandler from "../api/APIHandler";

// styles
import "../styles/CreateEvent.css"
// const APIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>


export default withRouter(function CreateEvent({
  mode = "create",
  _id,
  history,
  match
}) {

  const [state,
    setState
  ] = useState({
    name: "",
    date: "",
    localisation:"",
    maxParticipants: "",
    description: "",
    sport: "",
    sports: [],
    isRequesting: false
  });

  useEffect(() => {

    const getData = async () => {

      let newState = {...state}

      const sportsRes = await APIHandler.get(`/sports`);
      newState.sports = sportsRes.data.sports;

      setState(newState);

    };

    getData();

  }, [mode, _id]);

  const handleChange = e => {
    e.persist();
    setState({ ...state, [e.target.id] : e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ ...state, isRequesting : true})

    try {
      if (mode === "create") {
        const apiResult = await APIHandler.post("/events/create", state);
      }
      else await APIHandler.patch(`/events/edit/${match.params.id}`, state);
      

      history.push("/events");
    } catch (apiErr) {
      console.error(apiErr);
    }

  };


  return (
    
    <div className="toute">

    <p className="createevent">Create an event</p>

    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>

    <div className="all">

    <div className="nameinput">
    <label className="label" htmlFor="sport">
        Sport
      </label>
      <select id="sport" value={state.sport} > 
          <option value="" disabled>
        Select a sport</option>
        {state.sports.map((sport, i) => (
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
        defaultValue={state.name}
        placeholder="Name"
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
        type="date"
        value={state.date}
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
        defaultValue={state.maxParticipants}
        placeholder="10"
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
        defaultValue={state.description}
        placeholder="Description"
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
        value={state.localisation}
        placeholder="Localisation"
      />
      </div>

  {/* <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
      autocompletionRequest={{
      componentRestrictions: {
        country: ['fr'],
      }
    }}

    />
  </div> */}


      <div className="nameinput">
    <button className="btn" disabled={state.isRequesting}> Create Event</button>
    </div>

    </div>
    
    </form>
    </div>

  );

});

// scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyA7z4NnofrdbUYkO8tXJq2UtaJF3LyNklU'])(withRouter);

// module export = scriptLoader;

