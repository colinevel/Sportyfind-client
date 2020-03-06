import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import APIHandler from "../api/APIHandler";




export default function Signin(props) {
    const [email, setEmail] = useState("test@sportyfind.com");
    const [password, setPassword] = useState("654654");
    const userContext = useContext(UserContext);
    const { setCurrentUser } = userContext;
    const [errMessage,setErrMessage]=useState("")

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const apiRes = await APIHandler.post("/signin", { email, password });
            setCurrentUser(apiRes.data.currentUser);
            props.history.push("/");
        } catch (err) {
            setCurrentUser(null);
            console.error(err)
            setErrMessage(err.response.data)
        }
    };

    return (
        <React.Fragment>
            <form className="form" onSubmit={handleSubmit}>
                <div className="all">
                    <h1 className="title">Signin</h1>
                    <div className="nameinput">

                        <label className="label" htmlFor="email">
                            email
                </label>
                        <input
                            className="input"
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="nameinput">

                        <label className="label" htmlFor="password">
                            password
                        </label>
                        <input
                            className="input"
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {errMessage && (<div className="errMessage">{errMessage}</div>)}
                    <button className="btnok">ok</button>

                </div>
            </form>
            <p className="parag">
                No account yet ? please{" "}
                <Link to="/signup" className="link">
                    signup
      </Link>
            </p>
        </React.Fragment>
    );
}
