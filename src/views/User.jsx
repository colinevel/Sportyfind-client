import React, {  useState } from "react";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { useAuth } from "../auth/useAuth";
import IconAvatarDisplay from "../components/icon/IconAvatarDisplay";

import { Link } from "react-router-dom";



export default function User() {
    const { currentUser } = useAuth();

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
            <IconAvatarDisplay avatar={currentUser.avatar} />
                
                <div className="details">Username: {currentUser.username}</div>
                <div className="details">First Name: {currentUser.firstName}</div>
                <div className="details">Last Name: {currentUser.lastName}</div>
                <div className="details">City: {currentUser.city}</div>
                <div className="details">Email: {currentUser.email}</div>             
                <Link className="linkedit"  to="/users/edit/:id">               
                <button className="btnupdateuser">edit</button>
                </Link>
              
            </div>
            </div>
                       
    );
}