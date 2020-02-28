import React from 'react';
import logo from "./../../styles/logo.css";
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link exact to="/" >
        <div>
            <img id="logo" src="./../../../images/logoSportify.png" />
        </div>
        </Link>
    )
}
