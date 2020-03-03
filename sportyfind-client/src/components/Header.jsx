import React, { useEffect, useState, Component } from "react";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import "./../styles/header.css";
import IconAvatarDisplay from "../components/icon/IconAvatarDisplay";
import UserContext from "../auth/UserContext";


export default class Signup extends Component {
  state = {
      avatar: "",
      tmpAvatar: "",
  };


  handleImage = e => {
      // console.log("Signup@handle image", e.target.files[0]);
      this.setState({ avatar: e.target.files[0] }, () => {
          const reader = new FileReader();
          reader.onloadend = () => {
              // when the fileREader ends  ...
              const baseString = reader.result; // get the image as a base64 encoded string
              this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
          };
          reader.readAsDataURL(this.state.avatar); // read the file from the local disk
      });
  };


render () {
  const { tmpAvatar } = this.state;
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
  <div className="headeravatar"><IconAvatarDisplay avatar={tmpAvatar} clbk={this.handleImage} /></div>
  <label class="hamburger" for="nav-toggle"></label>
  </div>
</header>
    </div>
  )
}}
