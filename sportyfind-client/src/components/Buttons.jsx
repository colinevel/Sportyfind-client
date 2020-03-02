import React from 'react'
import { useAuth } from "../auth/useAuth";
import apiHandler from "../api/APIHandler";



export default function Buttons({ match, event, history }) {
    const { isLoading, currentUser } = useAuth();

    if (isLoading) return null;



    const deleteEvent = async () => {
        const eventRes = await apiHandler.delete("/events", match.params.id);
        history.push({
            pathname: '/events',
            search: '?sport=AllSports'
        });
    }


    return (
        <div className="buttons">

            {event ? currentUser._id === event.creator && (
                <button className="btndeleteevent" onClick={deleteEvent}> Delete </button>
            ) : <p>NO DATA YET</p>}

            {event ? event.participants.includes(currentUser._id) && currentUser._id !== event.creator && (<button className="btnleaveevent"> Leave </button>
            ) : <p>NO DATA YET</p>}

            {event ? !event.participants.includes(currentUser._id) && (<button className="btnjoinevent"> Join </button>
            ) : <p>NO DATA YET</p>}

        </div>
    )
}
