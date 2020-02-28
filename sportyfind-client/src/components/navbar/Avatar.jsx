import React, { useEffect, useState } from "react";
import apiHandler from "./../../api/APIHandler";
import avatar from "./../../styles/avatar.css";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Avatar({ user }) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    apiHandler
      .get(`/users`)
      .then(res => {
        setAvatar(res.data.users[0].avatar);
        console.log("this is the avatar", res.data.users);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!avatar) return <div>No avatars yet</div>;

  return (
    <div>
      <img id="avatar" src={avatar} />
      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton> */}
    </div>
  );
}
