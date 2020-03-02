import React, { useEffect, useState } from "react";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import "./../styles/header.css";
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Header({logo, btn_allEvents, btn_createEvents}) {

return (
    <div>    
        {/* <div id="header" className="header">
        <Logo />
        <div className="navavatar">
        <NavLinks/>
        <div className="headeravatar"><Avatar /></div>
        </div>
        </div> */}

        <header>

    
  <Logo />
<div className="hamburgerAndAvatarContainer">
  <input id="nav-toggle" type="checkbox" class="hidden" />
  <nav>
    <ul>
      <li><a href="#"><NavLinks/></a></li>
    </ul>
  </nav>
  <div className="headeravatar"><Avatar /></div>
  <label class="hamburger" for="nav-toggle"></label>
  </div>
</header>
    </div>
    )
}
