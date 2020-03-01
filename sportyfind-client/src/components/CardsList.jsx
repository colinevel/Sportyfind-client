import React from 'react'
import EventsCard from "../components/EventsCard";

export default function EventsCards({ events }) {
    console.log("this is events", events)
    return (
        <React.Fragment>
            <div className="allcards">
                {events.map((event, i) => {
                    return <EventsCard event={event} key={i} />
                })}
            </div>
        </React.Fragment>
    )
}