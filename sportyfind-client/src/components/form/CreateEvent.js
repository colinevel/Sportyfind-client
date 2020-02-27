import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";

// import CustomInputFile from "./../icon/IconAvatarAdmin";

// styles
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
    occurence:"",
    isRequesting: false
  });

  useEffect(() => {

    const getData = async () => {

      let newState = {...state}

      const sportRes = await APIHandler.get(`/sport`);
      newState.sport = sportRes.data.sport;

      if (mode === "edit") {
        const editEventRes = await APIHandler.get(`/events/edit/${_id}`);

        // In the state we want to store the id's of artist & labels
        // Because of the <selects> and when we post / patch to the server

        if (editEventRes.data.sport) editEventRes.data.sport = editEventRes.data.sport._id;

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

      <label className="label" htmlFor="title">
        Title
      </label>
      <input
        className="input"
        id="title"
        type="text"
        defaultValue={state.title}
        required
      />

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

      <label className="label" htmlFor="artist">
        Artists
      </label>
      <select id="artist" value={state.artist} required>
          <option value="" disabled>Select an artist</option>
        {state.artists.map((artist, i) => (
          <option value={artist._id} key={i}>{artist.name}</option>
        ))}
      </select>

      <label className="label" htmlFor="label">
        Labels
      </label>
      <select id="label" value={state.label} required>
        <option value="" disabled>Select a label</option>
        {state.labels.map((label, i) => (
          <option value={label._id} key={i}>{label.name}</option>
        ))}
      </select>

      <label className="label" htmlFor="releaseDate">
        Release Date
      </label>
      <input
        className="input"
        id="releaseDate"
        type="date"
        value={state.releaseDate}
      />

    <button className="btn" disabled={state.isRequesting}>{mode === "create" ? 'Create' : 'Edit'} ablum</button>
    </form>
  );

});