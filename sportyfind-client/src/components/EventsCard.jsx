import React from 'react'
import { Link } from "react-router-dom";
import APIHandler from "../api/APIHandler";

export default function EventsCard({event}) {
    var remainingPlaces = event.maxParticipants - event.participants.length;
    console.log(event,"in event cards")
    return (
        <div className="card event">
            {/* <div>{event.date}</div> */}
            <div>{event.name}</div>
            {event.sport && <div>{event.sport.name}</div>}
            <div>localisation : {event.localisation}</div>
            {/* <div>creator : {event.creator.username}</div> */}
            <div>remaining places : <span>{remainingPlaces}</span></div>
            <Link to={`/events/${event._id}`}>see more</Link>
        <div>join</div>
        </div>
    )
}
