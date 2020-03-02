import React, {  useState, useEffect } from "react";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { useAuth } from "../auth/useAuth";
import APIHandler from "../api/APIHandler";
// styles


export default function UpdateUser(props) {
    const { isLoading, currentUser } = useAuth();


console.log(props)
    // const [newAvatarTmp, setAvatarTmp] = useState("");
    // const [newEmail, setEmail] = useState(currentUser ? currentUser.email : "");
    // const [newUsername, setUsername] = useState("");
    // const [newFirstName, setFirstName] = useState("");
    // const [newLastName, setLastName] = useState("");
    // const [newCity, setCity] = useState("");
    // const [newPassword, setNewPassword] = useState("654654");
    // const [oldPassword, setOldPassword] = useState("654654");

    const [{ avatarTmp,
        email,
        username,
        firstName,
        lastName,
        city,
        avatar,
        password }, setFullUser] = useState({
            avatarTmp: "",
            email: "",
            username: "",
            lastName: "",
            firstName: "",
            city: "",
            password: "",
            avatar: null
        })


    useEffect(() => {
        if (!isLoading) {
            const {
                email,
                username,
                lastName,
                firstName,
                city,
                password,
                avatar } = currentUser;
            setFullUser({
                email,
                username,
                lastName,
                firstName,
                city,
                password,
                avatar
            })
        }
    }, [isLoading]);

    const handleSubmit = async e => {
        e.preventDefault();


        const fd = new FormData();
        // create a form data (programatic form, to send the file as binary)

        fd.append("email", email);
        fd.append("firstName", firstName);
        fd.append("lastName", lastName);
        fd.append("city", city);
        // fd.append("password", password);
        fd.append("username", username);
        fd.append("avatar", avatar);
        fd.append("userId", currentUser._id)

        try {
            await APIHandler.patch(`/users/${currentUser._id}`, fd);

            props.history.push(`/users/:id`);
        } catch (err) {
        }
    };

    const handleAvatar = file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // when the fileReader ends reading image  ...
            const baseString = reader.result;
            setFullUser({ avatar: file, avatarTmp: baseString })
            // setAvatar(file);
            // setAvatarTmp(baseString); // set the tmp avatar as an image source before upload
        };
        reader.readAsDataURL(file); // read the file from the local disk
    };

    const handleChange = e => {
        if (e.target.type === "file") return;

        e.persist();
        setFullUser(prevValues => ({ ...prevValues, [e.target.id]: e.target.value }))
    };

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
            onChange={handleChange}
        >
            <h1 className="title">Update infos</h1>
            <label className="label" htmlFor="avatar">
                avatar
                    </label>
            <IconAvatarAdmin avatar={avatarTmp || currentUser.avatar} clbk={e => handleAvatar(e.target.files[0])} />

            <label htmlFor="username">username</label>
            <input
                className="input"
                id="username"
                type="text"
                defaultValue={currentUser.username}
            // onChange={e => setUsername(e.target.value)}
            />
            <label className="label" htmlFor="firstName">
                firstName
                    </label>
            <input
                className="input"
                id="firstName"
                type="text"
                defaultValue={currentUser.firstName}
            // onChange={e => setFirstName(e.target.value)}
            />
            <label className="label" htmlFor="lastName">
                lastName
                    </label>
            <input
                className="input"
                id="lastName"
                type="text"
                defaultValue={currentUser.lastName}
            // onChange={e => setLastName(e.target.value)}
            />
            <label className="label" htmlFor="city">
                city
                    </label>
            <input
                className="input"
                id="city"
                type="text"
                defaultValue={currentUser.city}
            // onChange={e => setCity(e.target.value)}
            />
            <label htmlFor="email">email</label>
            <input
                className="input"
                id="email"
                type="email"
                defaultValue={currentUser.email}
            // onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">old password</label>
            <input
                className="input"
                id="old-password"
                type="password"
                placeholder="your previous password here"
            // onChange={e => setOldPassword(e.target.value)}
            />
            <label htmlFor="password">new password</label>
            <input
                className="input"
                id="new-pasword"
                type="password"
                placeholder="your new password here"
            // onChange={e => setNewPassword(e.target.value)}
            />
            <button className="btn">ok</button>
        </form>
    );
}