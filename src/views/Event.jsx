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

var remainingPlaces;

  if(event) remainingPlaces = event.maxParticipants - event.participants.length;

  


  const getData = async () => {
    const eventRes = await apiHandler.get(`/events/${match.params.id}`);
    setEvent(eventRes.data);
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <div><h1 className="eventtitle">{event && event.name}</h1></div>
      <div className="eventdetails">
        <div className="eventdescr">
          {/* <div className="details">Name of the event: {event && event.name}</div> */}
          {/* <div className="details">Sport: {event && event.sport.name} {event && event.sport.logo}</div> */}
          <div className="details"><img src={`https://source.unsplash.com/400x200/?${event && event.sport.name}`} alt=""/></div>

          <div className="details">Date of Event: {event && moment(event.date).format("MMMM Do YYYY")}</div>
          <div className="details">Time of Event: {event && event.time}</div>
          <div className="details">Organizer: {event && event.creator.username}</div>
          <div className="details">Participants: {event && event.participants.length} <ul>{event && event.participants.map((p, i) => <li key={i}>{p.username}</li>)} </ul></div>
          <div className="details">Max participants: {event && event.maxParticipants}</div>
        </div>
        <div className="details" id="localisation">Localisation: {event && event.localisation}
          <div className="googlemap">
            {event && <MapsContainer style={{ width: "50%", height: "50%" }} lat={event.lat} lng={event.lng} />}
          </div>
        </div>
      </div>

     
   
      <div className="adminbuttons">
      <Buttons 
      remainingPlaces={remainingPlaces} 
      event={event} 
      match={match} 
      clbk={() => getData()}
      />



      {event ? currentUser && currentUser._id === event.creator._id && (
        <Link to={`/events/edit/${match.params.id}`}> <button className="btneditevent"> Edit </button>
        </Link>
      ) : <p>NO DATA YET</p>}

    </div>
    </div>

  );
}
