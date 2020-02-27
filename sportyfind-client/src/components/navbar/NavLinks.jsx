import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <div>
      <NavLink className="link" activeClassName="is-active" to="/all-events">
        All Events
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/create-event">
        Create Events
      </NavLink>
    </div>
  );
}
