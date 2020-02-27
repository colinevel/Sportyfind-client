import React, { useEffect, useState } from "react";
import apiHandler from "../api/APIHandler";
import Logo from "./../components/navbar/Logo";
import NavLinks from "./../components/navbar/NavLinks";
import Avatar from "./../components/navbar/Avatar";
import header from "./../styles/header.css";


export default function Header({logo, btn_allEvents, btn_createEvents}) {

//     const [avatar, setAvatar] = useState(null);

//     useEffect(() => {
//       apiHandler
//         .get(`/users`)
//         .then(res => {
//           setAvatar(res.data.users);
//           console.log("this is the user data", res.data.users);
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }, []);

// if (!avatar) return <div>No avatars yet</div>;
return (
        <div id="header">
            <Logo />
            <NavLinks />
            <Avatar />
        </div>
    )
}
