import React from 'react';
import { Link} from "react-router-dom";
import CardSport from "./../styles/CardSport.css";


export default function SportsCard({sport}) {

    return (
        <Link to={{
            pathname: "/events",
            search: `?sport=${sport.name}`,
            }} >
        <div className="card sport">
        
            <div className="sportname">
            <h2>{sport.name}</h2>
            </div>
            <div className="sportimage">
            <img src={sport.image} />
            </div>
        </div>
        </Link>
    )
}

