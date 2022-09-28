import classes from "./Navbar.module.css";
import Logo from "../../Logo/Logo";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import {UserContext} from "../../../contexts/UserContext";
import EditButton from "../EditButton/EditButton";

export default function Navbar() {
    const {snippetData, snippetLastSave} = React.useContext(EditorContext);
    const {userInfo} = React.useContext(UserContext);

    function updateName(value) {
        snippetData.contents.name = value;
    }

    return <div className={classes.navbar}>
        <Logo></Logo>
        <div className={classes.snippetInfo}>
            <h1 className={classes.snippetName}>
                {snippetLastSave._contents.name}
                <i className="fa-solid fa-pen"></i>
            </h1>
            <span className={classes.author}>by {snippetLastSave.creator?.userName ?? userInfo?.userName ?? ""}</span>
        </div>
        <EditButton></EditButton>
    </div>;
}