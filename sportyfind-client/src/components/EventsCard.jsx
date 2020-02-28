import React from 'react'
import { Link } from "react-router-dom";

export default function EventsCard({event}) {
    var remainingPlaces = event.maxParticipants - event.participants.length
    return (
        <div className="card event">
            {/* <div>{event.date}</div> */}
            <div>{event.name}</div>
            <div>{event.sport}</div> 
            <div>localisation : {event.localisation}</div>
            {/* <div>creator : {event.creator.username}</div> */}
    <div>remaining places : <span>{remainingPlaces}</span></div>
            <Link to={`/events/${event._id}`}>see more</Link>
        <div>join</div>
        </div>
    )
}
