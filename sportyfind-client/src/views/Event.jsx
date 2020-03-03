import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import Cardevent from "../components/card/Cardevent";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import MapsContainer from "./../components/MapsContainer";
import Buttons from "./../components/Buttons";
import moment from 'moment';
import { Link } from "react-router-dom";

// styles
import "../styles/event.css"


React.createContext({
  currentUser: null,
  setCurrentUser: () => { }
});

export default function Event({ match, history }) {


  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [event, setEvent] = useState(null)

  const deleteEvent = async () => {
    const eventRes = await apiHandler.delete("/events", match.params.id);
    history.push("/events");
  }

  useEffect(() => {

    const getData = async () => {
      const eventRes = await apiHandler.get(`/events/${match.params.id}`);
      setEvent(eventRes.data);
    }

    getData()
    

  }, []);

  


  return (
    <div>
      <div><h1 className="eventtitle">Event Details</h1></div>

      <div className="eventdetails">
        <div className="eventdescr">
          <div className="details">Name of the event: {event && event.name}</div>
          <div className="details">Sport: {event && event.sport.name} {event && event.sport.logo}</div>
          <div className="details">Event Date&Hour: {event && event.date}</div>
          <div className="details">Event's creator: {event && event.creator}</div>
          <div className="details">Participants: {event && event.participants}</div>
          <div className="details">Max participants: {event && event.maxParticipants}</div>
        </div>
        <div className="details">Event's localisation: {event && event.localisation}
          <div className="googlemap">
            {event && <MapsContainer lat={event.lat} lng={event.lng} />}
        <div className="details">Name of the event: {event && event.name}</div>
        <div className="details">Sport: {event && event.sport.name} {event && event.sport.logo}</div>
        <div className="details">Event Date: {event && moment(event.date).format("MMMM Do YYYY")}</div>
        <div className="details">Event Time: {event && event.time}</div>
        <div className="details">Event's creator: {event && event.creator.username}</div>
        <div className="details">Participants: <ul>{event && event.participants.map((p,i)=> <li key={i}>{p.username}</li>)} </ul></div>
        <div className="details">Max participants: {event && event.maxParticipants}</div> 


        </div>
        <div className="details">Event's localisation: {event && event.localisation}
          <div className="googlemap">
          {event &&  <MapsContainer style={{width: "50%", height: "50%"}} lat={event.lat} lng={event.lng}/>}
          </div>
        </div>
      </div>

      <div className="adminbuttons">
    <button className="btndeleteevent" onClick={deleteEvent}> Delete </button>
    <button className="btnjoinevent"> Join </button>
    <button className="btnleaveevent"> Leave </button>
    <Link to={`/events/edit/${match.params.id}`}><button className="btneditevent"> Edit </button>
    </Link>
    </div>

        {event ? currentUser._id === event.creator && (
          <Link to={`/events/edit/${match.params.id}`}> <button className="btneditevent"> Edit </button>
          </Link>
        ) : <p>NO DATA YET</p>}
        
      </div>

    </div>

  );
}
