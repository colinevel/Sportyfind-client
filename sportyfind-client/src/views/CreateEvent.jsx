import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../api/APIHandler";

// import CustomInputFile from "./../icon/IconAvatarAdmin";

// styles
import "../styles/CreateEvent.css"
// Don't forget to import CSS file

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
    occurence:"",
    isRequesting: false
  });

  useEffect(() => {

    const getData = async () => {

      let newState = {...state}

      const sportsRes = await APIHandler.get(`/sports`);
      newState.sports = sportsRes.data.sports;

      if (mode === "edit") {
        const editEventRes = await APIHandler.get(`/events/edit/${_id}`);

        // In the state we want to store the id's of artist & labels
        // Because of the <selects> and when we post / patch to the server
        if (editEventRes.data.sports) editEventRes.data.sports = editEventRes.data.sports._id;

        // Convert date
        editEventRes.data.date =  new Date(editEventRes.data.date).toISOString().slice(0,10);

        // Add the edited Album data on the newState Object
        Object.assign(newState, editEventRes.data)
      }

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
      else {
        const apiResult = await APIHandler.patch(`/events/edit/${match.params.id}`, state);
      }

      history.push("/events");
    } catch (apiErr) {
      console.error(apiErr);
    }

  };


  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>

    <div className="nameinput">
    <label className="label" htmlFor="sport">
        Sport
      </label>
      <select id="sport" value={state.sport} > 
          <option value="" disabled>Select a sport</option>
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
      />
      </div>


      <div className="nameinput">
    <button className="btn" disabled={state.isRequesting}>{mode === "create" ? 'Create' : 'Edit'} Event</button>
    </div>
    </form>

  );

});
