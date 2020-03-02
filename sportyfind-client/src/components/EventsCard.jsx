import React from 'react'
import { Link } from "react-router-dom";
import APIHandler from "../api/APIHandler";

// styles
import "../styles/eventscard.css"

export default function EventsCard({event}) {
    var remainingPlaces = event.maxParticipants - event.participants.length;
    return (

        <div className="cardOfevent" >
         <img className="backimg" src={event.sport.image} alt=""/>
        
            <div className="eventdate">
                <div >{event.date}</div>
            </div>

            <hr className="separation"></hr>
            <div className="information">
            <div>{event.name}</div>
            {event.sport && <div>{event.sport.name} {event.sport.logo}</div>}
            <div>localisation : {event.localisation}</div>
            {/* <div>creator : {event.creator.username}</div> */}
            <div>remaining places : <span>{remainingPlaces}</span></div>
            <div className="seemoreandjoin">

            <Link className="seemore" to={`/events/${event.name}`}>see more</Link>
            <div className="join">join</div></div>
           
        </div>
        
        </div>
    )
}
