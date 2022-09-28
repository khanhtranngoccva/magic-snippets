import React from "react";
import {EditorContext} from "../../contexts/EditorContext";
import ActionButton from "../ActionButton/ActionButton";
import classes from "./BlogModeToggler.module.css";

export default function BlogModeToggler() {
    const snippetContext = React.useContext(EditorContext);

    if (snippetContext.blogMode) {
        return <ActionButton onClick={() => {
            snippetContext.setBlogMode(false)
        }} className={classes.button}>
            <i className="fa-solid fa-computer"></i>View code
        </ActionButton>
    } else {
        return <ActionButton onClick={() => {
            snippetContext.setBlogMode(true)
        }} className={classes.button}>
            <i className="fa-solid fa-book"></i>View blog
        </ActionButton>
    }
}