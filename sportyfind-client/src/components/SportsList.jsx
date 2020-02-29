import React from 'react'
import SportsCard from "../components/SportsCard";


export default function SportsList({ sports }) {

    return (
        <React.Fragment>
        <div className="alllist">
            <div class="list">
                {sports.map((sport, i) => (
                    <SportsCard sport={sport} key={i} />
                ))}
            </div>
        </div>
        </React.Fragment>
    )
}
