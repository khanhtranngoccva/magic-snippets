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

    const [saveState, setSaveState] = React.useState("idle");
    const timeoutRef = React.useRef(null);

    async function remixFunction() {
        const success = await editorContext.remixSnippet();
        if (success) {
            setSaveState("success");
        } else {
            setSaveState("failure");
        }
    }

    React.useEffect(() => {
        clearTimeout(timeoutRef.current);
        if (saveState === "success" || saveState === "failure") {
            timeoutRef.current = setTimeout(() => {
                setSaveState("idle");
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [saveState]);

    if (userContext.userInfo?._id === editorContext.snippetLastSave.creator?._id) {
        return <ActionLink to={`/edit/${params.snippetID}`} className={classes.button}>
            <i className="fa-solid fa-pen"></i><span>Edit</span>
        </ActionLink>
    } else if (userContext.userInfo?._id) {
        if (saveState === "idle") {
            return <ActionButton onClick={remixFunction} className={classes.button}>
                <i className="fa-solid fa-record-vinyl"></i>Remix!
            </ActionButton>;
        } else if (saveState === "processing") {
            return <ActionButton className={classes.button}>
                <i className="fa-solid fa-hourglass"></i>
                <span>Saving...</span>
            </ActionButton>;
        } else if (saveState === "failure") {
            return <ActionButton className={`${classes.button} ${classes.failure}`} onClick={remixFunction}>
                <i className="fa-solid fa-xmark"></i>
                <span>Save failed.</span>
            </ActionButton>;
        }
    }
}