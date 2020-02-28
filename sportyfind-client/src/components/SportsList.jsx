import React from 'react'
import { Link } from "react-router-dom";
import SportsCard from "../components/SportsCard";

export default function SportsList({ sports }) {

    return (
        <React.Fragment>
            <div>
                {sports.map((sport, i) => (
                    <SportsCard sport={sport} key={i} />
                ))}
            </div>
        </React.Fragment>
    )
}
