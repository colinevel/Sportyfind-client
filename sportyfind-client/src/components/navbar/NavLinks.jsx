import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <div>
      <NavLink className="link" activeClassName="is-active" to="/events">
        All Events
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/events/create">
        Create Events
      </NavLink>
    </div>
  );
}
