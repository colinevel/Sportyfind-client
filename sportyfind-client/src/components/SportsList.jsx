import React from 'react'
import { Link } from "react-router-dom";
import SportsCard from "../components/SportsCard";
import List from "./../styles/List.css";

export default function SportsList({ sports }) {

    return (
        <React.Fragment>
            <div class="list">
                {sports.map((sport, i) => (
                    <SportsCard sport={sport} key={i} />
                ))}
            </div>
        </React.Fragment>
    )
}
