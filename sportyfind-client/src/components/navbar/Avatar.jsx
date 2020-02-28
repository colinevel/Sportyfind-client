import React, { useEffect, useState } from "react";
import apiHandler from "./../../api/APIHandler";
import avatar from "./../../styles/avatar.css";
var Dropdown = require('react-simple-dropdown');
var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;


export default function Avatar() {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    apiHandler
      .get(`/users`)
      .then(res => {
        setAvatar(res.data.users.avatar);
        console.log("this is the avatar", res.data.users);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!avatar) return <div>No avatars yet</div>;
  return (
    <div>
      <Dropdown>
                <DropdownTrigger>
                <img id="avatar" src={avatar} alt="avatar" />
                </DropdownTrigger>
                <DropdownContent>
                    <ul>
                        <li>
                            <a href="/myprofile">My Profile</a>
                        </li>
                        <li>
                            <a href="/mydashboard">My Dashboard</a>
                        </li>
                        <li>
                            <a href="/logout">Log Out</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
    </div>
  );
}
