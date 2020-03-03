import React, { useEffect, useState, Component } from "react";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import "./../styles/header.css";
import IconAvatarDisplay from "../components/icon/IconAvatarDisplay";
import UserContext from "../auth/UserContext";
import { useAuth } from "../auth/useAuth";


export default function Header () {
  const { isLoading, currentUser } = useAuth();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    let newAvatar = null;
    if (!isLoading && currentUser) {
      newAvatar = currentUser.avatar;
    }
    setAvatar(newAvatar)
  }, [isLoading]) 

  return (

    <div>    

        <header>    
  <Logo />
<div className="hamburgerAndAvatarContainer">
  <input id="nav-toggle" type="checkbox" class="hidden" />
  <nav>
    <ul>
      <li><a href="#"><NavLinks/></a></li>
    </ul>
  </nav>
  {currentUser ?
  <div className="headeravatar">
  <IconAvatarDisplay avatar={avatar || currentUser.avatar} />
  </div> : ""
  }
  <label class="hamburger" for="nav-toggle"></label>
  </div>
</header>
    </div>
  )
}
