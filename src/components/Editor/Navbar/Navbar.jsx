import classes from "./Navbar.module.css";
import Logo from "../../Logo/Logo";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import ResizableInput from "../ResizableInput/ResizableInput";
import {UserContext} from "../../../contexts/UserContext";
import BlogModeToggler from "../BlogModeToggler/BlogModeToggler";
import SaveButton from "../SaveButton/SaveButton";

export default function Navbar() {
    const {snippetData, snippetLastSave} = React.useContext(EditorContext);
    const {userInfo} = React.useContext(UserContext);

    function updateName(value) {
        snippetData.name = value;
    }

    return <div className={classes.navbar}>
        <Logo></Logo>
        <div className={classes.snippetInfo}>
            <label className={classes.snippetName}>
                <ResizableInput defaultValue={snippetData._name} placeholder={"An unnamed magic snippet!"} className={classes.input} onInput={updateName}></ResizableInput>
                <i className="fa-solid fa-pen"></i>
            </label>
            <span className={classes.author}>by {snippetLastSave.creator?.userName ?? userInfo?.userName ?? ""}</span>
        </div>
        <BlogModeToggler></BlogModeToggler>
        <SaveButton></SaveButton>
    </div>;
}