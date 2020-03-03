import React from 'react'
import { Link } from "react-router-dom";
import moment from 'moment';
import Buttons from "./Buttons"


// styles
import "../styles/eventscard.css"

export default function EventsCard({ event,history, clbk }) {
    var remainingPlaces = event.maxParticipants - event.participants.length;
    return (

        <div className="cardOfevent" >
            <img className="backimg" src={event.sport.image} alt="" />

            <div className="eventdate">
                <div >{moment(event.date).format("MMMM Do YYYY")} - {event.time}</div>
            </div>

            <hr className="separation"></hr>
            <div className="information">
                <div>{event.name}</div>
                {event.sport && <div>{event.sport.name} {event.sport.logo}</div>}
                <div>localisation : {event.localisation}</div>
                <div>remaining places : <span>{remainingPlaces}</span></div>
                <div className="seemoreandjoin">

                    <Link className="seemore" to={`/events/${event._id}`}>see more</Link>
                    <Buttons event={event} history={history} clbk={clbk}/>
                </div>
            </div>
        </div>
    )
}
