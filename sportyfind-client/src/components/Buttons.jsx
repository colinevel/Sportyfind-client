import React, {  useState, useEffect } from 'react'
import { useAuth } from "../auth/useAuth";
import apiHandler from "../api/APIHandler";
import { withRouter} from "react-router-dom"


export default withRouter(function Buttons({  event, history, clbk }) {
    const { isLoading, currentUser } = useAuth();
    const [action, setAction] = useState(false);
    const [newEvent, setNewEvent] = useState(null)


    // let [newParticipants, setNewParticipants] = useState()

// console.log(newParticipants);


//     useEffect(() => {
//         if (!isLoading) {
//             const newParticipants = event.participants;
//             setNewParticipants({
//                 newParticipants
//             })
//         }
//     }, [isLoading]);


//     console.log(newParticipants);
    

   

//     const handleJoin = async e => {
//         try {
//             apiHandler
//             .patch(`/events/edit/${event._id}`, {
//                 participants: newParticipants.push(currentUser._id)
//             });
//             this.props.history.push({
//                 pathname: '/events',
//                 search: '?sport=AllSports'
//             });
//         } catch(err) {
//             //
//         }
//     }









    if (isLoading) return null;


    const deleteEvent = async () => {
        const eventRes = await apiHandler.delete("/events", event._id);
        if (clbk){
        clbk()
        setAction(!action)
        }
        else history.push({
            pathname: '/events',
            search: '?sport=AllSports'
        });
    }


    const joinEvent = async () => {
        const eventRes = await apiHandler.patch(`/events/join/${event._id}`,{});
        clbk()
        setAction(!action)
        setNewEvent(eventRes.data);
      }
    
      const leaveEvent = async () => {
        const eventRes = await apiHandler.patch(`/events/leave/${event._id}`,{});
        clbk()
        setAction(!action)
        setNewEvent(eventRes.data);
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
                <button className="btndeleteevent" onClick={deleteEvent}> Delete </button>
            ) : <p>NO DATA YET</p>}

            {event ? currentUser && participantsId.includes(currentUser._id) && currentUser._id !== event.creator._id && (<button className="btnleaveevent" onClick={leaveEvent}> Leave </button>
            ) : <p>NO DATA YET</p>}

            {event && currentUser ? !participantsId.includes(currentUser._id) && (<button className="btnjoinevent" 
            onClick={joinEvent}
            > Join </button>
            ) : <a href="/signin" className="btnjoinevent"> Join </a>}

        </div>
    )
})