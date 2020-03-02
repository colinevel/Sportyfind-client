import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

// custom tools
import APIHandler from "../api/APIHandler";

// styles
import "../styles/CreateEvent.css";


export default withRouter(function CreateEvent({
  mode = "create",
  _id,
  history,
  match
}) {
  const [state, setState] = useState({
    name: "",
    date: "",
    time: "",
    lat: "",
    lang: "",
    localisation: "",
    maxParticipants: "",
    description: "",
    sport: "",
    sports: [],
    isRequesting: false
  });

 

  useEffect(() => {
    const getData = async () => {
      let newState = { ...state };

      const sportsRes = await APIHandler.get(`/sports`);
      newState.sports = sportsRes.data.sports;

      setState(newState);
    };

    getData();
  }, [mode, _id]);


  const handleAddressChange = e => {
    // console.log(e.description);
    setState({...state, localisation: e.description })
  };


  const handleChange = e => {
    e.persist();
    setState({ ...state, [e.target.id]: e.target.value });
  };

  geocodeByAddress(state.localisation)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>{
    setState({...state, lat: lat, lng: lng})
  }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ ...state, isRequesting: true });

    try {
      if (mode === "create") {
        const apiResult = await APIHandler.post("/events/create", state);
      } else await APIHandler.patch(`/events/edit/${match.params.id}`, state);

      history.push({
        pathname: '/events',
        search: '?sport=AllSports'
    });
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  return (
    <div className="toute">

      <p className="createevent">Create an event</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="all">
          <div className="nameinput">
            <label className="label" htmlFor="sport">
              Sport
            </label>
            <select id="sport" value={state.sport} onChange={handleChange}>
              <option value="" disabled>
                Select a sport
              </option>
              {state.sports.map((sport, i) => (
                <option value={sport._id} key={i}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="nameinput">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleChange}
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
            <DayPickerInput
              onDayChange={day => console.log("this is the new day", day)}
              className="input"
              id="date"
              value={state.date}
            />
          </div>

          <div className="nameinput">
            <label className="label" htmlFor="time">
              Time
            </label>
            <input
              onChange={handleChange}
              className="input"
              id="time"
              type="time"
              defaultValue={state.time}
              placeholder="00:00"
            />
          </div>

          <div className="nameinput">
            <label className="label" htmlFor="maxParticipants">
              Maximum number of participants
            </label>
            <input
              onChange={handleChange}
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
              onChange={handleChange}
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
              Localisation</label>
            <GooglePlacesAutocomplete
              inputClassName="input"
              id="localisation"
              type="text"
              onSelect={handleAddressChange}
              placeholder="Localisation"
              // onSelect={console.log}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["fr"]
                }
              }}
            />
          </div>

          <div className="nameinput">
            <button className="btn" disabled={state.isRequesting}>
              {" "}
              Create Event
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

// scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyA7z4NnofrdbUYkO8tXJq2UtaJF3LyNklU'])(withRouter);

// module export = scriptLoader;
