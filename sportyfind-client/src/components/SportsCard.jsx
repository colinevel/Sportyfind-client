import React from 'react';
import { Link} from "react-router-dom";
import CardSport from "./../styles/CardSport.css";



export default function SportsCard({sport}) {

    return (
        <Link to={`/events/`} >
        <div className="card sport">
            <h2>{sport.name}</h2>
            <img src={sport.image} />
        </div>
        </Link>
    )
}

