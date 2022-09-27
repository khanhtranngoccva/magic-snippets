import classes from "./SaveButton.module.css";
import ActionButton from "../ActionButton/ActionButton";

export default function SaveButton() {
    return <ActionButton className={classes.button}>
        <i className="fa-solid fa-floppy-disk"></i>Save
    </ActionButton>;
}