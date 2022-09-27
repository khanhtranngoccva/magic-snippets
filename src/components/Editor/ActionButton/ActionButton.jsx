import classes from "./ActionButton.module.css";

export default function ActionButton(props) {
    return <button {...props} className={`${classes.button} ${props.className || ""}`}></button>
}