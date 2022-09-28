import classes from "./SaveButton.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import React from "react";
import {EditorContext} from "../../../contexts/EditorContext";

export default function SaveButton() {
    const editorContext = React.useContext(EditorContext);

    const [saveState, setSaveState] = React.useState("idle");

    const timeoutRef = React.useRef(null);

    async function saveFunction() {
        const success = await editorContext.saveSnippet();
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

    if (saveState === "idle") {
        return <ActionButton className={classes.button} onClick={saveFunction}>
            <i className="fa-solid fa-floppy-disk"></i>
            <span>Save</span>
        </ActionButton>;
    } else if (saveState === "processing") {
        return <ActionButton className={classes.button}>
            <i className="fa-solid fa-hourglass"></i>
            <span>Saving...</span>
        </ActionButton>;
    } else if (saveState === "success") {
        return <ActionButton className={`${classes.button} ${classes.success}`} onClick={saveFunction}>
            <i className="fa-solid fa-check"></i>
            <span>Saved!</span>
        </ActionButton>;
    } else if (saveState === "failure") {
        return <ActionButton className={`${classes.button} ${classes.failure}`} onClick={saveFunction}>
            <i className="fa-solid fa-xmark"></i>
            <span>Save failed.</span>
        </ActionButton>;
    }
}