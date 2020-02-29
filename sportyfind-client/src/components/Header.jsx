import React, { useEffect, useState } from "react";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import "./../styles/header.css";
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Header({logo, btn_allEvents, btn_createEvents}) {

return (
        <div id="header">
        <Logo />
        <div className="navavatar">
        <NavLinks/>
        <div className="headeravatar"><Avatar /></div>
        </div>
        </div>
    )
}
