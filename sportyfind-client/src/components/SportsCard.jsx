import React from 'react';
import { Link} from "react-router-dom";


export default function SportsCard({sport}) {

    return (
        <div className="card sport">
            <h2>{sport.name}</h2>
            <img src={sport.image} />
        </div>
    )
}

