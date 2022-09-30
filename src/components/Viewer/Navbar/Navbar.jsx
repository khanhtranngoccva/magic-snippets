import classes from "./Navbar.module.css";
import Logo from "../../Logo/Logo";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import {UserContext} from "../../../contexts/UserContext";
import EditButton from "../EditButton/EditButton";
import LikeButton from "../LikeButton/LikeButton";
import ActionLink from "../../ActionLink/ActionLink";

export default function Navbar() {
    const {snippetLastSave} = React.useContext(EditorContext);
    const {userInfo} = React.useContext(UserContext);

    return <div className={classes.navbar}>
        <Logo></Logo>
        <div className={classes.snippetInfo}>
            <h1 className={classes.snippetName}>
                {snippetLastSave._contents.name}
            </h1>
            <span className={classes.author}>by {snippetLastSave.creator?.userName ?? userInfo?.userName ?? ""}</span>
        </div>
        <LikeButton></LikeButton>
        <EditButton></EditButton>
    </div>;
}