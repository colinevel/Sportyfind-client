import React, { useEffect, useState } from "react";
import apiHandler from "../api/APIHandler";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import header from "./../styles/header.css";


export default function Header({logo, btn_allEvents, btn_createEvents}) {

return (
        <div id="header">
            <Logo />
            <NavLinks />
            <Avatar />
        </div>
    )
}
