import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../api/APIHandler";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";


export default class Signup extends Component {
    state = {
        avatar: "",
        tmpAvatar: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        city: "",
        errMessage: ""
    };


    handleSubmit = async e => {
        e.preventDefault();

        const fd = new FormData();
        // create a form data (programatic form, to send the file as binary)
        fd.append("email", this.state.email);
        fd.append("firstName", this.state.firstName);
        fd.append("lastName", this.state.lastName);
        fd.append("city", this.state.city);
        fd.append("password", this.state.password);
        fd.append("username", this.state.username);
        fd.append("avatar", this.state.avatar);

        try {
            await APIHandler.post("/signup", fd);

            this.props.history.push("/signin");
        } catch (err) {
            console.error(err);
            this.setState({ errMessage: err.response.data});

        }
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleImage = e => {
        this.setState({ avatar: e.target.files[0] }, () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // when the fileREader ends  ...
                const baseString = reader.result; // get the image as a base64 encoded string
                this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
            };
            reader.readAsDataURL(this.state.avatar); // read the file from the local disk
        });
    };

    render() {
        const { email, password, username, firstName, lastName, city, tmpAvatar } = this.state;
        return (
            <React.Fragment>
                <form
                    className="form"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                >
                    <div className="all">
                        <h1 className="title">Signup</h1>

                        <div className="nameinput">

                            <label className="label" htmlFor="avatar">
                                avatar
                    </label>
                            <IconAvatarAdmin avatar={tmpAvatar} clbk={this.handleImage} />
                            <label className="label" htmlFor="username">
                                username
                    </label>
                            <input
                                className="input"
                                id="username"
                                type="text"
                                name="username"
                                defaultValue={username}
                            />

                        </div>

                        <div className="nameinput">
                            <label className="label" htmlFor="firstName">
                                firstName
                    </label>
                            <input
                                className="input"
                                id="firstName"
                                type="text"
                                name="firstName"
                                defaultValue={firstName}
                            />

                        </div>

                        <div className="nameinput">

                            <label className="label" htmlFor="lastName">
                                lastName
                    </label>
                            <input
                                className="input"
                                id="lastName"
                                type="text"
                                name="lastName"
                                defaultValue={lastName}
                            />

                        </div>

                        <div className="nameinput">


                            <label className="label" htmlFor="city">
                                city
                    </label>
                            <input
                                className="input"
                                id="city"
                                type="text"
                                name="city"
                                defaultValue={city}
                            />

                        </div>

                        <div className="nameinput">

                            <label className="label" htmlFor="email">
                                email
                    </label>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={email}
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
                                name="password"
                                defaultValue={password}
                            />


                            {this.state.errMessage && (<div className="errMessage">{this.state.errMessage}</div>)}


                            <button className="btnok">ok</button>

                        </div>
                    </div>
                    <p className="parag">
                    Already a member ? please{" "}
                    <Link to="/signin" className="link">
                        Signin
                        </Link>
                </p>
                </form>

            </React.Fragment>
        );
    }
}