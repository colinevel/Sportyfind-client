import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import IconSignout from "./../icon/IconSignout";


//style
import "../../styles/header.css";

export default function NavLinks() {
  const { isLoading, currentUser } = useAuth();

  if (isLoading) return null;

  return (
    <div className="navlink">

      <NavLink className="link" activeClassName="is-active" to={{
        pathname: "/events",
        search: `?sport=AllSports`,
      }}>
        All Events
      </NavLink>
      <NavLink className="link" activeClassName="is-active" to="/events/create">
        Create Events
      </NavLink>
      {!currentUser && (
        <NavLink className="link" activeClassName="is-active" to="/signin">
          Login
      </NavLink>
      )}
      {currentUser && (
        <NavLink className="link" activeClassName="is-active" to="/users/dashboard">
          My Dashboard
      </NavLink>
      )}
      {currentUser && (
        <NavLink className="link" activeClassName="is-active" to="/users/:id">
          My profile
      </NavLink>
      )}
      {currentUser && (
        <IconSignout />
      )}
    </div>
  );
}
