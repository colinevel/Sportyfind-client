import React from 'react';
import logo from "./../../styles/logo.css";
import { Link } from 'react-router-dom';
export default function Logo() {

    return (
        <Link exact to="/" className="logoContainer">
        <div className="logo">
            <img id="logo" src="/images/logo-sportyfind.png" alt="logo" />
        </div>
        </Link>
    )
}

