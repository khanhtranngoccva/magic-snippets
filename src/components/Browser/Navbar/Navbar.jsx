import classes from "./Navbar.module.css";
import Logo from "../../Logo/Logo";
import React from "react";
import {UserContext} from "../../../contexts/UserContext";
import DirectLink from "../../DirectLink/DirectLink";
import ActionLink from "../../ActionLink/ActionLink";

export default function Navbar() {
    const {userInfo, userInfoFetched} = React.useContext(UserContext);

    let loginUI;
    if (userInfoFetched && !userInfo) {
        loginUI = <React.Fragment>
            <DirectLink href="/api/auth/google" className={classes.navLink}><i className="fas fa-door-open"></i>Login</DirectLink>
        </React.Fragment>
    } else if (userInfoFetched && userInfo) {
        loginUI = <React.Fragment>
            <DirectLink href="/api/auth/logout" className={classes.navLink}><i className="fas fa-door-open"></i>Logout</DirectLink>
        </React.Fragment>
    }

    return <div className={classes.navbar}>
        <Logo></Logo>
        <h1 className={classes.appName}>MagicSnippets!</h1>
        <ActionLink to={"/create"} className={classes.navLink}><i className="fas fa-pencil"></i>Create</ActionLink>
        {loginUI}
    </div>;
}