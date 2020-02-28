import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import MapsContainer from "./../components/MapsContainer";

// styles
import "../styles/event.css"

React.createContext({
  currentUser: null,
  setCurrentUser: () => {}
});

export default function Event({ match }) {

  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [event, setEvent] = useState(null)

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
        <div className="googlemap">
        <MapsContainer />
        </div>     
      </div>

      <div className="adminbuttons">
    <button className="btndeleteevent"> Delete </button>
    <button className="btnjoinevent"> Join </button>
    <button className="btnleaveevent"> Leave </button>
    <button className="btneditevent"> Edit </button>
    </div>

      </div>

  );
}
