import React from 'react'


export default function EventsCard({event}) {
    return (
        <div className="card event">
            <div>{event.name}</div>
            <div>{event.sport}</div>
            <div>{event.localisation}</div>
        </div>
    )
}
