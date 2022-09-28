import classes from "./EditButton.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";
import {UserContext} from "../../../contexts/UserContext";
import {useParams} from "react-router-dom";
import ActionLink from "../../ActionLink/ActionLink";

export default function EditButton() {
    const editorContext = React.useContext(EditorContext);
    const userContext = React.useContext(UserContext);
    const params = useParams();

    console.log(editorContext.snippetLastSave.creator);

    if (userContext.userInfo?._id === editorContext.snippetLastSave.creator?._id) {
        return <ActionLink to={`/edit/${params.snippetID}`} className={classes.button}>
            <i className="fa-solid fa-pen"></i><span>Edit</span>
        </ActionLink>
    }
}