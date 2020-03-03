import React, {  useState, useEffect } from 'react'
import { useAuth } from "../auth/useAuth";
import apiHandler from "../api/APIHandler";
import { withRouter} from "react-router-dom"


export default withRouter(function Buttons({  event, history, clbk }) {
    const { isLoading, currentUser } = useAuth();
    const [action, setAction] = useState(false);
    
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
    

//     // useEffect(() => {
//     //     if (!isLoading) {
//     //         const newParticipant = currentUser._id;
//     //         setNewParticipant(
//     //             newParticipant
//     //         )
//     //     }
//     // }, [isLoading]);
   

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


    //     e.preventDefault();  
    //     try {

    //         apiHandler
    //             .patch(`/events/${event._id}`, {
    //                 newParticipant
    //             });
    //             history.push({
    //                 pathname: '/events',
    //                 search: '?sport=AllSports'
    //             });

    //     } catch (err) {

    //         // this.props.history.push("/artists");
    //     }
    // }



    // const joinEvent = async () => {
    //     const eventRes = await apiHandler.patch("/events", match.params.id);
    // }




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

            {event ? currentUser && participantsId.includes(currentUser._id) && currentUser._id !== event.creator._id && (<button className="btnleaveevent"> Leave </button>
            ) : <p>NO DATA YET</p>}

            {event && currentUser ? !participantsId.includes(currentUser._id) && (<button className="btnjoinevent" 
            // onClick={handleJoin}
            > Join </button>
            ) : <a href="/signin" className="btnjoinevent"> Join </a>}

        </div>
    )
})