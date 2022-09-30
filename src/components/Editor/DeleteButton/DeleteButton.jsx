import classes from "./DeleteButton.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";

export default function DeleteButton() {
    const editorContext = React.useContext(EditorContext);

    const [saveState, setSaveState] = React.useState("idle");
    const timeoutRef = React.useRef(null);

    async function deleteFunction() {
        const success = await editorContext.deleteSnippet();
        if (success) {
            setSaveState("success");
        } else {
            setSaveState("failure");
        }
    }

    React.useEffect(() => {
        clearTimeout(timeoutRef.current);
        if (saveState === "failure") {
            timeoutRef.current = setTimeout(() => {
                setSaveState("idle");
            }, 2000);
        }
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [saveState]);

    if (saveState === "idle") {
        return <ActionButton onClick={deleteFunction} className={classes.button}>
            <i className="fa-solid fa-trash"></i>Delete!
        </ActionButton>;
    } else if (saveState === "processing") {
        return <ActionButton className={classes.button}>
            <i className="fa-solid fa-hourglass"></i>
            <span>Deleting...</span>
        </ActionButton>;
    } else if (saveState === "failure") {
        return <ActionButton className={`${classes.button} ${classes.failure}`} onClick={deleteFunction}>
            <i className="fa-solid fa-xmark"></i>
            <span>Delete failed.</span>
        </ActionButton>;
    }
}