import React from 'react'
import { Link } from "react-router-dom";
import EventsCard from "../components/EventsCard";

export default function EventsCards({ events }) {
    console.log("this is events", events)
    return (
        <React.Fragment>
            <div>
                {events.map((event, i) => {
                    return <EventsCard event={event} key={i} />
                })}
            </div>
        </React.Fragment>
    )
}