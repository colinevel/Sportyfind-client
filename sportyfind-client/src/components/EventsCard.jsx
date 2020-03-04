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
                {event.sport && <div>{event.sport.name} {event.sport.logo}</div>}
                <div>{event.name}</div>
                <div>{event.localisation}</div>
                <div>Remaining places : <span>{remainingPlaces}</span></div>
                <div className="seemoreandjoin">

                    <Link className="seemore action-button" to={`/events/${event._id}`}>Details</Link>
                    <Buttons event={event} history={history} clbk={clbk}/>
                </div>
            </div>
        </div>
    )
}
