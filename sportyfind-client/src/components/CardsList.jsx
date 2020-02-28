import React from 'react'
import EventsCard from "../components/EventsCard";

export default function EventsCards({ events }) {
    return (
        <React.Fragment>
            <div>
                {events.map((event, i) => (
                    <EventsCard event={event} key={i} />
                ))}
            </div>
        </React.Fragment>
    )
}