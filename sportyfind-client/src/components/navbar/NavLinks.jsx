import React from "react";
import { NavLink } from "react-router-dom";

//style
import "../../styles/header.css";

export default function NavLinks() {
  return (
    <div className="navlink">
      <NavLink className="link" activeClassName="is-active" to="/events">
        All Events
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/events/create">
        Create Events
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/users/dashboard">
        My Dashboard
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/signin">
        LOG IN
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/users/:id">
        My profile
      </NavLink>
    </div>
  );
}
