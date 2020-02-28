import React, { useContext, useState, useEffect } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";

// styles
// Don't forget to add the css file

React.createContext({
  currentUser: null,
  setCurrentUser: () => {}
});

export default function Event({ match }) {

  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [event, setEvent] = useState(null)

  console.log(event)

  useEffect(() => {

    const getData = async () => {
      const eventRes = await apiHandler.get(`/events/${match.params.id}`);
      setEvent(eventRes.data);
    }

    getData()

  }, []);

  return (
    <div className="">
        <div className="">{event && event.name}</div>
        <div className="">{event && event.sport}</div>
        <div className="">{event && event.name}</div>
        <div className="">{event && event.name}</div>
        <div className="">{event && event.name}</div>
        <div className="">{event && event.name}</div>
        <div className="">{event && event.name}</div>
        <div className="">{event && event.name}</div>
        
     
      </div>

  );
}
