import React, { useState, useEffect } from 'react'
import { useAuth } from "../auth/useAuth";
import apiHandler from "../api/APIHandler";
import { withRouter } from "react-router-dom"


export default withRouter(function Buttons({ event, history, clbk, match }) {
    const { isLoading, currentUser } = useAuth();
    const [action, setAction] = useState(false);




    useEffect(() => {
        clbk()
    }, []);

    if (isLoading) return null;

    const deleteEvent = async () => {
        await apiHandler.delete("/events", event._id);
        clbk()
        setAction(!action)
        history.push({
            pathname: '/events',
            search: '?sport=AllSports'
        });
    }


    const joinEvent = async () => {
        await apiHandler.patch(`/events/join/${event._id}`, {});
        clbk()
        setAction(!action)
    }

    const leaveEvent = async () => {
        await apiHandler.patch(`/events/leave/${event._id}`, {});
        clbk()
        setAction(!action)
    }





    let participantsId


    if (event) {
        participantsId = event.participants.map((i) => {
            return i._id
        })
    }




    return (
        <div className="buttons">


            {event ? currentUser && currentUser._id === event.creator._id && (
                <button className="btndeleteevent action-button" onClick={deleteEvent}> Delete </button>
            ) : <p>NO DATA YET</p>}

            {event ? currentUser && participantsId.includes(currentUser._id) && currentUser._id !== event.creator._id && (<button className="btnleaveevent action-button" onClick={leaveEvent}> Leave </button>
            ) : <p>NO DATA YET</p>}

            {event && currentUser ? !participantsId.includes(currentUser._id) && (<button className="btnjoinevent action-button"
                onClick={joinEvent}
            > Join </button>
            ) : <a href="/signin" className="btnjoinevent action-button"> Join </a>}

        </div>
    )
})