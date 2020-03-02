import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
// pages components
import CreateEvent from "./views/CreateEvent";
import Events from "./views/Events";
import Event from "./views/Event";
import MyDashboard from "./views/MyDashboard";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import UpdateEvent from "./views/UpdateEvent";
import UpdateUser from "./views/UpdateUser";
import User from "./views/User";
import NotFound from "./views/NotFound";
import Header from "./components/Header";


// auth
import { useAuth } from "./auth/useAuth";
import UserContext from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";


export default function App() {
  const { isLoading } = useAuth();
  
  const [currentUser, setCurrentUser] = useState({});

  // check src/auth/UserContext =>
  // MANDATORY TO GET/SET loggedin currentUser against server response
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    // the context provider will make currentUser informations down the component tree
    // check src/auth/UserContext
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? (
        null
      ) : (
        <React.Fragment>
        <Header />
          <main id="content_main">
            <Switch>
              <Route exact path="/" component={Home} />
              
              <Route exact path="/events" component={Events} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              {/* check the protected route in src/auth folder */}
              <Route path="/users/dashboard" component={MyDashboard} />
              <Route path="/users/edit/:id" component={UpdateUser} />
              <Route path="/users/:id" component={User} />
              <Route path="/events/create" component={CreateEvent} />
              <Route path="/events/edit/:id" component={UpdateEvent} />
              {/* check the protected route in src/auth folder */}

              <Route exact path="/events/:id" component={Event} />
           
              
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </React.Fragment>
      )}
    </UserContext.Provider>
  );
};






