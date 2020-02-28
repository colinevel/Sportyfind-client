import React, { useContext, useState } from "react";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { useAuth } from "../auth/useAuth";

import { Link } from "react-router-dom";
import apiHandler from "../api/APIHandler";
// styles


export default function User() {
    const { isLoading, currentUser } = useAuth();

    const [newAvatar, setAvatar] = useState(
        currentUser ? currentUser.avatar : ""
    );

    const [newAvatarTmp, setAvatarTmp] = useState("");

    

    const handleAvatar = file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // when the fileReader ends reading image  ...
            const baseString = reader.result;
            setAvatar(file);
            setAvatarTmp(baseString); // set the tmp avatar as an image source before upload
        };
        reader.readAsDataURL(file); // read the file from the local disk
    };

   

    return (
        <div className="eventdetails">
            <div className="eventdescr">
                <IconAvatarAdmin avatar={currentUser.avatar} clbk={e => handleAvatar(e.target.files[0])} />
                <div className="details">Username: {currentUser.username}</div>
                <div className="details">First Name: {currentUser.firstName}</div>
                <div className="details">Last Name: {currentUser.lastName}</div>
                <div className="details">City: {currentUser.city}</div>
                <div className="details">Email: {currentUser.email}</div>
                <Link className="link"  to="/users/edit/:id">
            <button className="btn">edit</button>
      </Link>
            </div>
            
            
        </div>
    );
}